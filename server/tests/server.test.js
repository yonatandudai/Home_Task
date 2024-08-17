const request = require('supertest');
const server = require('../index');  // Import your server instance

describe('POST /fetch-metadata with CSRF protection', () => {
    let csrfToken;
    let cookies;

    beforeAll(async () => {
        // Fetch CSRF token and cookies before running the tests
        const csrfResponse = await request(server).get('/get-csrf-token');
        csrfToken = csrfResponse.body.csrfToken;  // Extract the CSRF token from the response body
        cookies = csrfResponse.headers['set-cookie'];  // Capture any cookies set by the server

        console.log("CSRF Token:", csrfToken);  // Debugging: Verify the CSRF token value
        console.log("Cookies:", cookies);       // Debugging: Verify the cookies
    });

    it('should return metadata for valid URLs', async () => {
        const response = await request(server)
            .post('/fetch-metadata')
            .set('Cookie', cookies)  // Include the cookies in the request
            .send({ _csrf: csrfToken, urls: ['https://www.wikipedia.org'] })  // Include CSRF token in the body
            .expect(200);  // Expect a 200 OK response

        expect(response.body[0]).toHaveProperty('title');
        expect(response.body[0]).toHaveProperty('description');
        expect(response.body[0]).toHaveProperty('image');
    });
    
    it('should return 400 for invalid input', async () => {
        const response = await request(server)
            .post('/fetch-metadata')
            .set('Cookie', cookies)
            .send({ _csrf: csrfToken, urls: 'invalid-url' })
            .expect(400);
        
        expect(response.body.error).toBe('Invalid input, expected an array of URLs.');
    });

    it('should handle network errors gracefully', async () => {
        const response = await request(server)
            .post('/fetch-metadata')
            .set('Cookie', cookies)
            .send({ _csrf: csrfToken, urls: ['http://nonexistent.url'] })
            .expect(200);
        
        expect(response.body[0]).toHaveProperty('error', 'Failed to fetch metadata');
    });

    it('should enforce rate limiting', async () => {
        const url = 'https://www.wikipedia.org';
        for (let i = 0; i < 5; i++) {
            await request(server)
                .post('/fetch-metadata')
                .set('Cookie', cookies)
                .send({ _csrf: csrfToken, urls: [url] })
                .expect(200);
            await new Promise(resolve => setTimeout(resolve, 100));  // Delay to avoid rate limit
        }
        const response = await request(server)
            .post('/fetch-metadata')
            .set('Cookie', cookies)
            .send({ _csrf: csrfToken, urls: [url] })
            .expect(429);  // Expecting a "Too Many Requests" response

        expect(response.body).toHaveProperty('message', 'Too many requests, please try again later.');
    });

    it('should return an empty array if no URLs are provided', async () => {
        const response = await request(server)
            .post('/fetch-metadata')
            .set('Cookie', cookies)
            .send({ _csrf: csrfToken, urls: [] })
            .expect(200);

        expect(response.body).toEqual([]);
    });

    afterAll(() => {
        server.close();  // Close the server after tests
    });
});

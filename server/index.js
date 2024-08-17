const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(express.json());

// Security middleware
app.use(helmet());
app.use(cookieParser());

// Rate Limiting middleware
const limiter = rateLimit({
    windowMs: process.env.NODE_ENV === 'test' ? 100 : 1000,  // Shorten window for testing
    max: 5,  // Allow 5 requests per windowMs
    message: "Too many requests, please try again later."
});

app.use(limiter);

// CSRF Protection middleware
const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

// Route to get the CSRF token
app.get('/get-csrf-token', csrfProtection, (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});

// Endpoint to fetch metadata with CSRF protection
app.post('/fetch-metadata', csrfProtection, async (req, res) => {
    const urls = req.body.urls;
    if (!urls || !Array.isArray(urls)) {
        return res.status(400).json({ error: 'Invalid input, expected an array of URLs.' });
    }

    const metadataPromises = urls.map(async (url) => {
        try {
            const response = await axios.get(url);
            const html = response.data;
            const $ = cheerio.load(html);

            const title = $('head > title').text();
            const description = $('meta[name="description"]').attr('content');
            const image = $('meta[property="og:image"]').attr('content');

            return { url, title, description, image };
        } catch (error) {
            return { url, error: 'Failed to fetch metadata' };
        }
    });

    const metadata = await Promise.all(metadataPromises);
    
    res.json(metadata);
});

// Start the server
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = server;

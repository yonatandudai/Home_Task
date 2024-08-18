# URL Metadata Fetcher

## Overview

This is a full-stack application that allows users to input a list of URLs, fetch metadata (title, description, image) for each URL, and display the results on the front-end. The application is built using React for the front-end and Node.js for the back-end.

## Live Demo
You can view a live demo of the application [here](#) (Replace this link with your live demo URL).

## Features

- **Front-End (React):**
  - User-friendly interface for inputting URLs.
  - Displays fetched metadata including title, description, and image.
  - Error handling for invalid URLs.

- **Back-End (Node.js):**
  - API endpoint `/fetch-metadata` to fetch metadata for URLs.
  - Rate limiting to handle a maximum of 5 requests per second.
  - Error handling for invalid URLs or failed metadata retrieval.

- **Security:**
  - HTTP headers secured using `helmet`.
  - CSRF protection implemented with `csurf`.
  - Input validation and sanitization to prevent XSS attacks.

## Project Structure

```
url-metadata-fetcher/
├── client/                   # React front-end application
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── package-lock.json
│
├── server/                   # Node.js back-end server
│   ├── index.js              # Main server file
│   ├── tests/                # Directory for back-end tests
│   │   └── server.test.js    # Example test file
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore                # Files and directories to ignore in Git
├── README.md                 # Project documentation
└── package.json              # (Optional) Root-level package.json
```

## Installation and Setup

### Prerequisites

- Node.js and npm installed on your machine.
- Git for version control.

### Clone the Repository

```bash
git clone https://github.com/yonatandudai/url-metadata-fetcher.git
cd url-metadata-fetcher
```

### Front-End Setup

1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```

### Back-End Setup

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the Node.js server:
   ```bash
   npm start
   ```

### Running Tests

#### Back-End Tests

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Run the tests:
   ```bash
   npm test
   ```

#### Front-End Tests

1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Run the tests:
   ```bash
   npm test
   ```

#### Access the application:

* Visit http://localhost:3000 in your web browser for    the front-end.
* The back-end API is running on http://localhost:5000.

## API Documentation

### POST `/fetch-metadata`

- **Description:** Fetches metadata (title, description, and image) for a list of URLs.
- **Request Body:**
  ```json
  {
      "urls": ["url": "https://www.geeksforgeeks.org/","https://www.linkedin.com/", "https://www.w3schools.com/"]}'
  }
  ```
- **Response:**
  - **Success (200):**
    ```json
    [
        {
            "url": "https://www.geeksforgeeks.org/",
            "title": "GeeksforGeeks | A computer science portal for geeks",
            "description": "A Computer Science portal for geeks. It contains well written, well thought 
             and well explained computer science and programming articles, quizzes and 
             practice/competitive programming/company interview Questions.",
            "image": "https://media.geeksforgeeks.org/wp-content/cdn-uploads/gfg_200x200-min.png"
        },
        {
        "url": "https://www.linkedin.com/",
        "title": "LinkedIn: Log In or Sign Up",
        "description": "1 billion members | Manage your professional identity. Build and engage with 
         your professional network. Access knowledge, insights and opportunities.",
        "image": "https://static.licdn.com/scds/common/u/images/logos/favicons/v1/favicon.ico"
        },
    {
        "url": "https://www.w3schools.com/",
        "title": "W3Schools Online Web Tutorials",
        "image": "https://www.w3schools.com/images/w3schools_logo_436_2.png"
    }
    ]
    ```
  - **Error (400):** Invalid input format (e.g., non-array input).
  - **Error (429):** Rate limit exceeded.

## Design Choices

- **React:** Chosen for its component-based architecture, making it easier to build and maintain the front-end.
- **Express (Node.js):** Used for its simplicity and flexibility in building RESTful APIs.
- **Rate Limiting:** Implemented to prevent abuse and manage server load, using `express-rate-limit`.
- **Security:** Secured using `helmet` for HTTP headers and `csurf` for CSRF protection. Inputs are validated and sanitized to protect against XSS.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or inquiries, please contact me at: yonatandu@outlook.com.

---

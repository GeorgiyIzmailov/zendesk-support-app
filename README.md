# Zendesk Support App - server

## Getting Started

Clone this repository:

```bash
git clone https://github.com/GeorgiyIzmailov/zendesk-support-app.git
```

Install dependencies: 

```bash
npm install
```

Create an ```.env``` file and specify the required variables in the ```.env.example```:

```bash
touch .env
```

Run with the command:

```bash
npm start
```

This code defines a Google Cloud Function named "createTicket" using the Google Cloud Functions Framework. It listens for HTTP requests, extracts necessary information from the request body, constructs a request payload for creating a support ticket using the Zendesk API, sends the request, and responds back to the client with a success or error message.

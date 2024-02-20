// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();
const port = +process.env.PORT;

// Parse JSON bodies of incoming requests
app.use(bodyParser.json());

// Handle POST request to create a support ticket
app.post("/create-support-ticket", async (req, res) => {
  try {
    // Destructure body
    const { body } = req;
    // Define options for the HTTP request to Zendesk API
    const options = {
      method: "post",
      // Construct URL using Zendesk subdomain from environment variables
      url: `https://${process.env.ZENDESK_SUBDOMAIN}.zendesk.com/api/v2/requests.json`,
      headers: {
        "Content-Type": "application/json",
      },
      // Provide basic authentication credentials
      auth: {
        username: process.env.ZENDESK_EMAIL,
        password: process.env.ZENDESK_PASSWORD,
      },
      // Define data payload for the support ticket creation request
      data: {
        request: {
          subject: body.question_summary,
          // Use the question summary as the body of the ticket comment
          comment: {
            body: body.question_summary,
          },
          // Specify requester's name and email
          requester: {
            name: body.name,
            email: body.email,
          },
        },
      },
    };

    // Send HTTP request to Zendesk API asynchronously
    await axios(options);
    // Respond with success message if ticket creation is successful
    res.status(200).send("Support ticket created successfully");
  } catch (error) {
    // Handle errors and respond with appropriate status code
    res.status(500).send("Internal error");
    console.error(error);
  }
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});

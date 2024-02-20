// Import required modules
const functions = require("@google-cloud/functions-framework");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Define an HTTP function named "createTicket" using Google Cloud Functions Framework
functions.http("createTicket", async (req, res) => {
  try {
    // Extract request body
    const { body } = req;
    // Construct Zendesk API URL using environment variables
    const url = `https://${process.env.ZENDESK_SUBDOMAIN}.zendesk.com/api/v2/requests.json`;
    // Define data payload for creating the support ticket
    const data = {
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
    };

    // Send a POST request to Zendesk API asynchronously
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      // Parse the response as JSON
      .then((response) => response.json())
      // Log the response data
      .then((data) => {
        console.log(data);
      });

    // Respond to the client with a success message
    res.status(200).send("Support ticket created successfully");
  } catch (error) {
    // Handle errors and respond with an internal error message
    res.status(500).send("Internal error");
    console.error(error);
  }
});

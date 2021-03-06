const axios = require("axios");

exports.main = async (context = {}, sendResponse) => {
  const { email } = context;
  const demoObject = {
    objectId: 1,
    title: "Sample project custom CRM card",
    desc: `A custom CRM card is a UI extension that displays custom info from either HubSpot or an external system. It can also include custom actions—click the "Get Inspired" button to see example data from the ZenQuotes API.`,
    email: `${email}`,
    sections: [
      {
        "type": "alert",
        "titleText": "Do you want more dogs?",
        "bodyText": "You should check out the dog api via https://dog.ceo/dog-api/",
        "variant": "info"
      },
      {
        "type": "image",
        "src": "https://highlandcanine.com/wp-content/uploads/2020/09/golden-retriever-in-field-of-flowers.jpg",
        "alt": "A dog in a field of flowers"
      }
     ]
  };

  try {
    const { data } = await axios.get("https://zenquotes.io/api/random");

    sendResponse({
      results: [
        demoObject,
        {
          objectId: 2,
          link: "https://zenquotes.io/",
          title: "Inspirational quotes provided by ZenQuotes API",
          quote: data[0].q,
          author: data[0].a,
        },
      ],
      primaryAction: {
        type: "SERVERLESS_ACTION_HOOK",
        serverlessFunction: "crm-card",
        label: "Get Inspired",
      },
    });
  } catch (error) {
    throw new Error(`There was an error fetching the quote': ${error.message}`);
  }
};

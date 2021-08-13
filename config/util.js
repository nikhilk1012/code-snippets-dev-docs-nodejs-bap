const axios = require("axios");
const { v4: uuidv4 } = require('uuid');

const httpResponse = (status, error, data) => {
  let res = {
    data,
    message: {
      ack: {
        status,
      },
    },
  };
  if (error) {
    error =
      typeof error === "string"
        ? error
        : error.message
        ? error.message
        : JSON.stringify(error);
    res.error = error;
  }
  return res;
};

const bgURL = () => {
  return "https://mock.bg.com/beckn/";
};

const lookup = (headers, context) => {
  let uri = _.get(context, "bap_uri");
  if (headers["Proxy-Authorization"]) {
    uri = bgURL(headers);
  }
  return { uri };
};

const addSignature = (headers) => {
  // TO-DO Add Signature
};

const createContext = (transactionId) => {
  let context = {
    domain: "mobility",
    country: "IND",
    city: "std:080",
    core_version: "0.9.1",
    bap_id: "https://mock_bap.com/",
    bap_uri: "https://mock_bap.com/beckn/",
    message_id: uuidv4(),
    timestamp: new Date().getTime()
  };
  if (transactionId) {
    context["transaction_id"] = transactionId
  } else {
    context["transaction_id"] = uuidv4();
  }
  return context;
};

const constructHeader = () => {
  // ... Add Authorization
  return {

  }
}

const request = (headers, context, message, pathURI) => {
  const response = {
    context,
    message,
  };
  addSignature(headers);
  await axios({ URL: `${uri}/${pathURI}`, method: "POST", data: response, headers});
};

module.exports = {
  bgURL,
  httpResponse,
  lookup,
  request,
  createContext,
  constructHeader
};

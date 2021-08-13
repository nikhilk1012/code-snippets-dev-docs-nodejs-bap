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

const addSignature = (headers) => {
  // TO-DO Add Signature
};

const saveToDb = () => {

}

const createContext = (transactionId) => {
  let context = {
    domain: "mobility",
    country: "IND",
    city: "std:080",
    core_version: "0.9.1",
    bap_id: "http://localhost:3000",
    bap_uri: "http://localhost:3000",
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

const constructAuthHeader = () => {
  // ... Add Authorization
  return {

  }
}

const lookup = (headers, context) => {
  return "http://localhost:3001"
};

const request = (headers, context, message, pathURI) => {
  const request = {
    context,
    message,
  };
  let uri = lookup();
  addSignature(headers);
  return axios({ url: `${uri}${pathURI}`, method: "POST", data: request, headers});
};

module.exports = {
  bgURL,
  httpResponse,
  lookup,
  request,
  createContext,
  constructAuthHeader,
  saveToDb
};

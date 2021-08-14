const _ = require("lodash");
const mobility = require("../../services/mobility");
const util = require("../../config/util");

/**
 * Sends the Request to BPP with Context and Message
 * @param {object} req Api request object.
 * @param {object} res Api response object.
 * @return {object} returns Ack.
 */
const searchByLoc = async ({ headers, body }, res) => {
  try {
    const startLoc = _.get(body, "startLoc");
    const endLoc = _.get(body, "endLoc");
    if (!startLoc || !endLoc) {
      return res.status(400).send(util.httpResponse("NACK", "Invalid Request"));
    }
    const transactionId = _.get(body, "transactionId");
    const context = util.createContext(transactionId);
    const headers = util.constructAuthHeader(); // Auth Header
    const message = {
      intent: {
        fulfillment: {
          start: {
            location: {
              gps: startLoc,
            },
          },
          end: {
            location: {
              gps: endLoc,
            },
          },
        },
      },
    };
    const response = await util.request(headers, context, message, "/search");
    res
      .status(200)
      .send({ ...response.data, messageId: context["message_id"] });
  } catch (error) {
    res.status(500).send(util.httpResponse("NACK", error));
  }
};

/**
 * Sends the Request to BPP with Context and Message
 * @param {object} req Api request object.
 * @param {object} res Api response object.
 * @return {object} returns Ack.
 */
const selectAgency = async ({ headers, body }, res) => {
  try {
    const items = _.get(body, "items");
    if (Array.isArray(items) && !items.length) {
      return res.status(400).send(util.httpResponse("NACK", "Invalid Request"));
    }
    const transactionId = _.get(body, "transactionId");
    const context = util.createContext(transactionId);
    const headers = util.constructAuthHeader(); // Auth Header
    const message = {
      order: {
        items,
      },
    };
    const response = await util.request(headers, context, message, "/select");
    let data = {
      messageId: context.messageId,
      transactionId: context.transactionId,
    };
    res.status(200).send({ ...response.data, ...data });
  } catch (error) {
    res.status(500).send(util.httpResponse("NACK", error));
  }
};

/**
 * Sends the Request to BPP with Context and Message
 * @param {object} req Api request object.
 * @param {object} res Api response object.
 * @return {object} returns Ack.
 */
const initializeOrder = async ({ headers, body }, res) => {
  try {
    const userBillingDetails = _.get(body, "userBillingDetails");
    const locationDetails = _.get(body, "locationDetails");
    const pickupInstructions = _.get(body, "pickupInstructions");
    const dropInstructions = _.get(body, "dropInstructions");
    const transactionId = _.get(body, "transactionId");
    const context = util.createContext(transactionId);
    const headers = util.constructAuthHeader(); // Auth Header
    let message = {
      order: {
        billing: userBillingDetails,
        fulfillment: {
          start: {
            location: locationDetails.start,
            instructions: pickupInstructions,
          },
          end: {
            location: locationDetails.end,
            instructions: dropInstructions,
          },
        },
      },
    };
    const response = await util.request(headers, context, message, "/init");
    let data = {
      messageId: context.message_id,
      transactionId: context.transaction_id,
    };
    res.status(200).send({ ...response.data, ...data });
  } catch (error) {
    res.status(500).send(util.httpResponse("NACK", error));
  }
};

/**
 * Sends the Request to BPP with Context and Message
 * @param {object} req Api request object.
 * @param {object} res Api response object.
 * @return {object} returns Ack.
 */
const confirmOrder = async ({ headers, body }, res) => {
  try {
    const orderId = _.get(body, "orderId");
    const transactionId = _.get(body, "transactionId");
    if (!transactionId) {
      res.status(400).send(util.httpResponse("NACK", "Invalid Transaction Id"));
    }
    const paymentTransactionId = _.get(body, "paymentTransactionId");
    const order = await mobility.getOrder(orderId, transactionId);
    const headers = util.constructAuthHeader(); // Auth Header
    const context = util.createContext(transactionId);
    let message = {
      order,
      paymentTransactionId,
    };
    const response = await util.request(headers, context, message, "/confirm");
    let data = {
      messageId: context.message_id,
      transactionId: context.transaction_id,
    };
    res.status(200).send({ ...response.data, ...data });
  } catch (error) {
    res.status(500).send(util.httpResponse("NACK", error));
  }
};

/**
 * Sends the Request to BPP with Context and Message
 * @param {object} req Api request object.
 * @param {object} res Api response object.
 * @return {object} returns Ack.
 */
const getOrderStatus = async ({ headers, body }, res) => {
  try {
    const orderId = _.get(body, "orderId");
    const transactionId = _.get(body, "transactionId");
    const headers = util.constructAuthHeader(); // Auth Header
    const context = util.createContext(transactionId);
    let message = {
      order_id: orderId,
    };
    const response = await util.request(headers, context, message, "/status");
    let data = {
      messageId: context.message_id,
      transactionId: context.transaction_id,
    };
    res.status(200).send({ ...response.data, ...data });
  } catch (error) {
    res.status(500).send(util.httpResponse("NACK", error));
  }
};

/**
 * Sends the Request to BPP with Context and Message
 * @param {object} req Api request object.
 * @param {object} res Api response object.
 * @return {object} returns Ack.
 */
const cancelOrder = async ({ headers, body }, res) => {
  try {
    const orderId = _.get(body, "orderId");
    const cancellationReasonId = _.get(body, "cancellationReasonId");
    const transactionId = _.get(body, "transactionId");
    const headers = util.constructAuthHeader(); // Auth Header
    const context = util.createContext(transactionId);
    let message = {
      order_id: orderId,
      cancellation_reason_id: cancellationReasonId,
    };
    const response = await util.request(headers, context, message, "/cancel");
    let data = {
      messageId: context.message_id,
      transactionId: context.transaction_id,
    };
    res.status(200).send({ ...response.data, ...data });
  } catch (error) {
    res.status(500).send(util.httpResponse("NACK", error));
  }
};

/**
 * Sends the Request to BPP with Context and Message
 * @param {object} req Api request object.
 * @param {object} res Api response object.
 * @return {object} returns Ack.
 */
const updateOrder = async ({ headers, body }, res) => {
  try {
    const orderId = _.get(body, "orderId");
    const userBillingDetails = _.get(body, "userBillingDetails");
    const locationDetails = _.get(body, "locationDetails");
    const pickupInstructions = _.get(body, "pickupInstructions");
    const dropInstructions = _.get(body, "dropInstructions");
    const transactionId = _.get(body, "transactionId");
    let message = {
      order: {
        id: orderId,
        billing: userBillingDetails,
        fulfillment: {
          start: {
            location: locationDetails.start,
            instructions: pickupInstructions,
          },
          end: {
            location: locationDetails.end,
            instructions: dropInstructions,
          },
        },
      },
    };
    const context = util.createContext(transactionId);
    const headers = util.constructAuthHeader(); // Auth Header
    const response = await util.request(headers, context, message, "/update");
    let data = {
      messageId: context.message_id,
      transactionId: context.transaction_id,
    };
    res.status(200).send({ ...response.data, ...data });
  } catch (error) {
    res.status(500).send(util.httpResponse("NACK", error));
  }
};

/**
 * Sends the Request to BPP with Context and Message
 * @param {object} req Api request object.
 * @param {object} res Api response object.
 * @return {object} returns Ack.
 */
const rateOrder = async ({ headers, body }, res) => {
  try {
    const orderId = _.get(body, "orderId");
    const rating = _.get(body, "rating");
    const transactionId = _.get(body, "transactionId");
    const context = util.createContext(transactionId);
    const headers = util.constructAuthHeader(); // Auth Header
    let message = {
      id: orderId,
      value: rating,
    };
    const response = await util.request(headers, context, message, "/rate");
    let data = {
      messageId: context.message_id,
      transactionId: context.transaction_id,
    };
    res.status(200).send({ ...response.data, ...data });
  } catch (error) {
    res.status(500).send(util.httpResponse("NACK", error));
  }
};

/**
 * Sends the Request to BPP with Context and Message
 * @param {object} req Api request object.
 * @param {object} res Api response object.
 * @return {object} returns Ack.
 */
const getSupport = async ({ headers, body }, res) => {
  try {
    const orderId = _.get(body, "orderId");
    const transactionId = _.get(body, "transactionId");
    const context = util.createContext(transactionId);
    const headers = util.constructAuthHeader(); // Auth Header
    let message = {
      ref_id: orderId,
    };
    const response = await util.request(headers, context, message, "/support");
    let data = {
      messageId: context.message_id,
      transactionId: context.transaction_id,
    };
    res.status(200).send({ ...response.data, ...data });
  } catch (error) {
    res.status(500).send(util.httpResponse("NACK", error));
  }
};

/**
 * Sends the Request to BPP with Context and Message
 * @param {object} req Api request object.
 * @param {object} res Api response object.
 * @return {object} returns Ack.
 */
const trackOrder = async ({ headers, body }, res) => {
  try {
    const orderId = _.get(body, "orderId");
    const callbackURL = `http://localhost:3000/track_order?${orderId}`;
    const transactionId = _.get(body, "transactionId");
    const context = util.createContext(transactionId);
    const headers = util.constructAuthHeader(); // Auth Header
    let message = {
      order_id: orderId,
      callback_url: callbackURL,
    };
    const response = await util.request(headers, context, message, "/track");
    let data = {
      messageId: context.message_id,
      transactionId: context.transaction_id,
    };
    res.status(200).send({ ...response.data, ...data });
  } catch (error) {
    res.status(500).send(util.httpResponse("NACK", error));
  }
};

const pollRequest = async (req) => {
  const messageId = _.get(req, "messageId");
  do {
    let polling = true;
    try {
      // Waiting for 5 seconds before retrieving
      await new Promise((resolve) => setTimeout(resolve, 5000));
      const response = await mobility.getData(messageId);
      if (response) {
        polling = false;
      }
    } catch (err) {
      console.error(`Problem in execution : ${err}`);
    }
  } while (polling);
};

module.exports = {
  searchByLoc,
  selectAgency,
  initializeOrder,
  confirmOrder,
  getOrderStatus,
  cancelOrder,
  updateOrder,
  rateOrder,
  getSupport,
  trackOrder,
  pollRequest,
};

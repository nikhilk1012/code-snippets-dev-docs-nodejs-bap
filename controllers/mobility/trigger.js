const _ = require("lodash");
const mobilityService = require("../../services/mobility");
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
    const response = await util.request(headers, context, message, "/mobility/search");
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
    const message = {
      order: {
        items,
      },
    };
    const response = await util.request(headers, context, message, "/mobility/select");
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
    const response = await util.request(headers, context, message, "/mobility/init");
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
    const order = await mobilityService.getOrder(orderId, transactionId);
    const context = util.createContext(transactionId);
    let message = {
      order,
      paymentTransactionId,
    };
    const response = await util.request(headers, context, message, "/mobility/confirm");
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
    const context = util.createContext(transactionId);
    let message = {
      order_id: orderId,
    };
    const response = await util.request(headers, context, message, "/mobility/status");
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
    // Get the cancellation Reasons from the Meta API /get_cancellation_reasons
    const cancellationReasonId = _.get(body, "cancellationReasonId");
    const transactionId = _.get(body, "transactionId");
    const context = util.createContext(transactionId);
    let message = {
      order_id: orderId,
      cancellation_reason_id: cancellationReasonId,
    };
    const response = await util.request(headers, context, message, "/mobility/cancel");
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
    const response = await util.request(headers, context, message, "/mobility/update");
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
    let message = {
      id: orderId,
      value: rating,
    };
    const response = await util.request(headers, context, message, "/mobility/rate");
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
    let message = {
      ref_id: orderId,
    };
    const response = await util.request(headers, context, message, "/mobility/support");
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
    let message = {
      order_id: orderId,
      callback_url: callbackURL,
    };
    const response = await util.request(headers, context, message, "/mobility/track");
    let data = {
      messageId: context.message_id,
      transactionId: context.transaction_id,
    };
    res.status(200).send({ ...response.data, ...data });
  } catch (error) {
    res.status(500).send(util.httpResponse("NACK", error));
  }
};

const getMessageById = async (req) => {
  try {
    const messageId = _.get(req, "messageId");
    const response = await mobilityService.getData(messageId);
    res.status(200).send(util.httpResponse('ACK', "", response));
  } catch(error) {
    res.status(500).send(util.httpResponse("NACK", error));
  }
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
  getMessageById,
};

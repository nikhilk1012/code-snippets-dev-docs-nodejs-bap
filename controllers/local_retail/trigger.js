const _ = require("lodash");
const localRetailService = require("../../services/local_retail");
const util = require("../../config/util");

/**
 * Sends the Request to BPP with Context and Message
 * @param {object} req Api request object.
 * @param {object} res Api response object.
 * @return {object} returns Ack.
 */
const searchByEndLoc = async ({ body }, res) => {
  try {
    const endLoc = _.get(body, "endLoc");
    if (!endLoc) {
      return res.status(400).send(util.httpResponse("NACK", "Invalid Request"));
    }
    const transactionId = _.get(body, "transactionId");
    const context = util.createContext(transactionId);
    const message = {
      intent: {
        fulfillment: {
          type: "home-delivery",
          end: {
            location: {
              gps: endLoc,
            },
          },
        },
      },
    };
    const response = await util.request(context, message, "/localRetail/search");
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
const addItems = async ({ body }, res) => {
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
    const response = await util.request(context, message, "/localRetail/select");
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
const initializeOrder = async ({ body }, res) => {
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
          type: "home-delivery",
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
    const response = await util.request(context, message, "/localRetail/init");
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
const confirmOrder = async ({ body }, res) => {
  try {
    const orderId = _.get(body, "orderId");
    const transactionId = _.get(body, "transactionId");
    if (!transactionId) {
      res.status(400).send(util.httpResponse("NACK", "Invalid Transaction Id"));
    }
    const paymentTransactionId = _.get(body, "paymentTransactionId");
    const order = await localRetailService.getOrder(orderId, transactionId);
    const context = util.createContext(transactionId);
    let message = {
      order,
      paymentTransactionId,
    };
    const response = await util.request(context, message, "/localRetail/confirm");
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
const getOrderStatus = async ({ body }, res) => {
  try {
    const orderId = _.get(body, "orderId");
    const transactionId = _.get(body, "transactionId");
    const context = util.createContext(transactionId);
    let message = {
      order_id: orderId,
    };
    const response = await util.request(context, message, "/localRetail/status");
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
const cancelOrder = async ({ body }, res) => {
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
    const response = await util.request(context, message, "/localRetail/cancel");
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
const updateOrder = async ({ body }, res) => {
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
    const response = await util.request(context, message, "/localRetail/update");
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
const rateOrder = async ({ body }, res) => {
  try {
    const orderId = _.get(body, "orderId");
    const rating = _.get(body, "rating");
    const transactionId = _.get(body, "transactionId");
    const context = util.createContext(transactionId);
    let message = {
      id: orderId,
      value: rating,
    };
    const response = await util.request(context, message, "/localRetail/rate");
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
const getSupport = async ({ body }, res) => {
  try {
    const orderId = _.get(body, "orderId");
    const transactionId = _.get(body, "transactionId");
    const context = util.createContext(transactionId);
    let message = {
      ref_id: orderId,
    };
    const response = await util.request(context, message, "/localRetail/support");
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
const trackOrder = async ({ body }, res) => {
  try {
    const orderId = _.get(body, "orderId");
    const callbackURL = `http://localhost:3000/track_order?${orderId}`;
    const transactionId = _.get(body, "transactionId");
    const context = util.createContext(transactionId);
    let message = {
      order_id: orderId,
      callback_url: callbackURL,
    };
    const response = await util.request(context, message, "/localRetail/track");
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
    const response = await localRetailService.getData(messageId);
    res.status(200).send(util.httpResponse("ACK", "", response));
  } catch (error) {
    res.status(500).send(util.httpResponse("NACK", error));
  }
};

module.exports = {
  searchByEndLoc,
  addItems,
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

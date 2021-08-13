const _ = require("lodash");
const util = require("../config/util");

/**
 * Sends the Request to BPP with Context and Message
 * @param {object} req Api request object.
 * @param {object} res Api response object.
 * @return {object} returns Ack.
 */
const searchByPickupAndDropLoc = async ({ headers, body }, res) => {
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
      transactionId: context.transactionId
    }
    res
      .status(200)
      .send({ ...response.data, ...data });
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
    const dropInstructions = _.get(body, "dropInstructions")
    const transactionId = _.get(body, "transactionId");
    const context = util.createContext(transactionId);
    const headers = util.constructAuthHeader(); // Auth Header
    let message = {
      order: {
        billing: userBillingDetails,
        fulfillment: {
          start: {
            location: locationDetails.start,
            instructions: pickupInstructions
          },
          end: {
            location: locationDetails.end,
            instructions: dropInstructions
          }
        },
      }
    }
    const response = await util.request(headers, context, message, "/init");
    let data = {
      messageId: context.message_id,
      transactionId: context.transaction_id
    }
    res
      .status(200)
      .send({ ...response.data, ...data });
  } catch (error) {
    res.status(500).send(util.httpResponse("NACK", error));
  }
};


/**
 * Action called by BPP with Context and Message
 * @param {object} req Api request object.
 * @param {object} res Api response object.
 * @return {object} Saves Response to DB
 */
const onSearch = async ({ body }, res) => {
  await util.saveToDb(body);
};

/**
 * Action called by BPP with Context and Message
 * @param {object} req Api request object.
 * @param {object} res Api response object.
 * @return {object} Saves Response to DB
 */
const onSelect = async ({ body }, res) => {
  await util.saveToDb(body);
};

/**
 * Action called by BPP with Context and Message
 * @param {object} req Api request object.
 * @param {object} res Api response object.
 * @return {object} Saves Response to DB
 */
 const onInit = async ({ body }, res) => {
  await util.saveToDb(body);
};

module.exports = {
  searchByPickupAndDropLoc,
  selectAgency,
  onSearch,
  onSelect,
  initializeOrder,
  onInit
};

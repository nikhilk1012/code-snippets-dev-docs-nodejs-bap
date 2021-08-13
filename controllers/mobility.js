const _ = require("lodash");
const util = require("../config/util");
const { saveToDb } = require("../services/mobility");

/**
 * Performs the search using Client request.
 * @param {object} req Api request object.
 * @param {object} res Api response object.
 * @return {object} returns Ack.
 */
const searchByPickupAndDropLoc = async ({ headers, body }, res) => {
  try {
    const startLoc = _.get(body, "startLoc");
    const endLoc = _.get(body, "endLoc");
    if (!startLoc || !endLoc) {
      return res.status(400).send("Invalid Request");
    }
    const transactionId = _.get(body, "transactionId");
    const context = util.createContext(transactionId);
    const headers = util.constructHeader(); // Auth Header
    const message = {
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
    };
    const response = await util.request(headers, context, message, "/search");
    res.status(200).send(response.data);
  } catch (error) {
    res.status(500).send(util.httpResponse("NACK", error));
  }
};

const onSearch = ({ body }, res) => {
  await util.saveToDb(body);
};

module.exports = {
  searchByPickupAndDropLoc,
  onSearch,
};

const _ = require("lodash");
const util = require("../../config/util");

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
  
  /**
   * Action called by BPP with Context and Message
   * @param {object} req Api request object.
   * @param {object} res Api response object.
   * @return {object} Saves Response to DB
   */
  const onConfirm = async ({ body }, res) => {
    await util.saveToDb(body);
  };
  
  /**
   * Action called by BPP with Context and Message
   * @param {object} req Api request object.
   * @param {object} res Api response object.
   * @return {object} Saves Response to DB
   */
  const onStatus = async ({ body }, res) => {
    await util.saveToDb(body);
  };
  
  /**
   * Action called by BPP with Context and Message
   * @param {object} req Api request object.
   * @param {object} res Api response object.
   * @return {object} Saves Response to DB
   */
  const onCancel = async ({ body }, res) => {
    await util.saveToDb(body);
  };
  
  /**
   * Action called by BPP with Context and Message
   * @param {object} req Api request object.
   * @param {object} res Api response object.
   * @return {object} Saves Response to DB
   */
  const onUpdate = async ({ body }, res) => {
    await util.saveToDb(body);
  };
  
  /**
   * Action called by BPP with Context and Message
   * @param {object} req Api request object.
   * @param {object} res Api response object.
   * @return {object} Saves Response to DB
   */
  const onRating = async ({ body }, res) => {
    await util.saveToDb(body);
  };
  
  /**
   * Action called by BPP with Context and Message
   * @param {object} req Api request object.
   * @param {object} res Api response object.
   * @return {object} Saves Response to DB
   */
  const onSupport = async ({ body }, res) => {
    await util.saveToDb(body);
  };
  
  /**
   * Action called by BPP with Context and Message
   * @param {object} req Api request object.
   * @param {object} res Api response object.
   * @return {object} Saves Response to DB
   */
  const onTrack = async ({ body }, res) => {
    await util.saveToDb(body);
  };


module.exports = {
    onSearch,
    onSelect,
    onInit,
    onConfirm,
    onStatus,
    onCancel,
    onUpdate,
    onRating,
    onSupport,
    onTrack,
  };
  
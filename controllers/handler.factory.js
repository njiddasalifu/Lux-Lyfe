import APIFeatures from '../utilities/apiFeatures.js';
import AppError from '../utilities/appError.js';
import catchAsync from '../utilities/catchAsync.js';

/**
 * @breif Create a new document in a database collection
 * @param {Collection} Model -> Database collection
 * @returns {Function}
 */
const createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: doc,
    });
  });

/**
 * @breif Get a single document in the database collection
 * using the parameter request id
 * @param {Collection} Model -> Database collection
 * @param {String} popOptions -> Populate option for other collection
 * @returns {Function}
 */
const getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    // 1. Get doc by id
    let query = await Model.findById(req.params.id);

    // 2. Populate
    if (popOptions) query = query.populate(popOptions);

    // 3. Perform query
    const doc = await query;

    // 4. Check if item exists
    if (!doc)
      return next(new AppError('document not found with that ID!', 404));

    // 5. Send response
    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });

/**
 * @breif Update a single a documnent in the collection, from the
 * request paramter id
 * @param {Collection} Model -> Database collection
 * @returns {Function}
 */
const updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findOneAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) return next(new AppError('No document found with that ID!', 404));

    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });

/**
 * @breif Retrieve all document from a collection, documents are filtered, sorted,
 * limited and paginated
 * @param {Collection} Model -> Database collection
 * @returns {Function}
 */
const getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    // 1. To allow for nested GET routes
    let filter = {};

    if (req.params.storeId) filter = { store: req.params.storeId };
    if (req.params.categoryId) filter = { category: req.params.categoryId };
    if (req.params.customerId) filter = { customer: req.params.customerId };

    // 2. Build search regex for name
    if (req.query.name)
      req.query['name'] = { $regex: req.query.name, $options: 'i' };

    // 3. EXECUTE THE QUERY
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const docs = await features.query;

    // 4. SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: docs.length,
      data: docs,
    });
  });

/**
 * @breif Delete a single document in the database collection
 * @param {Collection} Model -> Database collection
 * @returns function
 */
const deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

export default {
  createOne,
  getOne,
  updateOne,
  getAll,
  deleteOne,
};

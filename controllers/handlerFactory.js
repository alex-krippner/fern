const catchAsync = require('../utilities/catchAsyncError');
const AppError = require('../utilities/appError');

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdandDelete(req.params.id);

    if (!doc) {
      return next(new AppError(`No ${Model} document found with that ID`, 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError(`No ${Model} document found with that ID`, 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);

    if (!doc) {
      return next(new AppError(`No ${Model} document found with that ID `));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const collection = await Model.find();

    if (!collection) {
      return next(new AppError(`No ${Model} collection found`, 404));
    }

    res.status(200).json({
      status: 'success',
      results: collection.length,
      data: collection,
    });
  });

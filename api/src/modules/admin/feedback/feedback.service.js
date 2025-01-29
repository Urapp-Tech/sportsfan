import model from '#models/feedback.model';
import categoryModel from '#models/category.model';
import { uploadFile, uploadFiles } from '#utilities/helper';
import HTTP_STATUS from '#utilities/http-status';
import promiseHandler from '#utilities/promise-handler';

const list = async (req) => {
  const promise = model.list(req);
  const [error, result] = await promiseHandler(promise);
  if (error) {
    const err = new Error(error.detail ?? error.message);
    err.code = error.code ?? HTTP_STATUS.INTERNAL_SERVER_ERROR;
    throw err;
  }
  return {
    code: HTTP_STATUS.OK,
    message: 'Data has been fetched successfully.',
    data: result,
  };
};

const detail = async (req) => {
  const promise = model.list(req);
  const [error, result] = await promiseHandler(promise);
  if (error) {
    const err = new Error(error.detail ?? error.message);
    err.code = error.code ?? HTTP_STATUS.INTERNAL_SERVER_ERROR;
    throw err;
  }
  return {
    code: HTTP_STATUS.OK,
    message: 'Data has been fetched successfully.',
    data: result,
  };
};

const create = async (req) => {
  const newData = req.body;
  const [categoryError, categoryResult] = await categoryModel.getCategory(req);
  if (categoryError) {
    const err = new Error(error.detail ?? error.message);
    err.code = error.code ?? HTTP_STATUS.INTERNAL_SERVER_ERROR;
    throw err;
  }
  req.params.categories = categoryResult.id;

  newData.images = JSON.stringify(await uploadFiles(req, req.body['images[]']));
  delete newData['images[]'];

  if (newData.icon) {
    newData.icon = await uploadFile(req, newData.icon);
  }

  const data = {
    ...newData,
    tenant: req.session.tenant,
    categories: categoryResult.id,
  };

  const promise = model.create(req, data);
  const [error, result] = await promiseHandler(promise);
  if (error) {
    const err = new Error(error.detail ?? error.message);
    err.code = error.code ?? HTTP_STATUS.INTERNAL_SERVER_ERROR;
    throw err;
  }

  return {
    code: HTTP_STATUS.OK,
    message: 'User has been created successfully.',
    data: { ...result },
  };
};

// const update = async (req) => {
//   const newData = req.body;
//   if (req.body['images[]'].length) {
//     newData.images = JSON.stringify(
//       await uploadFiles(req, req.body['images[]'])
//     );
//     delete newData['images[]'];
//   } else {
//     delete newData['images[]'];
//   }

//   if (newData.icon) {
//     newData.icon = await uploadFile(req, newData.icon);
//   } else {
//     delete newData.icon;
//   }

//   const promise = model.update(req, newData);
//   const [error, result] = await promiseHandler(promise);
//   if (error) {
//     const err = new Error(error.detail ?? error.message);
//     err.code = error.code ?? HTTP_STATUS.INTERNAL_SERVER_ERROR;
//     throw err;
//   }

//   return {
//     code: HTTP_STATUS.OK,
//     message: 'User has been updated successfully.',
//     data: { ...result },
//   };
// };

const deleteRecord = async (req, params) => {
  const promise = model.deleteRecord(req, params);

  const [error, result] = await promiseHandler(promise);
  if (error) {
    const err = new Error(error.detail ?? error.message);
    err.code = error.code ?? HTTP_STATUS.INTERNAL_SERVER_ERROR;
    throw err;
  }

  return {
    code: HTTP_STATUS.OK,
    message: 'User has been deleted successfully.',
    data: { ...result },
  };
};

export default {
  list,
  detail,
  create,
  // update,
  deleteRecord,
};

import model from '#models/blog.model';
import { uploadFiles } from '#utilities/helper';
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

const create = async (req) => {
  const newData = req.body;
  newData.images = JSON.stringify(await uploadFiles(req, req.body['images[]']));
  delete newData['images[]'];
  const promise = model.create(req, newData);
  const [error, result] = await promiseHandler(promise);
  if (error) {
    const err = new Error(error.detail ?? error.message);
    err.code = error.code ?? HTTP_STATUS.INTERNAL_SERVER_ERROR;
    throw err;
  }

  return {
    code: HTTP_STATUS.OK,
    message: 'Blog has been created successfully.',
    data: { ...result },
  };
};

const update = async (req) => {
  const newData = req.body;
  const { deletedPrevImages, images } = newData;
  let updatedImages = [];
  let uploadedImages = [];

  const existingImages = await model.findById(req);
  let existing = existingImages ? existingImages.images : [];
  if (!Array.isArray(existing)) {
    existing = [existing];
  }

  if (images[0] !== '')
    uploadedImages = await uploadFiles(
      req,
      !Array.isArray(images) ? [images] : images
    );

  const cleanedImages = existing.map((url) => {
    return url.replace(/\s+/g, '');
  });

  const deletedImagesArray =
    deletedPrevImages[0] !== ''
      ? deletedPrevImages.split(',').map((x) => x.replace(/\s+/g, ''))
      : [];

  updatedImages = cleanedImages.filter(
    (image) => !deletedImagesArray.includes(image)
  );

  console.log('uploaded images', uploadedImages);
  console.log('deletedImagesArray', deletedImagesArray);
  console.log('updatedImages', updatedImages);

  delete newData.deletedPrevImages;
  const allImages = [...updatedImages, ...uploadedImages];
  newData.images = allImages.length > 0 ? allImages : [];

  // console.log('New Data', newData);
  const promise = model.update(req, newData);

  const [error, result] = await promiseHandler(promise);
  if (error) {
    const err = new Error(error.detail ?? error.message);
    err.code = error.code ?? HTTP_STATUS.INTERNAL_SERVER_ERROR;
    throw err;
  }

  return {
    code: HTTP_STATUS.OK,
    message: 'Blog has been updated successfully.',
    data: { ...result },
  };
};

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
  create,
  update,
  deleteRecord,
};

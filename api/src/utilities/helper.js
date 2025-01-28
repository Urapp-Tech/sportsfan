import { v4 as uuidv4 } from 'uuid';
export const uploadFile = async (req, file) => {
  let logoUrl = null;
  if ((file && file != null) || file !== undefined || file !== '') {
    const fileData = {
      Key: `menu/${uuidv4()}-${file.filename}`,
      Body: file.buffer,
      'Content-Type': file.mimetype,
    };
    const temp = await req.s3Upload(fileData);
    if (temp) logoUrl = temp;
  }
  return logoUrl;
};

export const uploadFiles = async (req, files) => {
  if (files && files.length) {
    return Promise.all(files.map(async (file) => uploadFile(req, file)));
  }
  return [];
};

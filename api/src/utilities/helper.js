import { v4 as uuidv4 } from 'uuid';
const uploadFile = async (req, file) => {
  if ((file && file != null) || file !== undefined || file !== '') {
    let logoUrl;
    const fileData = {
      Key: `menu/${uuidv4()}-${file.filename}`,
      Body: file.buffer,
      'Content-Type': file.mimetype,
    };
    try {
      logoUrl = await req.s3Upload(fileData);
      return logoUrl;
    } catch (error) {
      throw new Error(`Failed to upload file to S3 ${error.message}`);
    }
  }
};

export default {
  uploadFile,
};

import { v2 as cloudinary } from 'cloudinary';
import stream from 'stream';

// Export the upload function
export const handleUpload = async (fileBuffer) => {
    
    try {
        const result = await cloudinary.uploader.upload(fileBuffer, {
          folder: 'uploads', // Optional: specify a folder in your Cloudinary account
        });
    
        return { public_id: result.public_id, url: result.secure_url };
      } catch (error) {
        console.error(error);
        throw new Error('Upload failed');
      }
};

// Export a function to handle multiple uploads
export const handleMultipleUploads = async (fileBuffers) => {
  const uploadPromises = fileBuffers.map(async (buffer) => {
    return handleUpload(buffer);
  });

  return await Promise.all(uploadPromises);
};

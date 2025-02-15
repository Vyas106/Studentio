
// utils/cloudinary.ts
export async function uploadToCloudinary(file: File, folder: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
    formData.append('folder', folder);
  
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );
  
    if (!response.ok) {
      throw new Error('Upload failed');
    }
  
    const data = await response.json();
    return {
      url: data.secure_url,
      publicId: data.public_id
    };
  }
  
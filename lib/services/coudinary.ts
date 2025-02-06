import { Cloudinary } from '@cloudinary/url-gen'
export const cloudinary_upload_options = {
  upload_preset: 'rider_data',
  tag: 'rider_data',
  unsigned: true,
}

export const cld = new Cloudinary({
  cloud: { cloudName: process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME },
  url: {
    secureDistribution:process.env.EXPO_PUBLICLOUDINARY_UPLOAD_URL,
    secure: true,
  }
})
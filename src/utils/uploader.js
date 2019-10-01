import cloudinary from 'cloudinary'
const {CLOUD_NAME, API_KEY, API_SECRET} = require('../config/index');


export function storeUpload(stream, properties) {
  
  cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET,
  });

  return new Promise( (resolve, reject) => {
    const buffer = cloudinary.v2.uploader.upload_stream(properties, (err, result) => {
      if(err) reject(err)
      resolve(result);
    });
    stream.pipe(buffer);
  });
}
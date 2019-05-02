require('dotenv').config();
const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary');

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

const promiseWrapper = (image) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image.path, (result, error) => {
      if (error) {
        reject(new Error(error));
      } else {
        resolve({ name: image.fieldname, value: result.url });
      }
    });
  });
};

const uploadToCloudinary = (images) => {
  return Promise.all(images);
};

router.post('', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'banner', maxCount: 1 }]), (req, res) => {
  console.log('HIT UPLOAD ROUTE');
  if (req.files) {
    const images = [];
    if (req.files.image) {
      images.push(promiseWrapper(req.files.image[0]));
    }
    if (req.files.banner) {
      images.push(promiseWrapper(req.files.banner[0]));
    }

    uploadToCloudinary(images).then(urls => {
      res.json(urls);
    }).catch(error => {
      console.error('ERROR UPLOADING TO CLOUDINARY', error);
      res.status(500).send('Something Broke');
    });
  }
});

module.exports = { router };
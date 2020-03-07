const functions = require('firebase-functions');
const admin = require('firebase-admin');
// const express = require('express');
// const { Storage } = require('@google-cloud/storage');
// const Multer = require('multer');

// const app = express();
admin.initializeApp();

   
// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.images = functions.https.onRequest(async (req, res) => {
    const image_url = req.body.image_url;
    const datetime = req.body.datetime;
    const monster_hero_id = req.body.monster_hero_id;
    const user_id = req.body.user_id;
    // Push the new message into the Realtime Database using the Firebase Admin SDK.
    await admin.database().ref('/images').push({image_url: image_url, datetime: datetime, monster_hero_id: monster_hero_id, user_id: user_id});
  });


// const storage = new Storage({
//   projectId: "monsters-heros",
//   keyFilename: process.env.FIREBASE_KEY
// });

// const bucket = storage.bucket("https://console.firebase.google.com/project/monsters-heros/storage/monsters-heros.appspot.com/files");

// const multer = Multer({
//   storage: Multer.memoryStorage(),
//   limits: {
//     fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
//   }
// });

// app.listen(3000, () => {
//   console.log('App listening to port 3000');
// });

// /**
//  * Adding new file to the storage
//  */
// app.post('/upload', multer.single('file'), (req, res) => {
//   console.log('Upload Image');

//   let file = req.file;
//   if (file) {
//     uploadImageToStorage(file).then(() => {
//       res.status(200).send({
//         status: 'success'
//       });
//       return res
//     }).catch((error) => {
//       console.error(error);
//     });
//   }
// });

// /**
//  * Upload the image file to Google Storage
//  * @param {File} file object that will be uploaded to Google Storage
//  */
// const uploadImageToStorage = (file) => {
//   return new Promise((resolve, reject) => {
//     if (!file) {
//     //   reject('No image file');
//       throw new Error("No image")
//     }
//     let newFileName = `${file.originalname}_${Date.now()}`;

//     let fileUpload = bucket.file(newFileName);

//     const blobStream = fileUpload.createWriteStream({
//       metadata: {
//         contentType: file.mimetype
//       }
//     });

//     blobStream.on('error', (error) => {
//     //   reject('Something is wrong! Unable to upload at the moment.');
//       throw new Error("No clue")
//     });

//     blobStream.on('finish', () => {
//       // The public URL can be used to directly access the file via HTTP.
//       const url = format(`https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`);
//       resolve(url);
//     });

//     blobStream.end(file.buffer);
//   });
// }
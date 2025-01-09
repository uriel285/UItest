// /lib/backblaze.js
import AWS from 'aws-sdk';

AWS.config.logger = console;

const s3 = new AWS.S3({
  endpoint: new AWS.Endpoint('https://s3.us-east-005.backblazeb2.com'), // Reemplaza <region> con tu región de Backblaze
  accessKeyId: process.env.BACKBLAZE_ACCESS_KEY_ID,  // Tu Application Key ID de Backblaze
  secretAccessKey: process.env.BACKBLAZE_SECRET_ACCESS_KEY,  // Tu Application Key de Backblaze
  signatureVersion: 'v4',
  region: 'us-east-005', // La región de tu bucket
});

export default s3;

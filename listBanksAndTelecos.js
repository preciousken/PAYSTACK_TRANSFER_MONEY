const https = require('https');
require('dotenv').config();

const options = {
  hostname: 'api.paystack.co',
  port: 443,
  path: '/bank?currency=NGN',
  method: 'GET',
  headers: {
    Authorization: `Bearer ${process.env.PAYSTACK_SCRETE_KEY}`
  }
};

const getData = () => {
  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        resolve(JSON.parse(data));
      });
    });

    req.on('error', error => {
      reject(error);
    });

    req.end();
  });
};

getData()
  .then(data => console.log(data))
  .catch(error => console.error(error));









// const https = require('https')
// require('dotenv').config()

// const options = {
//   hostname: 'api.paystack.co',
//   port: 443,
//   path: '/bank?currency=NGN',
//   method: 'GET',
//   headers: {
//     Authorization: `Bearer ${process.env.PAYSTACK_SCRETE_KEY}`
//   }
// }

// https.request(options, res => {
//   let data = ''

//   res.on('data', (chunk) => {
//     data += chunk
//   });

//   res.on('end', () => {
//     console.log(JSON.parse(data))
//   })
// }).on('error', error => {
//   console.error(error)
// })
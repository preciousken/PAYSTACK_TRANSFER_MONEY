const https = require('https');
const {v4} = require('uuid')
let uuid = v4()
require('dotenv').config();

const transferAmount = async () => {
  const params = JSON.stringify({
    "source": "balance",
    "reason": "I AM SHOWING MY GENEROUSITY",
    "reference": `${uuid}`,
    "amount": 3794800,
    "recipient": `${process.env.RECIPIENT_CODE}`
  });

  const options = {
    hostname: 'api.paystack.co',
    port: 443,
    path: '/transfer',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SCRETE_KEY}`,
      'Content-Type': 'application/json'
    }
  };

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

    req.write(params);
    req.end();
  });
};

const transfer = async () => {
  try {
    const response = await transferAmount();
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

transfer();



// IF AN ERROR OCCUR WHILE INITIALIZING A TRANSFER, 
// KINDLY RETRY THE TRANSACTION WITH THE SAME REFERENCE
// TO PREVENT DOUBLE CREDITING
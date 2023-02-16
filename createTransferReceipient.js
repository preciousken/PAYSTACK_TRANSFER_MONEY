const https = require('https');
require('dotenv').config()

const postData = JSON.stringify({
  type: 'nuban',
  name: `${process.env.ACCOUNT_NAME}`,
  account_number: `${process.env.ACCOUNT_NUMBER}`,
  bank_code: `${process.env.BANK_CODE}`,
  currency: 'NGN'
});

const options = {
  hostname: 'api.paystack.co',
  port: 443,
  path: '/transferrecipient',
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.PAYSTACK_SCRETE_KEY}`,
    'Content-Type': 'application/json'
  }
};

const createTransferRecipient = async (postData, options) => {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        const response = JSON.parse(data);
        if (response.status === true) {
          resolve(response.data);
        } else {
          reject(new Error(response.message));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(postData);
    req.end();
  });
};

(async () => {
  try {
    const result = await createTransferRecipient(postData, options);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
})();
const https = require('https')
require('dotenv').config()

const finalizeTransfer = async () => {
  const params = JSON.stringify({
    "transfer_code": `${process.env.TRANSFER_CODE}`, 
    "otp":`${process.env.OTP}`
  })
  
  const options = {
    hostname: 'api.paystack.co',
    port: 443,
    path: '/transfer/finalize_transfer',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SCRETE_KEY}`,
      'Content-Type': 'application/json'
    }
  }
  
  const req = https.request(options, res => {
    let data = ''
  
    res.on('data', (chunk) => {
      data += chunk
    });
  
    res.on('end', () => {
      console.log(JSON.parse(data))
    })
  }).on('error', error => {
    console.error(error)
  })
  
  req.write(params)
  req.end()
}

finalizeTransfer();
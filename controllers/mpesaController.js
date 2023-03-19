require("dotenv").config();
const axios = require("axios");

const datetime = require("node-datetime")
const passkey = process.env.PASSKEY;
const shortcode = process.env.SHORTCODE;
const consumerkey = process.env.CONSUMERKEY;
const consumersecret = process.env.CONSUMERSECRET


const newPassword = () => {
  const dt = datetime.create();
  const formatted = dt.format("YmdHMS");
  const passString = shortcode + passkey + formatted;
  const base64EncodedPassword = Buffer.from(passString).toString("base64");

  return base64EncodedPassword
};

exports.token = (req, res, next) => {
  const url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
  const auth =
    "Basic" + " " +
    Buffer.from(consumerkey + ":" + consumersecret).toString("base64");

  const headers = {
    Authorization: auth,
  }
  axios.get(url, {
    headers: headers,
  })
  .then((response) => {
    let data = response.data;
    let access_token = data.access_token;
    req.token = access_token;
    // console.log(data)

    next()
  }).catch(error => console.log(error));
};





exports.mpesaPassword = (req, res) => {
  res.send(newPassword());
}
exports.stkPush = (req, res) => {
  const token = req.token;

  const phone = req.body.phone.substring(1);
  const amount = req.body.amount;

  console.log(phone, amount)

  const headers = {
    Authorization: "Bearer " + token
  };

  const stkURL =
    "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

  let data = {
    "BusinessShortCode": "174379",
    "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMTYwMjE2MTY1NjI3",
    "Timestamp": "20160216165627",
    "TransactionType": "CustomerPayBillOnline",
    "Amount": `${amount}`,
    "PartyA": `254${phone}`,
    "PartyB": "174379",
    "PhoneNumber": `254${phone}`,
    "CallBackURL": "https://magoso.herokuapp.com",
    "AccountReference": `254${phone}`,
    "TransactionDesc": "Test"
  };

  axios.post(stkURL, data, { headers: headers })
    .then(response => res.send(response.data))
    .catch(error => console.log(error))

console.log(data)
  // res.send(token)



}




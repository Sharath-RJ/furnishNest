const twilio = require("twilio")

// Replace these with your actual Twilio Account SID and Auth Token
const accountSid = "ACa046474223677b94f730ff32a7f020dd"
const authToken = "fc9b714e0a517fede19249c347523769"

// Initialize Twilio client
const client = new twilio(accountSid, authToken)

// Replace these with your Twilio phone number and recipient's phone number
const fromPhoneNumber = "+12402977901"
const toPhoneNumber = "+919567892611"
//Otp generating

var Otp = Math.floor(Math.random() * 9000)
const Copy_of_OTP=Otp

//Send a message
client.messages
    .create({
        body: `Your varification code is : ${Otp}`,
        from: fromPhoneNumber,
        to: toPhoneNumber,
    })
    .then((message) => console.log(`Message sent with SID:`))
    .catch((error) => console.error(`Error sending message:`))

console.log(Copy_of_OTP)

var https = require('https');
https.get('https://api.telegram.org/bot144797928:AAH8UqLFcir7_rc7PGydDqFywRYYM2Jyh6c/sendmessage?chat_id=92128155&text=salam', (res) => {
  console.log(`Got response: ${res.statusCode}`);
  // consume response body
  res.resume();
}).on('error', (e) => {
  console.log(`Got error: ${e.message}`);
});
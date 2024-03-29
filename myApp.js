const express = require('express');
const helmet = require('helmet');
const app = express();

module.exports = app;
const api = require('./server.js');

app.use(express.static('public'));

//Middleware
app.use(helmet.hidePoweredBy());
//Evitar que utilicen nuestro página en un iframe
app.use(
  helmet.frameguard({
    action: "deny",
  }),
  //Evitar el Cross-site scripting (XSS)
  helmet.xssFilter(),
  //Evitar MIME sniffing
  helmet.noSniff(),
  //Evitar untrusted HTML
  helmet.ieNoOpen()
);

app.disable('strict-transport-security');

app.use('/_api', api);

app.get("/", function (request, response) {

  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🥦 Useful Programmer Info Security App started on port ${port}`);
});

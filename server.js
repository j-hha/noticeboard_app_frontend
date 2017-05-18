var express = require('express'),
    app = express(),
    port = 8000;

app.use(express.static('public'));

app.listen(port, function () {
  console.log('Notice app running on port'  + port);
})

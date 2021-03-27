const app = require('./config/express');

app.listen(3000, () => {
  console.log('API Server started and listening on port 3000');
});

module.exports = app;
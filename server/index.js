const app = require('./config/express');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('API Server started and listening on port 3000');
});

module.exports = app;
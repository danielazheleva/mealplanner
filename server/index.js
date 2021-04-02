const app = require('./config/express');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API Server started and listening on port ${PORT}`);
});

module.exports = app;
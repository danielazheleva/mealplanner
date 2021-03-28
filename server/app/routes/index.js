const express = require('express');
const bbcRoutes = require('./bbc')
const monitorRoutes = require('./monitor')

const router = express.Router();

/** GET /api-status - Check service status **/
router.get('/api-status', (req, res) =>
  res.json({
    status: "ok"
  })
);

router.use('/recipe', bbcRoutes);
router.use('/monitor', monitorRoutes)

module.exports = router;
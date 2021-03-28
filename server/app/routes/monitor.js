const express = require('express')
const monitorCtrl = require('../controller/monitorController');

const router = express.Router();

router.route('/')
    .get(monitorCtrl.createMetric);

module.exports = router;
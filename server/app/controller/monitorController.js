const gcpHelpers = require('../services/gcpHelpers');

function createMetric() {
    console.log("Creating Metric");
    gcpHelers.createUserHitMetric('home_page');
    res.status(200);
}

module.exports = { createMetric }
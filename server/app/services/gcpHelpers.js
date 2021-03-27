const monitoring = require('@google-cloud/monitoring');

// Creates a Stackdriver client
const client = new monitoring.MetricServiceClient();

async function createUserHitMetric(value) {

    const projectId = 'meal-planner-306012';
    const dataPoint = {
        interval: {
            endTime: {
                seconds: Date.now() / 1000,
            },
        },
        value: {
            doubleValue: 1.00,
        },
    };
    const metricType = 'custom.googleapis.com/users/' + value;
    console.log(metricType)
    const timeSeriesData = {
        metric: {
            type: metricType,
        },
        resource: {
            type: 'global',
            labels: {
                project_id: projectId,
            },
        },
        points: [dataPoint],
    };

    const request = {
        name: client.projectPath(projectId),
        timeSeries: [timeSeriesData],
    };
    // Writes time series data
    const result = await client.createTimeSeries(request);
    console.log('Done writing time series data.', result);
}

module.exports = {
    createUserHitMetric
}
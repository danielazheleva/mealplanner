const monitoring = require('@google-cloud/monitoring');

// Creates a Stackdriver client
const client = new monitoring.MetricServiceClient();

const projectId = 'meal-planner-306012';

const request = {
  name: client.projectPath(projectId),
  metricDescriptor: {
    description: 'User interaction with API',
    displayName: 'User Interactions',
    type: 'custom.googleapis.com/interaction/user_hit',
    metricKind: 'GAUGE',
    valueType: 'INT64',
    labels: [
      {
        key: 'interaction_type',
        valueType: 'STRING',
        description: 'Location of interaction',
      },
    ],
  },
};

// Creates a custom metric descriptor
const [descriptor] = await client.createMetricDescriptor(request);
console.log('Created custom Metric:\n');
console.log(`Name: ${descriptor.displayName}`);
console.log(`Description: ${descriptor.description}`);
console.log(`Type: ${descriptor.type}`);
console.log(`Kind: ${descriptor.metricKind}`);
console.log(`Value Type: ${descriptor.valueType}`);
console.log(`Unit: ${descriptor.unit}`);
console.log('Labels:');
descriptor.labels.forEach(label => {
  console.log(`  ${label.key} (${label.valueType}) - ${label.description}`);
});

async function createUserHitMetric(userHitLocation) {

    const projectId = 'meal-planner-306012';
    const dataPoint = {
        interval: {
            endTime: {
                seconds: Date.now() / 1000,
            },
        },
        value: {
            int64Value: "1",
        },
    };
    const timeSeriesData = {
        metric: {
            type: "custom.googleapis.com/interaction/user_hit",
            labels: {
                interaction_type: userHitLocation
            }
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
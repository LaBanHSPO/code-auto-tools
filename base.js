const AWS = require('aws-sdk')

module.exports = function({ ENDPOINT, ACCESS_KEY, SECRET_KEY, Bucket }) {
    // Configure client for use with Spaces
    const spacesEndpoint = new AWS.Endpoint(ENDPOINT);
    const s3 = new AWS.S3({
        endpoint: spacesEndpoint,
        accessKeyId: ACCESS_KEY,
        secretAccessKey: SECRET_KEY
    });
    return s3;
}
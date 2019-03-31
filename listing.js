
module.exports = function(s3, { Bucket, directory }) {
    return new Promise ((resolve, reject) => {
        const s3params = {
        Bucket,
        MaxKeys: 20,
        Delimiter: '/',
        Prefix: directory ? directory : ''
        };
        s3.listObjectsV2 (s3params, (err, data) => {
        if (err) {
            reject (err);
        }
        resolve (data);
        });
    });
}
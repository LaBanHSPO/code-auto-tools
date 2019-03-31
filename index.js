const init = require('./base');
const listing = require('./listing');
const Bucket = 'my-storage';
const ENDPOINT = 'sgp1.digitaloceanspaces.com';

const config = {
    ENDPOINT,
    ACCESS_KEY: 'FRQ64N3AN3LBBKSBHPKC', 
    SECRET_KEY: 'ox2xYRdqQQh1yQJwN3ugzpjuM2oRCe3F+QaY4yb7qvM',
    Bucket,
};

const s3 = init(config);

// list all images for gallery (cdn prefix)
const directory = 'sj-studio/'
const listPromise = listing(s3, { Bucket, directory });

// transform images url for mw
const CDN_ENDPOINT = 'sgp1.cdn.digitaloceanspaces.com';
const baseUrl = `https://${Bucket}.${CDN_ENDPOINT}`;

const imagesExt = ['.jpg', '.jpeg', '.png', '.svg', '.gif']; // => new RegExp
const regexStringPart = imagesExt.map(ext => `\\${ext}$`).join('||');
const fullRegexString = `/${regexStringPart}/i`;
const isImage = new RegExp(fullRegexString);

listPromise
    .then(data => {
        const files = data.Contents
        .filter(({Key}) => isImage.test(Key))
        .map(({Key}) => `${baseUrl}/${Key}`)
        .join('\n');
        console.log('files', files);
    })
    .catch(error => {
        console.log('woww, error', error);
    })


const redis = require('redis');
const client = redis.createClient();

// Function to set data in cache
function set(key, value) {
    client.set(key, JSON.stringify(value));
}

// Function to get data from cache
function get(key) {
    return new Promise((resolve, reject) => {
        client.get(key, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(JSON.parse(data));
        });
    });
}

module.exports = { set, get };

var AWS = require('aws-sdk')

const db = new AWS.DynamoDB.DocumentClient({convertEmptyValues: true});


module.exports = db;
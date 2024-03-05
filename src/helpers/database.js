var AWS = require('aws-sdk')

const db = AWS.DynamoDB.DocumentClient({convertEmptyValues: true});

module.exports = db;
#!/usr/bin/env babel-node
const fs = require('fs');
const path = require('path');
const {schema} = require('../data/schema/index.js');
const {printSchema} = require('graphql');

const schemaPath = path.resolve(__dirname, '../data/schema.graphql');

fs.writeFileSync(schemaPath, printSchema(schema));

console.log('Wrote ' + schemaPath);

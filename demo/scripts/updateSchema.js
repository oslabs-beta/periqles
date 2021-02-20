#!/usr/bin/env babel-node
const fs = require('fs');
const path = require('path');
const schema = require('../data/schema/index.js');
const {printSchema} = require('graphql');
// import graphql from 'graphql';
// const {printSchema} = graphql;
// const __dirname = path.dirname(new URL(import.meta.url).pathname);

const schemaPath = path.resolve(__dirname, '../data/schema.graphql');

fs.writeFileSync(schemaPath, printSchema(schema));

console.log('Wrote ' + schemaPath);

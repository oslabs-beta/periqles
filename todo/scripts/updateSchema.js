#!/usr/bin/env babel-node
import fs from 'fs';
import path from 'path';
import {schema} from '../data/schema/index.js';
import graphql from 'graphql';
const {printSchema} = graphql;
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const schemaPath = path.resolve(__dirname, '../data/schema.graphql');

fs.writeFileSync(schemaPath, printSchema(schema));

console.log('Wrote ' + schemaPath);

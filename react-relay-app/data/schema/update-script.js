// Make GraphQL write our queries and mutations to schema.graphql for us. Executed by npm script update-schema.

import fs from 'fs';
import path from 'path';
import {schema} from './index.js';
import {printSchema} from 'graphql';

const schemaPath = path.resolve(__dirname, '../schema.graphql');

fs.writeFileSync(schemaPath, printSchema(schema));
    

console.log('Updated schema with queries & mutations: ' + schemaPath);
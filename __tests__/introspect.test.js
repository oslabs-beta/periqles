const app = require('../__mocks__/mockServer.js');
const supertest = require('supertest');
//const { introspect } = require('../../src/functions.tsx');

const request = supertest(app);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Backend server listening on port: ${PORT}`);
//   });

const args = {
  clientMutationId: '0000'
};

const testQuery = {
  query: `query typeQuery($inputType: String!)
    {
  __type(name: $inputType) {
      name
      inputFields {
          name
          type {
              name
              kind
              ofType {
                  name
                  kind
                  enumValues {
                      name
                      description
                  }
              }
            }
        }
    }
  }`,
  variables: {
    inputType: 'AddUserInput',
  },
};

describe('Post request to graphql endpoint w/ introspection query should successfully return schema', () => {
  it('Should return a 200 status', async () => {
    const res = await request.post('/graphql')
      .send(testQuery)
      // console.log('this is the response body: ',res.body);
      expect(res.status).toBe(200)
  })
  it('Should return a response body object that has a data key whose value is an object w a __type key', async () => {
    const res = await request.post('/graphql')
      .send(testQuery)
      expect(Array.isArray(res.body)).toBe(false)
      expect(typeof res.body).toBe('object')

      expect(!res.body.data).toBe(false)
      expect(Array.isArray(res.body.data)).toBe(false)
      expect(typeof res.body.data).toBe('object')

      expect(!res.body.data.__type).toBe(false)
  })
  it('The value of the __type key s/b an object with a name property whose value is a string', async () => {
    const res = await request.post('/graphql')
      .send(testQuery)
      expect(Array.isArray(res.body.data.__type)).toBe(false)
      expect(typeof res.body.data.__type).toBe('object')

      expect(!res.body.data.__type.name).toBe(false)
      expect(typeof res.body.data.__type.name).toBe('string')
  })
  it('The value of the __type key s/b an object with an inputFields property whose value is an array of objects', async () => {
    const res = await request.post('/graphql')
      .send(testQuery)
      expect(!res.body.data.__type.inputFields).toBe(false)
      expect(Array.isArray(res.body.data.__type.inputFields)).toBe(true)
      expect(Array.isArray(res.body.data.__type.inputFields[0])).toBe(false)
      expect(typeof res.body.data.__type.inputFields[0]).toBe('object')            
  })
  it('Objects in the inputFields array should have a name property, whose value is a string', async () => {
    const res = await request.post('/graphql')
      .send(testQuery)
      expect(!res.body.data.__type.inputFields[0].name).toBe(false)
      expect(typeof res.body.data.__type.inputFields[0].name).toBe('string')            
  })
  it('Objects in the inputFields array should have a type property, whose value is an object', async () => {
    const res = await request.post('/graphql')
      .send(testQuery)
      expect(!res.body.data.__type.inputFields[0].type).toBe(false)
      expect(Array.isArray(res.body.data.__type.inputFields[0].type)).toBe(false)
      expect(typeof res.body.data.__type.inputFields[0].type).toBe('object')            
  })
})

xdescribe('Introspect Test', () => {
  const testMutationName = 'AddUser';
  let testFields = [];
  const testSetFields = (array) => {
  testFields = array.map((x) => x);
  }
  
 // introspect(testMutationName, testSetFields, args);

  xit('Should make a fetch request to /graphql', () => {
    //how to see fetch request response?
    //if the inputType name isn't found, shouLd get pre-defined error msg
  })
  it('Should update fields state to include input fields from schema ONLY if they are NOT in args', () => {
    console.log('testFields: ', testFields);
    
    const testInputFields = testSchema.inputFields;
    const testField = testFields[0];
    const testFieldName = testField.name;

    expect (Array.isArray(testFields)).toBe(true);
    expect(testFields.length).toBe(testInputFields.length - args.keys.length);
    expect (Array.isArray(testField).toBe(false));
    expect (typeof testField).toBe("object");
    expect (testFieldName).toBe(testInputFields[0].name);
    expect (args.testFieldName).toBe(undefined);
  })
});
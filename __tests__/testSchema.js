module.exports = { schema: {
  name: 'AddUserInput',
  inputFields: [
    {
      name: 'pizzaTopping',
      type: {
        name: null,
        kind: 'NON_NULL',
        ofType: {
          name: 'PizzaToppingEnum',
          kind: 'ENUM',
          enumValues: [
            {
              name: 'BUFFALO_CHICKEN',
            },
            {
              name: 'PEPPERONI',
            },
            {
              name: 'MEATLOVERS',
            },
            {
              name: 'EGGPLANT_PARM',
            },
            {
              name: 'OLIVES',
            },
            {
              name: 'HAWAIIAN',
            },
          ],
        },
      },
    },
    {
      name: 'clientMutationId',
      type: {
        name: 'String',
        kind: 'SCALAR',
        ofType: null,
      },
    },
  ],
}};

const typesArray = [
  {
    name: 'Query',
    fields: [
      {
        name: 'user',
        type: {
          name: 'User',
          kind: 'OBJECT',
          ofType: null,
        },
      },
      {
        name: 'demoUser',
        type: {
          name: 'DemoUser',
          kind: 'OBJECT',
          ofType: null,
        },
      },
      {
        name: 'node',
        type: {
          name: 'Node',
          kind: 'INTERFACE',
          ofType: null,
        },
      },
    ],
    kind: 'OBJECT',
    inputFields: null,
    ofType: null,
  },
  {
    name: 'User',
    fields: [
      {
        name: 'id',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'ID',
            kind: 'SCALAR',
          },
        },
      },
      {
        name: 'userId',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'String',
            kind: 'SCALAR',
          },
        },
      },
      {
        name: 'todos',
        type: {
          name: 'TodoConnection',
          kind: 'OBJECT',
          ofType: null,
        },
      },
      {
        name: 'totalCount',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'Int',
            kind: 'SCALAR',
          },
        },
      },
      {
        name: 'completedCount',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'Int',
            kind: 'SCALAR',
          },
        },
      },
    ],
    kind: 'OBJECT',
    inputFields: null,
    ofType: null,
  },
  {
    name: 'Node',
    fields: [
      {
        name: 'id',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'ID',
            kind: 'SCALAR',
          },
        },
      },
    ],
    kind: 'INTERFACE',
    inputFields: null,
    ofType: null,
  },
  {
    name: 'ID',
    fields: null,
    kind: 'SCALAR',
    inputFields: null,
    ofType: null,
  },
  {
    name: 'String',
    fields: null,
    kind: 'SCALAR',
    inputFields: null,
    ofType: null,
  },
  {
    name: 'TodoConnection',
    fields: [
      {
        name: 'pageInfo',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'PageInfo',
            kind: 'OBJECT',
          },
        },
      },
      {
        name: 'edges',
        type: {
          name: null,
          kind: 'LIST',
          ofType: {
            name: 'TodoEdge',
            kind: 'OBJECT',
          },
        },
      },
    ],
    kind: 'OBJECT',
    inputFields: null,
    ofType: null,
  },
  {
    name: 'PageInfo',
    fields: [
      {
        name: 'hasNextPage',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'Boolean',
            kind: 'SCALAR',
          },
        },
      },
      {
        name: 'hasPreviousPage',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'Boolean',
            kind: 'SCALAR',
          },
        },
      },
      {
        name: 'startCursor',
        type: {
          name: 'String',
          kind: 'SCALAR',
          ofType: null,
        },
      },
      {
        name: 'endCursor',
        type: {
          name: 'String',
          kind: 'SCALAR',
          ofType: null,
        },
      },
    ],
    kind: 'OBJECT',
    inputFields: null,
    ofType: null,
  },
  {
    name: 'Boolean',
    fields: null,
    kind: 'SCALAR',
    inputFields: null,
    ofType: null,
  },
  {
    name: 'TodoEdge',
    fields: [
      {
        name: 'node',
        type: {
          name: 'Todo',
          kind: 'OBJECT',
          ofType: null,
        },
      },
      {
        name: 'cursor',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'String',
            kind: 'SCALAR',
          },
        },
      },
    ],
    kind: 'OBJECT',
    inputFields: null,
    ofType: null,
  },
  {
    name: 'Todo',
    fields: [
      {
        name: 'id',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'ID',
            kind: 'SCALAR',
          },
        },
      },
      {
        name: 'text',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'String',
            kind: 'SCALAR',
          },
        },
      },
      {
        name: 'complete',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'Boolean',
            kind: 'SCALAR',
          },
        },
      },
    ],
    kind: 'OBJECT',
    inputFields: null,
    ofType: null,
  },
  {
    name: 'Int',
    fields: null,
    kind: 'SCALAR',
    inputFields: null,
    ofType: null,
  },
  {
    name: 'DemoUser',
    fields: [
      {
        name: 'id',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'ID',
            kind: 'SCALAR',
          },
        },
      },
      {
        name: 'userId',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'String',
            kind: 'SCALAR',
          },
        },
      },
      {
        name: 'username',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'String',
            kind: 'SCALAR',
          },
        },
      },
      {
        name: 'password',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'String',
            kind: 'SCALAR',
          },
        },
      },
      {
        name: 'email',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'String',
            kind: 'SCALAR',
          },
        },
      },
      {
        name: 'gender',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'String',
            kind: 'SCALAR',
          },
        },
      },
      {
        name: 'pizzaTopping',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'String',
            kind: 'SCALAR',
          },
        },
      },
      {
        name: 'age',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'String',
            kind: 'SCALAR',
          },
        },
      },
    ],
    kind: 'OBJECT',
    inputFields: null,
    ofType: null,
  },
  {
    name: 'Mutation',
    fields: [
      {
        name: 'addTodo',
        type: {
          name: 'AddTodoPayload',
          kind: 'OBJECT',
          ofType: null,
        },
      },
      {
        name: 'changeTodoStatus',
        type: {
          name: 'ChangeTodoStatusPayload',
          kind: 'OBJECT',
          ofType: null,
        },
      },
      {
        name: 'markAllTodos',
        type: {
          name: 'MarkAllTodosPayload',
          kind: 'OBJECT',
          ofType: null,
        },
      },
      {
        name: 'removeCompletedTodos',
        type: {
          name: 'RemoveCompletedTodosPayload',
          kind: 'OBJECT',
          ofType: null,
        },
      },
      {
        name: 'removeTodo',
        type: {
          name: 'RemoveTodoPayload',
          kind: 'OBJECT',
          ofType: null,
        },
      },
      {
        name: 'renameTodo',
        type: {
          name: 'RenameTodoPayload',
          kind: 'OBJECT',
          ofType: null,
        },
      },
      {
        name: 'addUser',
        type: {
          name: 'AddUserPayload',
          kind: 'OBJECT',
          ofType: null,
        },
      },
    ],
    kind: 'OBJECT',
    inputFields: null,
    ofType: null,
  },
  {
    name: 'AddTodoPayload',
    fields: [
      {
        name: 'todoEdge',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'TodoEdge',
            kind: 'OBJECT',
          },
        },
      },
      {
        name: 'user',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'User',
            kind: 'OBJECT',
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
    kind: 'OBJECT',
    inputFields: null,
    ofType: null,
  },
  {
    name: 'AddTodoInput',
    fields: null,
    kind: 'INPUT_OBJECT',
    inputFields: [
      {
        name: 'text',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'String',
            kind: 'SCALAR',
          },
        },
      },
      {
        name: 'userId',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'ID',
            kind: 'SCALAR',
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
    ofType: null,
  },
  {
    name: 'ChangeTodoStatusPayload',
    fields: [
      {
        name: 'todo',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'Todo',
            kind: 'OBJECT',
          },
        },
      },
      {
        name: 'user',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'User',
            kind: 'OBJECT',
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
    kind: 'OBJECT',
    inputFields: null,
    ofType: null,
  },
  {
    name: 'ChangeTodoStatusInput',
    fields: null,
    kind: 'INPUT_OBJECT',
    inputFields: [
      {
        name: 'complete',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'Boolean',
            kind: 'SCALAR',
          },
        },
      },
      {
        name: 'id',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'ID',
            kind: 'SCALAR',
          },
        },
      },
      {
        name: 'userId',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'ID',
            kind: 'SCALAR',
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
    ofType: null,
  },
  {
    name: 'MarkAllTodosPayload',
    fields: [
      {
        name: 'changedTodos',
        type: {
          name: null,
          kind: 'LIST',
          ofType: {
            name: null,
            kind: 'NON_NULL',
          },
        },
      },
      {
        name: 'user',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'User',
            kind: 'OBJECT',
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
    kind: 'OBJECT',
    inputFields: null,
    ofType: null,
  },
  {
    name: 'MarkAllTodosInput',
    fields: null,
    kind: 'INPUT_OBJECT',
    inputFields: [
      {
        name: 'complete',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'Boolean',
            kind: 'SCALAR',
          },
        },
      },
      {
        name: 'userId',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'ID',
            kind: 'SCALAR',
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
    ofType: null,
  },
  {
    name: 'RemoveCompletedTodosPayload',
    fields: [
      {
        name: 'deletedTodoIds',
        type: {
          name: null,
          kind: 'LIST',
          ofType: {
            name: null,
            kind: 'NON_NULL',
          },
        },
      },
      {
        name: 'user',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'User',
            kind: 'OBJECT',
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
    kind: 'OBJECT',
    inputFields: null,
    ofType: null,
  },
  {
    name: 'RemoveCompletedTodosInput',
    fields: null,
    kind: 'INPUT_OBJECT',
    inputFields: [
      {
        name: 'userId',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'ID',
            kind: 'SCALAR',
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
    ofType: null,
  },
  {
    name: 'RemoveTodoPayload',
    fields: [
      {
        name: 'deletedTodoId',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'ID',
            kind: 'SCALAR',
          },
        },
      },
      {
        name: 'user',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'User',
            kind: 'OBJECT',
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
    kind: 'OBJECT',
    inputFields: null,
    ofType: null,
  },
  {
    name: 'RemoveTodoInput',
    fields: null,
    kind: 'INPUT_OBJECT',
    inputFields: [
      {
        name: 'id',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'ID',
            kind: 'SCALAR',
          },
        },
      },
      {
        name: 'userId',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'ID',
            kind: 'SCALAR',
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
    ofType: null,
  },
  {
    name: 'RenameTodoPayload',
    fields: [
      {
        name: 'todo',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'Todo',
            kind: 'OBJECT',
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
    kind: 'OBJECT',
    inputFields: null,
    ofType: null,
  },
  {
    name: 'RenameTodoInput',
    fields: null,
    kind: 'INPUT_OBJECT',
    inputFields: [
      {
        name: 'id',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'ID',
            kind: 'SCALAR',
          },
        },
      },
      {
        name: 'text',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'String',
            kind: 'SCALAR',
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
    ofType: null,
  },
  {
    name: 'AddUserPayload',
    fields: [
      {
        name: 'userId',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'String',
            kind: 'SCALAR',
          },
        },
      },
      {
        name: 'username',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'String',
            kind: 'SCALAR',
          },
        },
      },
      {
        name: 'password',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'String',
            kind: 'SCALAR',
          },
        },
      },
      {
        name: 'email',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'String',
            kind: 'SCALAR',
          },
        },
      },
      {
        name: 'gender',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'String',
            kind: 'SCALAR',
          },
        },
      },
      {
        name: 'pizzaTopping',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'String',
            kind: 'SCALAR',
          },
        },
      },
      {
        name: 'age',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'Int',
            kind: 'SCALAR',
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
    kind: 'OBJECT',
    inputFields: null,
    ofType: null,
  },
  {
    name: 'AddUserInput',
    fields: null,
    kind: 'INPUT_OBJECT',
    inputFields: [
      {
        name: 'username',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'String',
            kind: 'SCALAR',
          },
        },
      },
      {
        name: 'password',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'String',
            kind: 'SCALAR',
          },
        },
      },
      {
        name: 'email',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'String',
            kind: 'SCALAR',
          },
        },
      },
      {
        name: 'gender',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'String',
            kind: 'SCALAR',
          },
        },
      },
      {
        name: 'pizzaTopping',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'String',
            kind: 'SCALAR',
          },
        },
      },
      {
        name: 'age',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'Int',
            kind: 'SCALAR',
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
    ofType: null,
  },
  {
    name: '__Schema',
    fields: [
      {
        name: 'description',
        type: {
          name: 'String',
          kind: 'SCALAR',
          ofType: null,
        },
      },
      {
        name: 'types',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: null,
            kind: 'LIST',
          },
        },
      },
      {
        name: 'queryType',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: '__Type',
            kind: 'OBJECT',
          },
        },
      },
      {
        name: 'mutationType',
        type: {
          name: '__Type',
          kind: 'OBJECT',
          ofType: null,
        },
      },
      {
        name: 'subscriptionType',
        type: {
          name: '__Type',
          kind: 'OBJECT',
          ofType: null,
        },
      },
      {
        name: 'directives',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: null,
            kind: 'LIST',
          },
        },
      },
    ],
    kind: 'OBJECT',
    inputFields: null,
    ofType: null,
  },
  {
    name: '__Type',
    fields: [
      {
        name: 'kind',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: '__TypeKind',
            kind: 'ENUM',
          },
        },
      },
      {
        name: 'name',
        type: {
          name: 'String',
          kind: 'SCALAR',
          ofType: null,
        },
      },
      {
        name: 'description',
        type: {
          name: 'String',
          kind: 'SCALAR',
          ofType: null,
        },
      },
      {
        name: 'specifiedByUrl',
        type: {
          name: 'String',
          kind: 'SCALAR',
          ofType: null,
        },
      },
      {
        name: 'fields',
        type: {
          name: null,
          kind: 'LIST',
          ofType: {
            name: null,
            kind: 'NON_NULL',
          },
        },
      },
      {
        name: 'interfaces',
        type: {
          name: null,
          kind: 'LIST',
          ofType: {
            name: null,
            kind: 'NON_NULL',
          },
        },
      },
      {
        name: 'possibleTypes',
        type: {
          name: null,
          kind: 'LIST',
          ofType: {
            name: null,
            kind: 'NON_NULL',
          },
        },
      },
      {
        name: 'enumValues',
        type: {
          name: null,
          kind: 'LIST',
          ofType: {
            name: null,
            kind: 'NON_NULL',
          },
        },
      },
      {
        name: 'inputFields',
        type: {
          name: null,
          kind: 'LIST',
          ofType: {
            name: null,
            kind: 'NON_NULL',
          },
        },
      },
      {
        name: 'ofType',
        type: {
          name: '__Type',
          kind: 'OBJECT',
          ofType: null,
        },
      },
    ],
    kind: 'OBJECT',
    inputFields: null,
    ofType: null,
  },
  {
    name: '__TypeKind',
    fields: null,
    kind: 'ENUM',
    inputFields: null,
    ofType: null,
  },
  {
    name: '__Field',
    fields: [
      {
        name: 'name',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'String',
            kind: 'SCALAR',
          },
        },
      },
      {
        name: 'description',
        type: {
          name: 'String',
          kind: 'SCALAR',
          ofType: null,
        },
      },
      {
        name: 'args',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: null,
            kind: 'LIST',
          },
        },
      },
      {
        name: 'type',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: '__Type',
            kind: 'OBJECT',
          },
        },
      },
      {
        name: 'isDeprecated',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'Boolean',
            kind: 'SCALAR',
          },
        },
      },
      {
        name: 'deprecationReason',
        type: {
          name: 'String',
          kind: 'SCALAR',
          ofType: null,
        },
      },
    ],
    kind: 'OBJECT',
    inputFields: null,
    ofType: null,
  },
  {
    name: '__InputValue',
    fields: [
      {
        name: 'name',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'String',
            kind: 'SCALAR',
          },
        },
      },
      {
        name: 'description',
        type: {
          name: 'String',
          kind: 'SCALAR',
          ofType: null,
        },
      },
      {
        name: 'type',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: '__Type',
            kind: 'OBJECT',
          },
        },
      },
      {
        name: 'defaultValue',
        type: {
          name: 'String',
          kind: 'SCALAR',
          ofType: null,
        },
      },
      {
        name: 'isDeprecated',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'Boolean',
            kind: 'SCALAR',
          },
        },
      },
      {
        name: 'deprecationReason',
        type: {
          name: 'String',
          kind: 'SCALAR',
          ofType: null,
        },
      },
    ],
    kind: 'OBJECT',
    inputFields: null,
    ofType: null,
  },
  {
    name: '__EnumValue',
    fields: [
      {
        name: 'name',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'String',
            kind: 'SCALAR',
          },
        },
      },
      {
        name: 'description',
        type: {
          name: 'String',
          kind: 'SCALAR',
          ofType: null,
        },
      },
      {
        name: 'isDeprecated',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'Boolean',
            kind: 'SCALAR',
          },
        },
      },
      {
        name: 'deprecationReason',
        type: {
          name: 'String',
          kind: 'SCALAR',
          ofType: null,
        },
      },
    ],
    kind: 'OBJECT',
    inputFields: null,
    ofType: null,
  },
  {
    name: '__Directive',
    fields: [
      {
        name: 'name',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'String',
            kind: 'SCALAR',
          },
        },
      },
      {
        name: 'description',
        type: {
          name: 'String',
          kind: 'SCALAR',
          ofType: null,
        },
      },
      {
        name: 'isRepeatable',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'Boolean',
            kind: 'SCALAR',
          },
        },
      },
      {
        name: 'locations',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: null,
            kind: 'LIST',
          },
        },
      },
      {
        name: 'args',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: null,
            kind: 'LIST',
          },
        },
      },
    ],
    kind: 'OBJECT',
    inputFields: null,
    ofType: null,
  },
  {
    name: '__DirectiveLocation',
    fields: null,
    kind: 'ENUM',
    inputFields: null,
    ofType: null,
  },
];

// convert schema from array to object for faster lookup times within PeriqlesForm
const schema = {};
typesArray.forEach((type) => {
  schema[type.name] = type;
});

export default schema;

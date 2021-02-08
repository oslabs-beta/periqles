/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type AddUserInput = {|
  username: string,
  password: string,
  email: string,
  gender: string,
  pizzaTopping: string,
  age: number,
  clientMutationId?: ?string,
|};
export type AddUserMutationVariables = {|
  input: AddUserInput
|};
export type AddUserMutationResponse = {|
  +addUser: ?{|
    +userId: string,
    +username: string,
    +password: string,
    +email: string,
    +gender: string,
    +pizzaTopping: string,
    +age: number,
  |}
|};
export type AddUserMutation = {|
  variables: AddUserMutationVariables,
  response: AddUserMutationResponse,
|};
*/


/*
mutation AddUserMutation(
  $input: AddUserInput!
) {
  addUser(input: $input) {
    userId
    username
    password
    email
    gender
    pizzaTopping
    age
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "AddUserPayload",
    "kind": "LinkedField",
    "name": "addUser",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "userId",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "username",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "password",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "email",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "gender",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "pizzaTopping",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "age",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AddUserMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AddUserMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "9be2400cb86e745643106650aafb2028",
    "id": null,
    "metadata": {},
    "name": "AddUserMutation",
    "operationKind": "mutation",
    "text": "mutation AddUserMutation(\n  $input: AddUserInput!\n) {\n  addUser(input: $input) {\n    userId\n    username\n    password\n    email\n    gender\n    pizzaTopping\n    age\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '0bac3490fbe0762506bf0d23ccb47958';

module.exports = node;

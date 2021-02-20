/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type GenderEnum = "FEMALE" | "MALE" | "NON_BINARY" | "%future added value";
export type PizzaToppingEnum = "BUFFALO_CHICKEN" | "EGGPLANT_PARM" | "HAWAIIAN" | "MEATLOVERS" | "OLIVES" | "PEPPERONI" | "%future added value";
export type AddUserInput = {|
  username: string,
  password: string,
  email: string,
  gender: GenderEnum,
  pizzaTopping: PizzaToppingEnum,
  age: number,
  clientMutationId?: ?string,
|};
export type UserProfile_AddUserMutationVariables = {|
  input: AddUserInput
|};
export type UserProfile_AddUserMutationResponse = {|
  +addUser: ?{|
    +userId: string,
    +username: string,
    +password: string,
    +email: string,
    +gender: GenderEnum,
    +pizzaTopping: PizzaToppingEnum,
    +age: number,
  |}
|};
export type UserProfile_AddUserMutation = {|
  variables: UserProfile_AddUserMutationVariables,
  response: UserProfile_AddUserMutationResponse,
|};
*/


/*
mutation UserProfile_AddUserMutation(
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
    "name": "UserProfile_AddUserMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UserProfile_AddUserMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "ae10689a7b5a621a1a09d833975f7f73",
    "id": null,
    "metadata": {},
    "name": "UserProfile_AddUserMutation",
    "operationKind": "mutation",
    "text": "mutation UserProfile_AddUserMutation(\n  $input: AddUserInput!\n) {\n  addUser(input: $input) {\n    userId\n    username\n    password\n    email\n    gender\n    pizzaTopping\n    age\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '4ad681667ade44b20d61b8c3be8a43f8';

module.exports = node;

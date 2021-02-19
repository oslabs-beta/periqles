/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type GenderEnum = "FEMALE" | "MALE" | "NON_BINARY" | "%future added value";
export type PizzaToppingEnum = "BUFFALO_CHICKEN" | "EGGPLANT_PARM" | "HAWAIIAN" | "MEATLOVERS" | "OLIVES" | "PEPPERONI" | "%future added value";
export type UserProfileQueryVariables = {||};
export type UserProfileQueryResponse = {|
  +demoUser: ?{|
    +userId: string,
    +username: string,
    +password: string,
    +email: string,
    +gender: GenderEnum,
    +pizzaTopping: PizzaToppingEnum,
    +age: number,
  |}
|};
export type UserProfileQuery = {|
  variables: UserProfileQueryVariables,
  response: UserProfileQueryResponse,
|};
*/


/*
query UserProfileQuery {
  demoUser {
    userId
    username
    password
    email
    gender
    pizzaTopping
    age
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "userId",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "password",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "email",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "gender",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "pizzaTopping",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "age",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "UserProfileQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "DemoUser",
        "kind": "LinkedField",
        "name": "demoUser",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "UserProfileQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "DemoUser",
        "kind": "LinkedField",
        "name": "demoUser",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "008d2a939fead39076a8f348e1e16a70",
    "id": null,
    "metadata": {},
    "name": "UserProfileQuery",
    "operationKind": "query",
    "text": "query UserProfileQuery {\n  demoUser {\n    userId\n    username\n    password\n    email\n    gender\n    pizzaTopping\n    age\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '580eda27b22841abb40c50c703c7ed8d';

export default node;

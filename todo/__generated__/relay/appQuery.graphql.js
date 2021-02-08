/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
import type { AddUser_demoUser$ref } from "./AddUser_demoUser.graphql";
export type appQueryVariables = {|
  demoUserId?: ?string
|};
export type appQueryResponse = {|
  +demoUser: ?{|
    +$fragmentRefs: AddUser_demoUser$ref
  |}
|};
export type appQuery = {|
  variables: appQueryVariables,
  response: appQueryResponse,
|};
*/


/*
query appQuery(
  $demoUserId: String
) {
  demoUser(demoUserId: $demoUserId) {
    ...AddUser_demoUser
    id
  }
}

fragment AddUser_demoUser on DemoUser {
  userId
  username
  password
  email
  gender
  pizzaTopping
  age
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "demoUserId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "demoUserId",
    "variableName": "demoUserId"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "appQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "DemoUser",
        "kind": "LinkedField",
        "name": "demoUser",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AddUser_demoUser"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "appQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "DemoUser",
        "kind": "LinkedField",
        "name": "demoUser",
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
          },
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
    "cacheID": "3faafb14c8057faf711239bebabd538d",
    "id": null,
    "metadata": {},
    "name": "appQuery",
    "operationKind": "query",
    "text": "query appQuery(\n  $demoUserId: String\n) {\n  demoUser(demoUserId: $demoUserId) {\n    ...AddUser_demoUser\n    id\n  }\n}\n\nfragment AddUser_demoUser on DemoUser {\n  userId\n  username\n  password\n  email\n  gender\n  pizzaTopping\n  age\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'd685a518d2d741a064a1422bd19f627f';

module.exports = node;

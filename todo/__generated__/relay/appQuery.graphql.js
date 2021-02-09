/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
import type { UserProfile_demoUser$ref } from "./UserProfile_demoUser.graphql";
export type appQueryVariables = {|
  demoUserId?: ?string
|};
export type appQueryResponse = {|
  +demoUser: ?{|
    +$fragmentRefs: UserProfile_demoUser$ref
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
    ...UserProfile_demoUser
    id
  }
}

fragment UserProfile_demoUser on DemoUser {
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
            "name": "UserProfile_demoUser"
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
    "cacheID": "d6f40ac2a8c1493b41f6cfab5f2c11f2",
    "id": null,
    "metadata": {},
    "name": "appQuery",
    "operationKind": "query",
    "text": "query appQuery(\n  $demoUserId: String\n) {\n  demoUser(demoUserId: $demoUserId) {\n    ...UserProfile_demoUser\n    id\n  }\n}\n\nfragment UserProfile_demoUser on DemoUser {\n  userId\n  username\n  password\n  email\n  gender\n  pizzaTopping\n  age\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'f967825ec838754c66a19385997516eb';

module.exports = node;

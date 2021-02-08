/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type AddUser_demoUser$ref: FragmentReference;
declare export opaque type AddUser_demoUser$fragmentType: AddUser_demoUser$ref;
export type AddUser_demoUser = {|
  +userId: string,
  +username: string,
  +password: string,
  +email: string,
  +gender: string,
  +pizzaTopping: string,
  +age: string,
  +$refType: AddUser_demoUser$ref,
|};
export type AddUser_demoUser$data = AddUser_demoUser;
export type AddUser_demoUser$key = {
  +$data?: AddUser_demoUser$data,
  +$fragmentRefs: AddUser_demoUser$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AddUser_demoUser",
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
  "type": "DemoUser",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = '668e65f64e97b0342c877e9e30f0aad8';

module.exports = node;

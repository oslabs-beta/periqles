/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
export type GenderEnum = "FEMALE" | "MALE" | "NON_BINARY" | "%future added value";
export type PizzaToppingEnum = "BUFFALO_CHICKEN" | "EGGPLANT_PARM" | "HAWAIIAN" | "MEATLOVERS" | "OLIVES" | "PEPPERONI" | "%future added value";
import type { FragmentReference } from "relay-runtime";
declare export opaque type UserProfile_demoUser$ref: FragmentReference;
declare export opaque type UserProfile_demoUser$fragmentType: UserProfile_demoUser$ref;
export type UserProfile_demoUser = {|
  +userId: string,
  +username: string,
  +password: string,
  +email: string,
  +gender: GenderEnum,
  +pizzaTopping: PizzaToppingEnum,
  +age: number,
  +$refType: UserProfile_demoUser$ref,
|};
export type UserProfile_demoUser$data = UserProfile_demoUser;
export type UserProfile_demoUser$key = {
  +$data?: UserProfile_demoUser$data,
  +$fragmentRefs: UserProfile_demoUser$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserProfile_demoUser",
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
(node/*: any*/).hash = 'c87a25eb45d4af2bf59d24f759fec51c';

module.exports = node;

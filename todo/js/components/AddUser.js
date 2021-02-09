// @flow
/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only.  Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import React from 'react';
import {createFragmentContainer, graphql} from 'react-relay';
import AddUserMutation from '../mutations/AddUserMutation';
// import {PeriqlesForm} from '../../../index.js';
import schema from './schema';
// import PeriqlesForm from './PeriqlesForm.js';
import periqlesFormWrapper from './PeriqlesForm.js';
import type {RelayProp} from 'react-relay';
import type {TodoApp_user} from 'relay/TodoApp_user.graphql';

type Props = {|
  +relay: RelayProp,
  +user: TodoApp_user,
|};

const AddUser = ({relay, demoUser, environment}: Props) => {
  // mock props for PeriqlesForm
  // AddUserMutation.commit(relay.environment, 'UN1', 'PW1', 'E1', 'Nonbinary', 'Hawaiian', 1);
  // console.log('demoUser in AddUser component:', demoUser);
  // // mock making closure

  // const environment = {
  //   networkLayer: 'fake network layer',
  //   store: 'fake Relay store',
  // };
  console.log('this is the schema: ', schema);
  const PeriqlesForm = periqlesFormWrapper(schema, environment);

  //iterate over the properties of the user & create a list item for each
  const userDisplayItems = [];
  for (const info in demoUser) {
    let listItem = <li className="userDisplayItem">{info}: demoUser[info]</li>;
    userDisplayItems.push(listItem);
  }

  //Need to know:
  //1: Prop name
  return (
    <div>
      <ul>{userDisplayItems}</ul>
      <PeriqlesForm
        mutationName={'AddUser'}
        mutationGQL={graphql`
          mutation AddUserMutation($input: AddUserInput!) {
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
        `}
        args={[{name: 'clientMutationId', value: '0000'}]}
      />
    </div>
  );
};

export default createFragmentContainer(AddUser, {
  demoUser: graphql`
    fragment AddUser_demoUser on DemoUser {
      userId
      username
      password
      email
      gender
      pizzaTopping
      age
    }
  `,
});

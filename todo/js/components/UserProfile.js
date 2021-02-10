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
import PeriqlesForm from './PeriqlesForm.jsx';
import type {RelayProp} from 'react-relay';
import type {TodoApp_user} from 'relay/TodoApp_user.graphql';

type Props = {|
  +relay: RelayProp,
  +user: TodoApp_user,
|};

const UserProfile = ({relay, demoUser}: Props) => {
  // console.log('demoUser in UserProfile component:', demoUser);
  // console.log('environment in UserProfile component:', relay.environment);

  //Create an array for all the user profile info list items
  const userDisplayItems = [];
  userDisplayItems.push(<li className="userDisplayItem">Username: {demoUser.username}</li>);
  userDisplayItems.push(<li className="userDisplayItem">Email: {demoUser.email}</li>);
  userDisplayItems.push(<li className="userDisplayItem">Gender: {demoUser.gender}</li>);
  userDisplayItems.push(<li className="userDisplayItem">Pizza Topping: {demoUser.pizzaTopping}</li>);
  userDisplayItems.push(<li className="userDisplayItem">Age: {demoUser.age}</li>);
  
  return (
    <div>
      <ul>{userDisplayItems}</ul>
      <PeriqlesForm
        environment={relay.environment}
        mutationName={'AddUser'}
        mutationGQL={graphql`
          mutation UserProfile_AddUserMutation($input: AddUserInput!) {
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
        specifications={{
          fields: {
            pizzaTopping: {
              label:'Pizza Topping',
              element:'select'
            }
          }
        }}
        args={[{name: 'clientMutationId', value: '0000'}]}
      />
    </div>
  );
};

export default createFragmentContainer(UserProfile, {
  demoUser: graphql`
    fragment UserProfile_demoUser on DemoUser {
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

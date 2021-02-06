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
// import {PeriqlesForm} from '../../../index.js';
// import PeriqlesForm from './PeriqlesForm.js';
import periqlesFormWrapper from './PeriqlesForm.js';
import type {RelayProp} from 'react-relay';
import type {TodoApp_user} from 'relay/TodoApp_user.graphql';

type Props = {|
  +relay: RelayProp,
  +user: TodoApp_user,
|};

const AddUser = ({relay, user}: Props) => {
  // const handleTextInputSave = (text: string) => {
  //   AddTodoMutation.commit(relay.environment, text, user);
  //   return;
  // };


  // mock props for PeriqlesForm
 

  // // mock making closure
  // const schema = [{name: 'name', type: 'String'}];
  // const environment = {networkLayer: 'fake network layer', store: 'fake Relay store'};
  // const PeriqlesForm = periqlesFormWrapper(schema, environment);


  //Need to know:
    //1: Prop name
}
export default AddUser;

export default createFragmentContainer(AddUser, {
  user: graphql`

    fragment AddUser_userInfo on DemoUser {
      userId 
      username 
      password
      email
      gender
      pizzaTopping
      age
    }
`};


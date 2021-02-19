/* eslint-disable no-lone-blocks */
import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import renderer from 'react-test-renderer';

//components to test
import PeriqlesForm from '../ts/components/PeriqlesForm'
import UserProfile from '../ts/components/UserProfile'
import { format } from 'prettier';

//Setting up adapter
configure({ adapter: new Adapter() });

//React Component Tests
describe('Periqles unit tests', () => {
  //PeriqlesForm  Tests
  describe('Form Tags' => {
    let wrapper; 
    const props = {
    }
    
    beforeAll(() => {
      wrapper = shallow(<PeriqlesForm/>)
    })
   
    if ('Should render a form tag with a className of PeriqlesForm', () => {

    })

    if ('Should render a form tag with an onSubmit function that calls handleSubmit with the synthetic event and fields as arguments', () => {

    })

    if ('Should render a h2 tag with headerText props', () => {

    })

    if ('Should render input elements if the field prop has a length > 0', () => {

    })

    if ('Should render a p tag with the  "Loading form..." if the field prop has a length > 0', () => {

    })

    if ('Should render a button with a className of periqles-submit', () => {

    })

    if ('Should render a button with an onSubmit function that calls handleSubmit with the synthetic event and fields as arguments', () => {

    })

    if ('Should render a button with the text "Submit"', () => {

    })


  })
})



//PERIQLES FORM COMPONENT FOR REFERENCE
// <form
// className="PeriqlesForm"
// aria-labelledby="form"
// onSubmit={(e) => handleSubmit(e, fields)}>
// <h2>{headerText}</h2>
// {fields.length ? renderFields(fields) : <p>Loading form...</p>}
// <button
//   className="periqles-submit"
//   onClick={(e) => handleSubmit(e, fields)}>
//   Submit
// </button>
// </form>


//USER PROFILE COMPONENT FOR REFERENCE
{/* <section className="UserProfile">
      <h1>Periqles Demo</h1>
      <section className="UserProfile-flex">
        <PeriqlesForm
          environment={modernEnvironment}
          mutationName={'AddUser'}
          mutationGQL={mutationGQL}
          specifications={specifications}
          args={args}
          callbacks={{onSuccess, onFailure}}
        />
        <main className="UserProfile-main">
          <h2>Most Recently Added User</h2>
          <QueryRenderer
            environment={modernEnvironment}
            query={graphql`
              query UserProfileQuery {
                demoUser {
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
            render={({error, props}: {error: Error; props: QueryResponse}) => {
              if (props && !props.demoUser) {
                return <p>Sign up...</p>;
              }
              if (props && props.demoUser) {
                const {demoUser} = props;
                console.log('Rendering DemoUser query response...');
                return (
                  <ul>
                    <li className="userDisplayItem">
                      Username: {demoUser.username}
                    </li>
                    <li className="userDisplayItem">Email: {demoUser.email}</li>
                    <li className="userDisplayItem">
                      Gender: {demoUser.gender}
                    </li>
                    <li className="userDisplayItem">
                      Favorite Pizza Topping: {demoUser.pizzaTopping}
                    </li>
                    <li className="userDisplayItem">Age: {demoUser.age}</li>
                  </ul>
                );
              } else if (error) {
                // return <p>{error.message}</p>;
                console.error(error.message);
              }

              return <p>Loading...</p>;
            }}
          />
        </main>
      </section>
    </section> */}

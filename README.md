<p align="center">
<img src="/periqles-logo.png" alt="logo" width="300"/>
<br />
<a href="https://github.com/oslabs-beta/periqles/graphs/contributors"><img src="https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge" alt="Contributors"></a>
<a href="https://github.com/oslabs-beta/periqles/stargazers"><img src="https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge" alt="Stargazers"></a>
<a href="https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge"><img src="https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge" alt="MIT License"></a>
</p>

<h1 align="center">periqles</h1>
<p align="center">
  Painless forms for GraphQL.
  <br />
    <a href="">Demo →</a>
</p>

<p>Periqles is a React component library for Relay and Apollo that makes it easy to collect user input.</p>

<p>Periqles abstracts away the dirty work of form creation — with override switches built in for the design-conscious developer — so you can be free to focus on business logic. Given the name of a GraphQL mutation, periqles introspects the project's schema and intuits a form to match it. No need to waste time debugging React state management or fussing with flexbox — just drop in a <PeriqlesForm /> tag and go on with your life.</p>

>*“Having knowledge but lacking the power to express it clearly is no better than never having any ideas at all.”  
-- Pericles*

<h2>🚧 periqles is not yet ready for deployment. Stay tuned! 🚧</h2>

<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#installation">Server</a></li>
        <li><a href="#installation">Schema</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
<!--     <li><a href="#roadmap">Roadmap</a></li> -->
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#built-with">Maintainers</a></li>
    <li><a href="#built-with">Acknowledgements</a></li>
  </ol>
</details>

---

## Getting Started

To add a `<PeriqlesForm />` to your Apollo or Relay client, follow these steps.

### Prerequisites

* React (v. 16.8.0 and up)
  ```sh
  npm install react
  ```

### Installation

1. Install periqles from the terminal.
    ```
    npm install periqles
    ```
2. Optionally, for TypeScript projects, install @types/periqles.
    ```
    npm install @types/periqles
    ```
4. Import PeriqlesForm into your frontend.
    ```
    // MyReactComponent.jsx
    import PeriqlesForm from 'periqles';
    ```

### Server

Periqles relies on introspection queries to intuit the optimal form UI from your project's GraphQL schema. These queries will hit your server in the form of POST requests to `/graphql`. To use periqles, you must expose your schema at that `/graphql` endpoint. 

In our [demo](https://github.com/oslabs-beta/periqles-demo), we use the client-agnostic `express-graphql` package to spin up a server in Node for our GraphQL API. See the documentation [here](https://graphql.org/graphql-js/express-graphql/) and our code [here](https://github.com/oslabs-beta/periqles-demo/blob/main/server.js). Apollo projects may use the Apollo Server without problems.

```
//server.js
const express = require('express');
const {graphqlHTTP}  = require('express-graphql');
const app = express();
const {schema} = require('./data/schema/index.js');

app.post(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    pretty: true,   // pretty-print JSON responses
  }),
);
```

If you are not using the `/graphql` endpoint to serve your API, options include configuring your server to redirect requests to `/graphql` to the correct endpoint or using a build tool like Webpack to proxy requests to `/graphql` to the correct address.

### Schema 

Currently, the introspection query used by periqles expects to find named input types on the schema. I.e., if you tell a `<PeriqlesForm />` to generate a UI for your `AddUser` mutation, it will query your schema for a type called `AddUserInput`. Then it will render an input element for each input field listed on the `AddUserInput` type. 

This means that periqles will successfully introspect this mutation:

```
#schema.graphql
type Mutation {
  addUser(input: AddUserInput!): AddUserPayload
}

# The mutation input is named and defined separately from the mutation.
input AddUserInput {
  username: String!
  password: String!
  email: String!
  gender: GenderEnum!
  pizzaTopping: PizzaToppingEnum!
  age: Int!
}
```

... but trying to introspect this mutation will cause your GraphQL server to throw back a `400 Bad Request` error:

```
#schema.graphql
# The mutation input is not named and is defined in-line.
type Mutation {
  addUser(input: {
    username: String!
    password: String!
    email: String!
    gender: GenderEnum!
    pizzaTopping: PizzaToppingEnum!
    age: Int!
  }!): AddUserPayload
}
```

This is a high-priority area of improvement for us. We welcome PRs and other contributions.


---

## Usage

`<PeriqlesForm />` takes a number of props, including optional props to override its default logic for more fine-grained control over the apperance and composition of the form, the data sent to the API on submit, and state-management behavior, including optimistic updating.

**Props available to all clients:**

- `mutationName`: string _(required)_ The name of a mutation as it appears on your GraphQL schema, e.g. 'AddUser' or 'AddUserMutation'.
  - If this is the only prop provided, periqles will render a form with default HTML intuited based on the name and scalar data type of each input field. E.g., an input field of type 'String' will result in `<input type="text">`. If the name of the input field appears in periqles' dictionary of common input fields, it will render a more specifically appropriate element. For example, a string-type field with the name 'password' will result in `<input type="password">`, and a field named 'mobile' will result in `<input type="tel">`.
- `specifications`: object _(optional)_ If you wish to control the HTML or state management of a particular field, provide the instructions here. Periqles will fall back to its default logic for any fields or details not specified here.
  - `header`: string _(optional)_ If you wish to put a header on your form, e.g. "Sign up!", pass it here. 
  - `fields`: object _(optional)_ Each key on `fields` should correspond to the name of an input field exactly as it appears on the schema. (E.g., based on the schema example above, 'pizzaTopping' is a valid key to use.) You can override defaults for as many or as few fields as you wish.
    - `element`: string _(required)_ The HTML element you wish to use for this field, e.g. 'textarea', 'radio', 'datetime', etc. 
    - `label`: string or element _(required)_ The text, HTML, or JSX you wish to appear as a label for this field.
    - `options`: array _(optional)_ Whether or not this field is listed as an enumerated type on the schema, you may constrain valid user input on the frontend by using 'select' or 'radio' for the `element` field and providing a list of options here. 
        - `option`: object _(optional)_ Specifies an option for this dropdown or group of radio buttons.
          - `label`: string or element _(required)_ The label you wish to appear for this option.
          - `value`: string or number _(required)_ The value to be submitted to the API. 
- `args`: object _(optional)_ If there are any variables that you want to submit as input for the mutation but don't want to render as elements on the form, pass them here as key-value pairs. Example use cases include client-side authentication information or the `clientMutationId` in Relay. E.g.: `const args = {userId: '001', clientMutationId: ${mutationId++}}`. Fields included here will be excluded from the rendered form.  
- `callbacks`: object _(optional)_ Developer-defined functions to be invoked when the form is submitted.  
    - `onSuccess`: function _(optional)_ Invoked if the mutation is successfully submitted to the API. In our demo ([Relay](https://github.com/oslabs-beta/periqles-demo/blob/main/ts/components/relay/UserProfile.tsx), [Apollo](https://github.com/oslabs-beta/periqles-demo/blob/main/ts/components/ApolloUserProfile.tsx)), we use onSuccess to trigger a very simple re-fetch and re-render of a component which displays `<PeriqlesForm />`'s output.
    - `onFailure`: function _(optional)_ Invoked if the mutation fails to fire or the API sends back an error message. Use this to display meaningful error messages to the user.

See below for more usage information specific to your client.

### Relay

We plan to add support for passing any or all of commitMutation's callback parameters on `<PeriqlesForm />`'s `callbacks` prop. (i.e., `updater`, `optimisticResponse`, `optimisticUpdater`, `configs`, and `cacheConfigs`). If this is a high priority for your use case, please let us know by opening an issue, or submit a PR.

### Apollo

### Styles


<!-- ## Roadmap -->

<!-- See the [open issues](https://github.com/oslabs-beta/periqles/issues) for a list of proposed features and known issues. -->



## Contributing

If you would like to contribute to periqles, please fork this repo. Commit your changes to a feature branch and open a pull request. We appreciate your contributions to this open-source project!


## License

Distributed under the MIT License. See `LICENSE` for more information.


## Maintained by:

- [Cameron Baumgartner](https://github.com/cameronbaumgartner)
- [Ian Garrett](https://github.com/eeeeean)
- [Joe Toledano](https://github.com/JosephToledano)
- [Kelly Porter](https://github.com/kporter101)

## Built with:

* [React (Hooks)](https://reactjs.org/)
* [GraphQL](https://graphql.org/)
* [Relay](https://relay.dev/)
* [Apollo](https://www.apollographql.com/)
* the support of [OSLabs](https://github.com/open-source-labs)

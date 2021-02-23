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

<p>Periqles abstracts away the dirty work of form creation — with override switches built in for the design-conscious developer — so you can be free to focus on business logic. Given the name of a GraphQL mutation, periqles introspects the project's schema and intuits a form to match it. No more fussing with React state management or HTML/CSS — just drop in a `<PeriqlesForm />` tag and go on with your life.</p>

>*“Having knowledge but lacking the power to express it clearly is no better than never having any ideas at all.”  
-- Pericles*

<h2>🚧 periqles is not yet ready for deployment. Stay tuned! 🚧</h2>

<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#built-with">Built With</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#installation">Schema</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
<!--     <li><a href="#roadmap">Roadmap</a></li> -->
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

### Built With

* [React (Hooks)](https://reactjs.org/)
* [GraphQL](https://graphql.org/)
* the support of [OSLabs](https://github.com/open-source-labs)


## Getting Started

To add a `<PeriqlesForm />` to your Apollo or Relay client, follow these steps.

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```
* React (v. 16.8.0 and up)
  ```sh
  npm install react
  ```

### Installation

1. Install periqles from the terminal.
   ```sh
   npm install periqles
   ```
2. For TypeScript projects: install @types/periqles.
  ```sh
  npm install @types/periqles
  ```
4. Import a PeriqlesForm into your frontend.
   ```MyReactComponent.jsx
   import PeriqlesForm from 'periqles';
   ```

### Schema

Periqles relies on introspection queries to intuit the optimal form UI from your project's GraphQL schema. These queries will hit your server in the form of POST requests to `/graphql`. To use periqles, you must expose your schema at that `/graphql` endpoint. 

In our [demo](https://github.com/oslabs-beta/periqles-demo), we use the client-agnostic `express-graphql` package to spin up a server in Node for our GraphQL API. See the documentation [here](https://graphql.org/graphql-js/express-graphql/) and our code [here](https://github.com/oslabs-beta/periqles-demo/blob/main/server.js). Apollo projects may use the Apollo Server without problems.

```server.js
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

## Usage

### Relay

### Apollo


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

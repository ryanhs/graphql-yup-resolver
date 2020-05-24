# graphql-yup-resolver

![npm](https://img.shields.io/npm/v/graphql-yup-resolver)  ![node-current](https://img.shields.io/node/v/graphql-yup-resolver)  [![Build Status](https://travis-ci.com/ryanhs/graphql-yup-resolver.svg?branch=master)](https://travis-ci.com/ryanhs/graphql-yup-resolver)  [![Coverage Status](https://coveralls.io/repos/github/ryanhs/graphql-yup-resolver/badge.svg?branch=master)](https://coveralls.io/github/ryanhs/graphql-yup-resolver?branch=master)  

yeah graphql have scalars, but? but?


## Installation

straight forward:

**Make sure you install yup first:**

```bash
yarn add yup
```

**Then install this lib:**

```bash
yarn add graphql-yup-resolver
```


## Usage Example

```javascript
/* your-resolver.js */

const createYupResolver = require('graphql-yup-resolver');

const fn = createYupResolver({

  // graphql args
  args: {
    name: yup.string().required().min(3),
  },

  // actual resolver, protected by yup
  resolver: (_, { name }) => `hello ${name}!`,

});

```


## LICENSE

-

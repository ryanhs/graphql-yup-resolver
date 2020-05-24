# graphql-yup-resolver

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

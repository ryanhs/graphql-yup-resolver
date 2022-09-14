# graphql-yup-resolver

![npm](https://img.shields.io/npm/v/graphql-yup-resolver)  ![node-current](https://img.shields.io/node/v/graphql-yup-resolver)  [![CircleCI](https://dl.circleci.com/status-badge/img/gh/ryanhs/graphql-yup-resolver/tree/master.svg?style=shield)](https://dl.circleci.com/status-badge/redirect/gh/ryanhs/graphql-yup-resolver/tree/master)  [![Coverage Status](https://coveralls.io/repos/github/ryanhs/graphql-yup-resolver/badge.svg?branch=master)](https://coveralls.io/github/ryanhs/graphql-yup-resolver?branch=master)  

yeah graphql have scalars, but? but?


>! since 2.0.0 typescript support available, i rewriten this library with typescript.


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

## Usage Example (using typescript)

```typescript
/* src/index.ts */

import Pino from 'pino';
import makeResolver from "graphql-yup-resolver";
import { isConstructorDeclaration } from "typescript";
import * as yup from 'yup';

const logger = Pino({
  transport: {
    target: "pino-pretty",
  },
});

const hello = makeResolver({
  args: { name: yup.string() },
  resolver: (_: any, { name }: { name: string }) => `hello ${name}!`,
});

(async () => {
  const result = await hello({}, { name: "ryan" });
  logger.info(result); // just dump to console the result
})();

```


## Build Targets

> [Node-Target-Mapping](https://github.com/microsoft/TypeScript/wiki/Node-Target-Mapping)  
> Current build focused to node 10

## LICENSE

-

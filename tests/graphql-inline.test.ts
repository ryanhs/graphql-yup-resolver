import * as yup from 'yup';
import createYupResolver from '../src';

import gql from 'graphql-tag';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { graphql } from 'graphql';


test('aa', async () => {
  const typeDefs = gql`
    type Query {
      hello(name: String): String
    }
  `;
  
  const resolvers = {
    Query: {
      hello: createYupResolver({
        args: { name: yup.string().required() },
        resolver: (_: any, { name }: { name: string }) => `hello ${name}!`,
      }),
    },
  };

  const query = `{ hello(name: "dadang") }`;

  const result = await graphql({
    schema: makeExecutableSchema({
      typeDefs,
      resolvers,
    }),
    source: query
  });

  expect(result).toEqual(
    expect.objectContaining({
      data: expect.objectContaining({
        hello: `hello dadang!`,
      }),
    }),
  );
})

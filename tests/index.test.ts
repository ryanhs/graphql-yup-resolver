import * as yup from 'yup';
import createYupResolver, { CodedError } from '../src';

describe('test createYupResolver', () => {
  describe('validate args', () => {
    const fn = createYupResolver({
      args: {
        name: yup.string().required().min(3),
      },
      resolver: (_: any, { name }: any) => `hello ${name}!`,
    });

    it('fails, be at least 3 chars', () =>
      expect(fn(null, { name: 'a' })).rejects.toThrow(/be at least/gi));

    it('fails, required', () =>
      expect(fn(null, {})).rejects.toThrow(/required/gi));

    it('fails, E_INVALID_ARGINS', async () => {
      const err = await fn(null, { name: 'a' }).catch((e: any) => e);
      expect(err).toEqual(
        expect.objectContaining({
          code: 'E_INVALID_ARGINS',
        }),
      );
    });

    it('success with var', () =>
      expect(fn(null, { name: 'foobar' })).resolves.toBe('hello foobar!'));
  });

  describe('validate without args', () => {
    const fn = createYupResolver({
      resolver: () => 'hello world!',
    });

    it('success without var', () => expect(fn()).resolves.toBe('hello world!'));
  });

  describe('custom code', () => {
    it('success without var', async () => {
      const fn = createYupResolver({
        resolver: () => {

          const err = new CodedError("YAAAHH");
          err.code = 'E_NOT_FOUND'; 
          err.httpStatusCode = 304; 
          throw err;
        },
      });

      const err = await fn().catch((e: any) => e);
      expect(err).toEqual(
        expect.objectContaining({
          code: 'E_NOT_FOUND',
          httpStatusCode: 304,
        }),
      );
    });
  });
});

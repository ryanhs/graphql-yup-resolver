const yup = require('yup'); // eslint-disable-line import/no-extraneous-dependencies
const flaverr = require('flaverr'); // eslint-disable-line import/no-extraneous-dependencies

module.exports = ({ args: validationArgs, resolver }) => async (parent, args = {}, context, info) => {
  // validate args
  let argsValidated = args;
  const argsSchema = yup.object().shape(validationArgs);
  argsValidated = await argsSchema.validate(args).catch((err) => {
    throw flaverr({ code: 'E_INVALID_ARGINS' }, new Error(err.toString()));
  });

  const result = await Promise.resolve(resolver(parent, argsValidated, context, info)).catch((err) => {
    throw flaverr(
      {
        code: err.code || 'E_UNKNOWN_ERROR',
      },
      new Error(err.toString()),
    );
  });

  return result;
};

const yup = require("yup"); // eslint-disable-line import/no-extraneous-dependencies

module.exports = ({ args: validationArgs, resolver }) => async (
  parent,
  args = {},
  context,
  info
) => {
  try {
    // validate args
    let argsValidated = args;
    const argsSchema = yup.object().shape(validationArgs);
    argsValidated = await argsSchema.validate(args);

    return resolver(parent, argsValidated, context, info);
  } catch (err) {
    // make code for error, inspired from sails.js
    err.code = "E_INVALID_ARGINS";

    throw err;
  }
};

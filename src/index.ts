import * as yup from 'yup';

export class CodedError extends Error {
  code: string | undefined;
  httpStatusCode?: number;
}

type resolverType = (
  parent?: any,
  args?: any,
  context?: any,
  info?: any,
) => unknown;

interface makeResolverProps {
  args?: any;
  resolver: resolverType;
}

const makeResolver = ({
  args: validationArgs,
  resolver,
}: makeResolverProps) => {
  // singleton validator
  const argsSchema = yup.object().shape(validationArgs);

  return async (
    parent: any = {},
    args: any = {},
    context: any = {},
    info: any = {},
  ) =>
    argsSchema
      .validate(args)
      .catch((err) => {
        const tmpError = err as CodedError;
        tmpError.code = 'E_INVALID_ARGINS';
        throw tmpError;
      })
      .then((argsValidated) => resolver(parent, argsValidated, context, info));
};

export default makeResolver;

declare module 'flaverr' {

  // constructor(attrs: any, err: Error);
  
  const flaverrCreate: (codeOrCustomizations: any, err: Error, caller?: void) => Error;

  export default flaverrCreate
}
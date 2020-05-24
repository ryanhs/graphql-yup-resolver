const yup = require("yup");
const createYupResolver = require("./index.js");

describe("test createYupResolver", () => {
  describe("validate args", () => {
    const fn = createYupResolver({
      args: {
        name: yup.string().required().min(3),
      },
      resolver: (_, { name }) => `hello ${name}!`,
    });

    it("fails, be at least 3 chars", () =>
      expect(fn(null, { name: "a" })).rejects.toThrow(/be at least/gi));

    it("fails, required", () =>
      expect(fn(null, {})).rejects.toThrow(/required/gi));

    it("success with var", () =>
      expect(fn(null, { name: "foobar" })).resolves.toBe("hello foobar!"));
  });

  describe("validate without args", () => {
    const fn = createYupResolver({
      resolver: () => "hello world!",
    });

    it("success without var", () => expect(fn()).resolves.toBe("hello world!"));
  });
});

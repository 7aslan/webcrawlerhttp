const { normalizeURL } = require("./crawl.js");
const { test, expect } = require("@jest/globals");

test("normalizeURL strip protocol", () => {
  const input = "https://facebook.com/profiles";
  const actual = normalizeURL(input);
  const expected = "facebook.com/profiles";
  expect(actual).toEqual(expected);
});

test("normalizeURL strip trailing slash", () => {
    const input = "https://facebook.com/profiles/";
    const actual = normalizeURL(input);
    const expected = "facebook.com/profiles";
    expect(actual).toEqual(expected);
  });
  
  test("normalizeURL capitals", () => {
    const input = "https://FACEBOOK.com/profiles/";
    const actual = normalizeURL(input);
    const expected = "facebook.com/profiles";
    expect(actual).toEqual(expected);
  });
  
  test("normalizeURL strip http", () => {
    const input = "http://facebook.com/profiles/";
    const actual = normalizeURL(input);
    const expected = "facebook.com/profiles";
    expect(actual).toEqual(expected);
  });
  
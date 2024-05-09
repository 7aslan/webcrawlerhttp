const { normalizeURL, getURLsFromHTML } = require("./crawl.js");
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

test("getURLsFromHTML absolute", () => {
  const inputHTMLBody = `
    <html>
        <body>
            <a href="https://facebook.com/path/">
            Facebook Blog
            </a>
        </body>
    </html>
  `;
  const inputBaseURL = "https://facebook.com/path/";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://facebook.com/path/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML relative", () => {
    const inputHTMLBody = `
      <html>
          <body>
              <a href="/path/">
              Facebook Blog
              </a>
          </body>
      </html>
    `;
    const inputBaseURL = "https://facebook.com";
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ["https://facebook.com/path/"];
    expect(actual).toEqual(expected);
  });

  test("getURLsFromHTML both", () => {
    const inputHTMLBody = `
      <html>
          <body>
              <a href="https://facebook.com/path1/">
              Facebook Blog Path 1
              </a>
              <a href="/path2/">
              Facebook Blog Path 2
              </a>
          </body>
      </html>
    `;
    const inputBaseURL = "https://facebook.com";
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ["https://facebook.com/path1/","https://facebook.com/path2/"];
    expect(actual).toEqual(expected);
  });

  test("getURLsFromHTML invalid", () => {
    const inputHTMLBody = `
      <html>
          <body>
              <a href="invalid">
              Invalid URL
              </a>
          </body>
      </html>
    `;
    const inputBaseURL = "https://facebook.com";
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = [];
    expect(actual).toEqual(expected);
  });
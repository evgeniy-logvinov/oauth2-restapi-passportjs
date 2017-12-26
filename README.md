### oauth2-restapi-passportjs
OAuth2 restapi with passportjs and nodejs.

### Nodemon
Nodemon is a utility that will monitor for any changes in your source and automatically restart your server.
Instead of using node server.js to run your application, you can use nodemon server.js.

npm install -g nodemon

### Node Inspector
Node Inspector is a debugger interface for Node.js applications that uses the Blink Developer Tools. The really cool thing is that it works almost exactly as the Chrome Developer Tools.

Some of the things you can do with Node Inspector are:

Navigate in your source files
1) Set breakpoints (and specify trigger conditions)
2) Step over, step in, step out, resume (continue)
3) Inspect scopes, variables, object properties
4) Hover your mouse over an expression in your source to display its value in a tooltip
5) Edit variables and object properties
6) Continue to location
7) Break on exceptions
8) Disable/enable all breakpoints

Once it is installed, you can run it using the following command. This will start the debugger and open your browser.

node-debug server.js

npm install -g node-inspector

### MongoDB
Use mongoose for using with mongoDB

npm install mongoose --save

### Body parser
extended
The extended option allows to choose between parsing the URL-encoded data with the querystring library (when false) or the qs library (when true). The "extended" syntax allows for rich objects and arrays to be encoded into the URL-encoded format, allowing for a JSON-like experience with URL-encoded. For more information, please see the  
[qs library]
(https://www.npmjs.com/package/qs#readme).

Defaults to true, but using the default has been deprecated. Please research into the difference between qs and querystring and choose the appropriate setting.

### Links
http://scottksmith.com/blog/2014/05/05/beer-locker-building-a-restful-api-with-node-crud/

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/body-parser.svg
[npm-url]: https://npmjs.org/package/body-parser
[travis-image]: https://img.shields.io/travis/expressjs/body-parser/master.svg
[travis-url]: https://travis-ci.org/expressjs/body-parser
[coveralls-image]: https://img.shields.io/coveralls/expressjs/body-parser/master.svg
[coveralls-url]: https://coveralls.io/r/expressjs/body-parser?branch=master
[downloads-image]: https://img.shields.io/npm/dm/body-parser.svg
[downloads-url]: https://npmjs.org/package/body-parser
[gratipay-image]: https://img.shields.io/gratipay/dougwilson.svg
[gratipay-url]: https://www.gratipay.com/dougwilson/
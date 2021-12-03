## run test file
npm i mocha@5.2.0 -g
mocha tests/test.js

### all tests in folder
mocha ./tests --recursive
### all tests in folder and nested
mocha ./tests/**/*.test.js

## test async code
chai plugin [https://www.chaijs.com/plugins/chai-as-promised/]

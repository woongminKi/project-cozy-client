// serve.js

const serve = require('serve');

const server = serve('build', {
  port: 3000, // 필요에 따라 포트 번호를 변경할 수 있습니다.
});

console.log('Server is running on port 3000');

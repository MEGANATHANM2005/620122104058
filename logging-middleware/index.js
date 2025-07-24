const fs = require('fs');
const path = require('path');

// Ensure the logs file exists
const logFilePath = path.join(__dirname, 'logs.txt');
if (!fs.existsSync(logFilePath)) {
  fs.writeFileSync(logFilePath, '');
}

function logger(req, res, next) {
  const start = Date.now();

  res.on('finish', () => {
    const log = `
[${new Date().toISOString()}]
Method: ${req.method}
URL: ${req.originalUrl}
Status: ${res.statusCode}
Time: ${Date.now() - start}ms
IP: ${req.ip}
Body: ${JSON.stringify(req.body)}

-----------------------
`;

    fs.appendFileSync(logFilePath, log);
  });

  next();
}

module.exports = logger;

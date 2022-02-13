const express = require('express');
const path = require('path');
const fs = require('fs');
// const auth = require('koa-basic-auth');
// const Router = require('koa-router');
const app = express();

// const basicAuth = require('express-basic-auth')
// const adminUser = process.env.ADMIN_USER || 'admin';
// const adminPassword = process.env.ADMIN_PASSWORD || 'password';

app.use(express.static(path.join(__dirname, '../public')));

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, '../build', 'index.html'));
// });

app.get('/sourceConfig', function (req, res) {
  let json = fs.readFileSync(path.join(__dirname, '../public', 'sourceConfig.json'));
  let obj = JSON.parse(json)
  res.json(obj)
});


// app.use(basicAuth({
//     users: { [adminUser]: adminPassword }
// }))
app.use(express.json())


app.post('/saveToFile', function (req, res) {
  const configSavePath = process.env.REACT_APP_SAVE_TO_FILE_PATH || './config.json';
  fs.writeFileSync(configSavePath, JSON.stringify(req.body.workspaceConfig));
  res.send('Saved to file');
});

app.listen(9000);
#!/usr/bin/env node

const app = require('./app');
const port = process.env.PORT || process.argv[2] || 8080;

app.listen(port);
console.log(`Server running on ${port}\n`);

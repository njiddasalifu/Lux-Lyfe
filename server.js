import mongoose from 'mongoose';
import config from './configurations/config.js';

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

import server from './app.js';

let DATABASE = config.db.dev;
let env = config.env;
if (env === 'production') {
  DATABASE = config.db.prod;
}
if (env === 'test') {
  DATABASE = config.db.test;
}

// Connect to MongoDB
mongoose
  .connect(DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database connection established successfully');
  })
  .catch((error) => {
    console.log('Unable to connect to database:💥 ', error.message);
  });

// Start server
const port = config.port;
server.listen(port, () => {
  console.log(`App running on port ${port}....`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLER REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

export default server;

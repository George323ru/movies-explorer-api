const MONGO_URL = 'mongodb://localhost:27017/bitfilmsdb';

const mongoConfig = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

module.exports = {
  MONGO_URL,
  mongoConfig,
};

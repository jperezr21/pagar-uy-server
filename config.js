module.exports = {
  port: process.env.PORT || 5000,
  db: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost/HelloMongoose',
  }
};

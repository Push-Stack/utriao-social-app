const mongoose = require('mongoose');

const db = process.env.MONGO_URI;

const ConnectDB = async () => {
  try {
    await mongoose.connect(db, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.log(` Mongodb Database Error  => ${error.name} ${error.message}`);
    console.log('Server is shutting down');
    process.exit(1);
  }
};

module.exports = ConnectDB;

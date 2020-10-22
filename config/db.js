
const mongoose = require("mongoose");

// Replace this with your MONGOURI.
const MONGOURI = "mongodb+srv://dbAbhishek:dbAbhishek@cluster0.qaadd.mongodb.net/dbAbhishek?retryWrites=true&w=majority";

const InitiateMongoServer = async () => {
  try {
     mongoose.connect(MONGOURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    const connection = mongoose.connection;
    connection.once("open", () => {
      console.log("MongoDB database connection established successfully");
    });

  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;
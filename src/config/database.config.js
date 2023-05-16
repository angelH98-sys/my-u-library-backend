const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_DB_URL);

    console.log("Mongo database running");
  } catch (error) {
    console.log(error);
    throw new Error(`Error in database connection`);
  }
};

module.exports = {
  dbConnection,
};

const mongoose = require('mongoose');

const dbConnection = async() => {
  
  try {
    mongoose.connect(process.env.MONGO_URI, ()=>{
      console.log('Database connected');
    });
  } catch (error) {
    console.log(error);
    throw new Error('Error in the data base connection')  
  }
}

module.exports = {
  dbConnection
}
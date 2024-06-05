const mongoose = require('mongoose');
const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGOOSEDB)
        console.log('connectDB successfully');
    } catch (error) {
        console.log('connectDB fail');
    }
}

module.exports = {connectDB}
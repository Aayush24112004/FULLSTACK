const mongoose = require('mongoose');
function connectDB() {
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to the database successfully');
    })
}

module.exports = connectDB;
const mongoose = require('mongoose');


// const dbPass = encodeURIComponent('Singhal\@1234');

const connectDB = (url) => {
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });
}

module.exports = connectDB;
// .then(() => console.log(`Connected to the DB`)).catch((err) => console.log(err));
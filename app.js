const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');
require('dotenv').config();


const port = process.env.PORT || 3000;

// middleware
app.use(express.static('./public'));
app.use(express.json());


// routes
// app.get('/hello', (req, res) => {
//     res.status(200).send("Task Manager App");
// })

// app.get('/', (req, res) => {
//     res.status(200).send('Home Page');
// })


app.use('/api/v1/tasks', tasks);
app.use(notFound);
app.use(errorHandler);

app.get('*', (req, res) => {
    res.status(404).send('Invalid Page');
})

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => 
        console.log(`Server is listening on port ${port} ...`));

    } catch (error) {
        console.log(error);
    }
}


start();
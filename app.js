const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/conn')
require('dotenv').config()

const PORT = 3000;

app.use(express.static('./public/'))
app.use(express.json())

app.use('/api/v1/tasks', tasks)





const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, console.log(`server is listening on port ${PORT}`));
    }
    catch(err){
        console.log(err)
    }
}

start()
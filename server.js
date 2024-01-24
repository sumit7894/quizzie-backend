const express = require('express');
const {PORT} = require('./src/config/serverConfig')
const connect = require('./src/config/database');
const authRouter = require('./src/routes/authRoute')
const cors = require('cors');
// const bookRouter = require('./src/routes/bookRoutes');
const app = express();
app.use(express.json());
app.use(cors());
app.use('/',authRouter);
app.listen(PORT,()=>{
    console.log(`Server started at the port ${PORT}`)
    connect();
    console.log("Yup!! Server is runnning");
})

const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const otpRoutes = require('./routes/otpRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;


connectDB();


app.use(bodyParser.json());


app.use('/api', otpRoutes);

app.get("/",(req,res)=>{
    res.send("Hello world")
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

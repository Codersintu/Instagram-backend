require('dotenv').config();

const PORT=process.env.PORT || 5000;
const { configDotenv } = require("dotenv");
const server = require("./app");
server.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
})









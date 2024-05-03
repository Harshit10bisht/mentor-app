const express = require('express');
const cors = require('cors');
const app = express();
const userRouter = require('./routes/user.js');
require('dotenv').config();
require('./db/mongoose.js');
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(userRouter);

// app.get('/test', (req, res) => {
//     console.log("HELLO GUYS");
//     res.send({ data: "HELLO"});
// });

app.listen(port, () => {
    console.log(`Listening to http://localhost:${port}`);
});
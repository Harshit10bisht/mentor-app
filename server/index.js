const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/user.js');
const dashboardRouter = require('./routes/dashboard.js');
require('dotenv').config();
require('./db/mongoose.js');
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(userRouter);
app.use(dashboardRouter);

// app.get('/test', (req, res) => {
//     console.log("HELLO GUYS");
//     res.send({ data: "HELLO"});
// });

app.listen(port, () => {
    console.log(`Listening to http://localhost:${port}`);
});
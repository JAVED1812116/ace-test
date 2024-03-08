const express = require('express');
const app = express();
const http = require('http')
const cors = require('cors');
const fileUpload = require('express-fileupload');
const connectToMongo = require('./database');
const all_routes = require('./routes/index');
const error_handler = require("./middlewares/error_handler");
const { PORT } = require('./config');
app.use(
    cors({
        origin: function (origin, callback) {
            return callback(null, true);
        },
        optionsSuccessStatus: 200,
        credentials: true,
    })
)

app.use(express.json())

app.use(fileUpload({
    useTempFiles: true
}))

// Initialized all routes
app.use(all_routes)

// Initial Route
app.get('*', (req, res) => {
    res.send('<h1 style="text-align:center;">Welcome to Ace</h1>');

})

connectToMongo()

app.use(error_handler)

// Start the server
app.listen(PORT || 7000, () => {
    console.log('Server listening on port 7000');
});


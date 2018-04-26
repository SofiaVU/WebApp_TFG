let express = require('express');
let bodyParser = require('body-parser');
let fileUpload = require('express-fileupload');
let expressSanitizer = require('express-sanitizer');
import {router} from "./requests";
import {createServer} from 'http';

// Creating router for handling video requests
let app = express();
export let server = createServer(app);
let port = process.env.VIDEO_SERVER_PORT || '8000';

//Available ports for streaming
export let ports = [];

for (var i = 8001; i < 8031; i++) {
    ports.push({
        port: i,
        available: true,
        server: null,
        listeners: 0
    });
}



//Port
app.set('port', port);

//FileUpload
app.use(fileUpload());

//QueryURL
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(expressSanitizer());

//Allowing CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


//Router listening
server.listen(port, function() {
    console.log('Video server listening for requests on: ' + port);
});

// Rendering routes
app.use('/', router);


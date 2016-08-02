## HTTP Server with a bodyparser module

##### To install, clone this repo then run

    npm install
    node server.js

    The server will be listening on port 8080 by default.

##### Body parser

    POST requests to any path with a valid JSON body will be parsed to an object.

    Requests with any other method will result in an error message.
    Requests with a invalid JSON body will result in an error message.

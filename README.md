# Words test application demo

***

## Purpose

The idea is to make a sample of mcq test to check if a word is (noun, verb, adverb, adjective) with several other convenient feautures

This sample application is featured in our [book](http://goo.gl/gKEsIo) where you can find detailed description of the patterns and techniques used to write this code:

## Stack

* Backend: [Node.js](http://nodejs.org/)
* Front-end: [AngularJS](http://www.angularjs.org/) on the client



## Installation

You can run the app whether through docker or within the directory of the apps itself
* To run through docker you should install docker on you machine and type the commands below.
```
// build with no cache
docker-compose build --no-cache
// start the services
docker-compose up
```
* To run without docker.
* Step into the frontend folder and run
```
// to install angular cli
npm install -g @angular/cli @angular-devkit/build-angular
// to install required dependencies
npm install
// to start the app
npm start
```
* Step into the api folder and run
```
// to install dependencies
npm install
// to run api
node server.js
```

### App Server
The server is run by default at http://localhost:3080

### Client App
The app is run by default at http://localhost:4201

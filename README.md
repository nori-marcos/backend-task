# Introduction
This project was developed using TypeScript , NestJS, MongoDB and RabbitMQ. It is a REST api to manage users.

## HTTP requests
1. POST/api/user: to save a user in the MongoDB and to send a simple notification by rabbitMq
2. GET/api/user/{userId}: to retrieve information from https://reqres.in/api/users/{userId}
3. GET/api/user/{userId}/avatar: to save base64 image in the db and to download the image in the file system.
4. DELETE/api/user/{userId}/avatar: to delete base64 image from the db and the file system.

## How to run
1. "npm install" to install all the dependencies
2. "npm run start:dev" to run the application
3. MongoDb and Rabbit needs to be running locally in the default ports 27017 and 5672 respectively.
4. 

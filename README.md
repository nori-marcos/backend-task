# User Management REST API with NestJS, MongoDB, and RabbitMQ

This project is a user management REST API developed using TypeScript, NestJS, MongoDB, and RabbitMQ. It allows you to perform CRUD operations on users and provides additional features like sending notifications and handling images.

## HTTP Requests

1. **POST /api/user**: Saves a user in MongoDB and sends a simple notification using RabbitMQ.
2. **GET /api/user/{userId}**: Retrieves information from the external API https://reqres.in/api/users/{userId} for the specified user.
3. **GET /api/user/{userId}/avatar**: Saves a base64 image in the database and allows downloading the image to your file system.
4. **DELETE /api/user/{userId}/avatar**: Deletes a base64 image from the database and the file system.

## How to Run

1. Install the dependencies by running: `npm install`.
2. Start the application in development mode with: `npm run start:dev`.
3. Make sure MongoDB and RabbitMQ are running locally on their default ports (MongoDB: 27017, RabbitMQ: 5672).
4. Access the Swagger documentation for better understanding and API exploration: [http://localhost:3000/api](http://localhost:3000/api).

## Note

Please ensure you have MongoDB and RabbitMQ properly set up and running before starting the application. The provided API endpoints can be used to manage users and interact with the external API for user information. The RabbitMQ integration allows for simple notifications, and the API also handles image storage and deletion. Feel free to explore the Swagger documentation for further details on each API endpoint.

# PUPStols
## _DBMS for the University's Stall Owners_

This repository contains the client-side and the server-side code for the PUPStols project. The client handles the presentation layer, user interface, and interaction with end-users. The server is responsible for handling backend logic, database operations, and serving data to the client-side application.

## TODOs

- [ ] Implement authentication middleware.
- [ ] Refactor `server.js` for better error handling.
- [ ] Update API documentation in `routes/`.
- [ ] Optimize database queries in `controllers/`.
- [ ] Add unit tests for controllers.

## Features (On Progress)

- Authentication System
- Log in and log out function
- Dashboard
- Profile
- Sign Up
- Inventory Management

> This project aims to connect MariaDB with Node.js 
> to build a web application for PUP stall owners. 
> MariaDB will manage data storage, while Node.js will handle 
> the server-side operations.

## Technologies Used

PUPStols uses a number of open source projects to work properly:

- [React](https://react.dev/): A JavaScript library for building user interfaces, maintained by Facebook.
- [Node.js](https://nodejs.org/en): A JavaScript runtime built on Chrome's V8 JavaScript engine, used for server-side scripting.
- [Express](https://expressjs.com/): A fast, unopinionated, minimalist web framework for Node.js.
- [MariaDB](https://mariadb.org/): An open-source relational database management system, compatible with MySQL.
- [bcrypt](https://www.npmjs.com/package/bcrypt): A library to help hash passwords.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): An implementation of JSON Web Tokens (JWT) for authentication.

## Folder Structure

    .
    ├── client                  # Client-side folder
    │ ├──── node_modules        # React Packages
    │ ├──── public              # Auto-generated react files
    │ └──── src                 # Source files
    ├── server                  # Server-side folder
    │ ├──── config              # Database connection
    │ ├──── controllers         # Controllers 
    │ ├──── middlewares         # Middlewares
    │ ├──── models              # Models
    │ ├──── node_modules        # Node Packages
    │ └──── routes              # Routes
    └── README.md

## Server

### 1. Config

The `config` directory stores the configuration settings for the server. This includes database configuration (`db.js`), and other settings.

### 2. Controllers

The `controllers` directory contains modules that handle the business logic of different entities in the application. Each controller file corresponds to a set of related functionalities.

### 3. Middlewares

The `middlewares` directory includes custom middleware functions used throughout the application.

### 4. Routes

The `routes` directory defines the endpoints (API routes) of the server application. Each route file specifies how HTTP requests are routed to the appropriate controller methods.

### 5. server.js

`server.js` is the main entry point of the server-side application. It initializes the Express server, connects to the MariaDB database using configurations from `config/db.js`, and sets up middleware and routes. This file starts listening for incoming requests and handles server-side operations.

## Getting Started

To get started with the server-side code:

1. Ensure Node.js and npm are installed on your machine.

2. Install dependencies using.

```bash
npm install 
```

3. Configure the database connection in `config/db.js` as per your MariaDB database environment.

4. Run the server.
```bash
node server.js
```

You can also install [nodemon](https://www.npmjs.com/package/nodemon) globally to automatically restart the server when files change:
```bash
npm install nodemon
```

## Additional Notes

- None so far
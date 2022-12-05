# BE Take Home Project

## Overview 

This is a small take home assignment that aims to have the candidate become familiar with our stack (TypeScript, NestJS, Fastify, Prisma, etc) while assessing their coding skills and standard practices at the same time. 

The main goal of this test is to see the compatibility of both parties regarding technical skills and development stack.

You will need to fork this repository, work on your own codebase and share the link to your fork once the assignment is completed.

NestJS is being used as backend framework, the webserver is being started in the [main.ts](https://github.com/Minded-Engineering/take-home-be/blob/main/src/main.ts) file

## Description
Create a RESTful API that returns a list of Star Wars planets and their information from a local SQLite DB.

To accomplish this task you will be using the [The Star Wars API (SWAPI)](https://swapi.dev/) and a local SQLite DB.

The [Prisma ORM](https://www.prisma.io/) comes bundled already as one of the dependencies in the repository, however, feel free to change it and use any library that you feel comfortable working with.

- Feel free to modify the existing code base as much as you want.
- Use as many best practices as you feel are useful to make the code more readable, maintainable and scalable.
- We love code comments, the `async/await` approach and well placed `logs` for visibility.

## Goals

- The main goal is to create an API server that will expose 3 different endpoints:
  1. A list all planets endpoint.
  2. A fetch planet (`id`) endpoint.
  3. A delete planet (`id`) endpoint.

### Building the list endpoint:
  1. The endpoint will return the list of planets stored in the local database (SQLite DB), the information from planets to be stored are: `name, diameter, gravity, terrain, timestamps`.
  2. The endpoint will take a `name` value via `query parameter` that will be used to search for a matching planet in the [The Star Wars API (SWAPI)](https://swapi.dev/). In case there is a match, the planet(s) in the response must be stored in the local DB.
  3. While using the `name parameter`, in case of a matching planet in the local DB (exact name title) return the match(es) right away (do not execute a request to the SWAPI).
  4. In case there's more than 5 planets in the response of the endpoint, a pagination mechanisn must be used to navigate through the list of planets.

### Building the fetch and delete endpoints:
  1. Both of these endpoints will take an `id` path parameter `/url/{id}` and will execute the expected action in the local DB.
  2. In case an invalid `id` is provided, a `404` message must be returned as response.
  3. Both of these endpoints should have authentication (We do not expect a login/logout mechanism), any Bearer token that can be used to _secure_ the endpoints from public access is enough, feel free to choose any strategy you see fit to accomplish the task.

### Bonus
- Create unit tests for the code developed.

## Running the app

This app was built using the [Nest](https://github.com/nestjs/nest) framework TypeScript repository.

You can use Docker, but we suggest for the sake of speed, to set up a local env with Node and SQLite instead

### Dependencies

- [NestJS](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)
- [Swagger](https://swagger.io/) (OpenAPI)
- [SQLite](https://www.sqlite.org/index.html)

### Commands

```sh
# To start working, install dependencies:
$ npm install

# You can run the app in watch mode
$ npm run start:dev
```

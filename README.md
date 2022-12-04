# BE Take Home Project

## Overview 

This is a small take home assignment that aims to have the candidate become familiar with our stack (TypeScript, NestJS, Fastify, Prisma, etc) while assessing their coding skills and standard practices at the same time. 

The main goal of this test is to see the compatibility of both parties in both technical skills and technological stack.

You will need to fork this respository and share the link back to your code once completed.

## Description
Create a RESTful API that returns a list of movies and their information from a local SQLite DB.

To accomplish this task you will be using the [Open Movie Database](http://www.omdbapi.com/) public API and a local SQLite DB.

The [Prisma ORM](https://www.prisma.io/) comes bundled already as one of the dependencies in the repository, however, feel free to change it and use any library that you feel comfortable working with.

- Feel free to modify existent code as much as you want.
- Use as many best practices as you feel are useful to make the code more readable, maintainable and scalable.

## Goals

- The main goal is to create an API server that will expose 3 different endpoints:
  1. A list movies endpoint.
  2. A fetch movie (`id`) endpoint.
  3. A delete movie (`id`) endpoint.

### Building the list endpoint:
  1. The endpoint will return the list of movies stored in the local database (SQLite DB), the information from movies to be stored are: `title, year, description, rating, timestamps`.
  2. The endpoint will take a `title` value via query parameter that will be used to search for a matching movie in the [OMDb](http://www.omdbapi.com/) API. In case there is a match, the movie(s) in the response must be stored in the local DB.
  3. While using the `title` param, in case there is a matching movie in the local DB (exact title name) return that match right away (do not execute a request to the OMDb API).
  4. In case there's more than 5 movies in the response, a pagination mechanisn must be used to navigate through the list of movies.

### Building the fetch and delete endpoints:
  1. Both of these endpoints will take an `id` path parameter `/url/{id}` and will execute the expected action in the local DB.
  2. In case an invalid `id` is provided, a `404` message must be returned as response.
  3. Both of these endpoints should have authentication (nothing 'fancy', any Bearer token - could be a constant - that can be validated is more than ok).

### Bonus
- Create unit tests for the code developed.

## Running the app

This app was built using the [Nest](https://github.com/nestjs/nest) framework TypeScript repository.

You can use Docker, but we suggest for the sake of speed, to setup a local env with Node and SQLite instead

### Dependencies

- NestJS
- Prisma
- Typescript 4.3.5
- Swagger (OpenAPI)
- SQLite (as main storage)

### Commands

```sh
# To start working, install dependencies:
$ npm install

# You can run the app in watch mode
$ npm run start:dev
```

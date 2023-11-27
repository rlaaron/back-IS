<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Requirements

You need to have installed:

- [docker](https://www.docker.com/get-started/)
- [nodejs](https://nodejs.org/en/)
- [pnpm](https://pnpm.io/installation)
- [nestjs/cli](https://docs.nestjs.com/cli/overview)
- [TablePlus or other database manager](https://tableplus.com/)
 
## Installation

1. clon repository
```bash
$ git clone
```
2. install dependencies
```bash
$ pnpm install
```
3. clone .env.template to .env
4. change .env variables
5. run database
```bash
$ docker compose up -d
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Stay in touch

- Author - [Aaron Rincon](https://github.com/rlaaron)

## License

Nest is [MIT licensed](LICENSE).

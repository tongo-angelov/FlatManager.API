# Flat manager API

Backend for the FlatManager app

<br />

# Table of Contents

- [TODO Checklist](#todo-checklist)
- [Quick start](#quick-start)
- [Production build](#production-build-with-docker)

  <br />

# TODO Checklist

- [x] Add README
- [ ] Add TODOs
- [ ] Add API documentation

<br />

# Quick start

### First clone this repo and install dependencies

```shell
git clone https://github.com/tongo-angelov/flatmanager.api.git
cd flatmanager.api
npm i
```

### Then create .env file in the root directory

Rename `.env.example` to `.env` and modify the MONGO_URL env variable with the address, username and password of your MongoDB, either from Atlas or local installation

```shell
MONGO_URL = mongodb+srv://<user>:<password>@cluster0.whokvny.mongodb.net
or
MONGO_URL = mongodb://localhost:27017
```

### Now we can start the app

```shell
npm run dev
```

<br />

# Production build with Docker

### First you need to build the app

Run `build` command to create `dist` folder with production app

```shell
npm run build
```

### Now we can build docker image

Run docker build command and set image tag

```shell
sudo docker build -t tongo/api:0.1.0 .
```

### And last, lets run the image

Use the example ['docker-compose'](/docker-compose.yaml) file. The example compose includes both mongodb and mongo-express, to view and modify the db.
If you use Atlas you can set your connection string in environment

```shell
    environment:
      MONGO_URL: mongodb://mongo:27017
```

_If you set other image tag than `tongo/api:0.1.0`, you will need to change it in the `docker-compose.yaml` file_

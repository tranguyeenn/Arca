## DOCKER BUILD GUIDE

This process will easily take 2GB+ of storage

![alt text](image.png)

### Step 1: Install Docker

Start by installing docker [here](https://docs.docker.com/get-started/get-docker/)

### Step 2: Clone the repo

```bash
git clone https://github.com/aditauqir/Arca-dev.git
```

### Step 3.a : Run Dockerfile as dev

```bash
docker-compose -f .\docker-compose-dev.yml up -d --build
```

> This will run the docker container in dev, meaning any changes you do will be visible instantaneously

#### OR

### Step 3.b : Run Dockerfile as prod

```bash
docker-compose -f .\docker-compose-dev.yml up -d --build
```

> This will run the docker container in prod, meaning any changes you do will be NOT be visible instantaneously, and you have to rebuild




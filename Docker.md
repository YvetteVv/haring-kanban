# Docker

### Build

``` sh
git clean -xfd
docker build -t hiring-kanban-frontend .
```

### Run

(Example)

#### Script

``` sh
docker run -d --restart always --name hiring-kanban-frontend -v ./runtime/:/usr/src/app/runtime/ -p 8006:8006 hiring-kanban-frontend
```

#### Compose

``` yaml
version: "3.3"
services:
  hiring-kanban-frontend:
    restart: always
    container_name: hiring-kanban-frontend
    ports:
      - "8080:8080"
    image: hiring-kanban-frontend
```

``` sh
docker-compose up -d
```


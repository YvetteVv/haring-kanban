# Docker

### Build

``` sh
git clean -xfd
docker build -t haring-kanban .
```

### Run

(Example)

#### Script

``` sh
docker run -d --restart always --name haring-kanban -p 8080:8080 haring-kanban
```

#### Compose

``` yaml
version: "3.3"
services:
  haring-kanban:
    restart: always
    container_name: haring-kanban
    ports:
      - "8080:8080"
    image: haring-kanban
```

``` sh
docker-compose up -d
```


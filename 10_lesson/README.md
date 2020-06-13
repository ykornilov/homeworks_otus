# Домашнее задание занятия Деплой приложения

## Запуск

Запуск сервера:
```
npm start
```
Сервер доступен по url: `http://localhost:3000`

## Сборка и запуск докер-контейнера

```
docker build -t <your username>/node-web-app .
docker images
docker run -p 3000:3000 -d <your username>/node-web-app
docker ps
docker logs <container_id>
docker exec -it <container id> /bin/bash
```


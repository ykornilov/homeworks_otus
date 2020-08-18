# Домашнее задание занятия Деплой GraphQL-приложения

## Запуск приложения локально

Запуск сервера локально:
```
npm install
npm run dev
```
Сервер доступен по url: `http://localhost:4000`

Сервер будет подключаться к базе данных, указанной в переменной окружения DATABASE_URL
Для запуска GraphQL-плэйграунда необходимо, чтобы переменная окружения NODE_ENV имела значение development

## Миграция базы данных

Для миграции необходимо создать файл с переменными окружения .env, примерно следующего вида
```
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=postgres
DB_USERNAME=postgres
DB_PASSWORD=admin
```

Запуск миграции:
```
npm run migrate
```

Отмена миграции:
```
npm run migrate:undo
```

## Релиз на Heroku

```
https://radiant-tor-17489.herokuapp.com/
```

# Домашнее задание занятия Express с Typescript

## Запуск
Предполагается работающий сервис mongod на адресе localhost:27017

В MongoDB должна отсутствовать база данных my_courses

Добавление базы данных с первоначальным состоянием:
```
npm run migrate
```
Запуск сервера в режиме разработки:
```
npm run dev
```
Запуск сервера в основном режиме:
```
npm run build
npm start
```
Сервер доступен по url: `https://localhost:3000`

## Авторизация

1. Пользователь 1:
- login: `user1`
- password: `pass1`

2. Пользователь 2:
- login: `user2`
- password: `pass2`
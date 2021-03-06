# Backend for library Nest.Js/TypeScript 
# API documentation: 
## Users

#### GET `/users` **Получить всех пользователей** </br>
Возвращает всех пользователей. Ответ вида:
```json
[
  {
    "id": "1",
    "name": "Иван Иванович Иванов"
    "isHasSubscription": "true"
  },
  {
    "id": "1",
    "name": "Сергей Сергеевич Сергеев"
    "isHasSubscription": "false"
  }
]
```
____
#### GET `/users:id` **Получить информацию о пользователе** </br>
Возвращает информацию об одном пользователе со списком книг на руках. Ответ вида:
```json
[
  {
    "id": "1",
    "name": "Иван Иванович Иванов"
    "isHasSubscription": "true",
    "Books": [
      {
        "id": "1",
        "name": "Война и мир",
        "author": "Толстой Л.Н."
      }
    ]
  }
]
```
____
#### Post `/users` **Добавление опльзователя** </br>
+ **Входные данные:** принимает информацию о пользователе (в данном простом случае имя):
```json
{
  "name": "Иванов Иван Иванович"
}
```
+ **Возвращаемое значение:** возвращает объект типа `User` с данными нового пользователя:
```json
{
  "id": 1,
  "name": "Иванов Иван Иванович",
  "isHasSubscription": false,
  "books": []
}
```
____
#### Delete `/users:id` **Удаление пользователя** </br>
Принимает параметром `id` пользователя, которого хотим удалить.</br>
Возвращает сатус-код запроса: 
+ В случае **успеха**: `200` 
+ В случае **ошибки с удалением из БД**: `500`
+ В случае, **если такого пользователя нет**: `400`
____
#### Put `/users:id` **Выдача абонемента пользователю** (обновляет поле `isHasSubscription` в БД) </br>
Принимает параметром `id` пользователя, которому хотим выдать абонемент.</br>
Возвращает сатус-код запроса: 
+ В случае **успеха**: `200` 
+ В случае **ошибки с обновлением БД**: `500`
+ В случае, **если у пользователя уже есть абонемент**: `400`
____
#### Post `/users:id` **Обновление данных пользователя** </br>
Принимает параметром `id` пользователя, чьи данные хотим обновить.</br>
Возвращает сатус-код запроса: 
+ В случае **успеха**: `200` 
+ В случае **ошибки с обновлением БД**: `500`
____

</br>
</br>

## Books

#### Post `/books` **Добавление книги** 
+ **Входные данные:** принимает информацию о книге (в данном простом случае название и автор):
```json
{
  "name": "Война и мир",
  "author": "Толстой Л.Н."
}
```
+ **Возвращаемое значение:** возвращает объект типа `Book` с данными новой книги:
```json
{
  "id": "1",
  "name": "Война и мир",
  "author": "Толстой Л.Н.",
}
```
*в поле `user` хранится пользователь тиа `User`, у которого сейчас на руках книга*
____

</br>
</br>

## Методы получения возврата книги

#### Post `/takeBook` **Пользователь берет книгу** </br>
**Входные данные:** принимает идентификаторы пользователя и книги:
```json
{
  "user_id": "1",
  "book_id": "2"
}
```
**Возвращает сатус-код** запроса: 
+ В случае **успеха**: `200` 
+ В случае **ошибки с обновлением БД**: `500`
+ В случаях, если: **у пользователя нет абонемента**, **у пользователя на руках 5 книг** или **книга сейчас находится у другого пользователя**: `400`
____

#### Post `/returnBook`
**Пользователь возвращает книгу** </br>
**Входные данные:** принимает идентификаторы пользователя и книги:
```json
{
  "user_id": "1",
  "book_id": "2"
}
```
**Возвращает сатус-код** запроса: 
+ В случае **успеха**: `200` 
+ В случае **ошибки с обновлением БД**: `500`
+ В случаях, если **у пользователя нет такой книги**: `400`


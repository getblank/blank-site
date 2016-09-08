+++
date = "2016-09-08T13:06:55+05:00"
title = "Email"
url = "/doc/email/"
[menu.doc]
    parent = "serverjs"
    weight = 140
    url = "/doc/email/"
+++

Модуль `email` предназначен для работы с электронной почтой.

### Подключение

```JavaScript
let email = require("email");
```

### send()

Метод `email.send()` отправляет электронные письма. Под капотом используется [Nodemailer](https://nodemailer.com/).
Параметры подключения к SMTP серверу берутся из Store `emailSettings`.

#### Синтаксис

```JavaScript
email.send(message[, callback])
```

#### Параметры

**message**

Отправляемое сообщение (JavaScript Object).

Формат сообщения:

```JavaScript
{
    from: "\"Fred Foo �\" <foo@blurdybloop.com>", // адрес отправителя. В случае, если аргумент отсутствует, будет использоваться адрес из Store "emailSettings"
    to: "bar@blurdybloop.com, baz@blurdybloop.com", // адреса получателей
    subject: "Hello ✔" // Тема письма
    body: "", // Текст письма
    attachments: [] // Формат вложений описан здесь – https://github.com/nodemailer/nodemailer#attachments
}
```

**callback**

Функция, которая будет выполнена по завершению отправки (опционально).

#### Возвращаемые значения

`null` в случае переданной функции `callback` или `Promise`, если функция не передавалась.
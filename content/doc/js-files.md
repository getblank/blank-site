+++
date = "2016-09-08T13:07:20+05:00"
title = "Files"
[menu.doc]
    parent = "serverjs"
    weight = 160
+++

Модуль `files` предназначен для работы со встроенным файловым хранилищем.

### Подключение {#use}

```JavaScript
let files = require("files");
```

### get()

Метод `files.get()` возвращает файл из хранилища.

#### Синтаксис

```JavaScript
files.get(storeName, _id[, callback]);
```

#### Параметры

**storeName**

Store в которой хранится файл.

**_id**

Идентификатор файла в Store.

**callback**

Функция, которая будет выполнена по завершению отправки (опционально).

#### Возвращаемые значения

`null` в случае переданной функции `callback` или `Promise`, если функция не передавалась.
Результатом будет содержимое файла в формате [Node Buffer](https://nodejs.org/api/buffer.html)
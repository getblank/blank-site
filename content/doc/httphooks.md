+++
date = "2016-08-06T20:10:23+05:00"
title = "HTTP hooks"
[menu.doc]
    parent = "schema"
    weight = 50
+++

HTTPHooks используются для формирования произвольного HTTP API. В hooks нет встроенной авторизации,
они доступны публично. Если требуется настроить HTTP API с авторизацией, можно реализовать её самостоятельно
или использовать Actions с типом http.

Базовое REST HTTP API для CRUD генерируется автоматически и включается другим параметром: [httpApi](/doc/store_reference/#http-api)

## Структура {#structure}
~~~javascript
httpHooks: HTTPHook[]

HTTPHook {
    "uri": "string"
    "method": "GET" | "PUT" | "POST" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS",
    "script": function ($request):Response
}

Response {
    "type": "JSON" | "HTML" | "XML" | "file" | "redirect",
    "data": "string", // Строка, которая будет передана в Body ответа, либо адрес для редиректа для type:redirect
    "rawData": any,
    "code": int, // HTTP status code. По-умолчанию, 200
    "header": {},
    "fileName": "string", // Только для type:file
}
~~~

## Свойства

### method
HTTP методу, с которым будет доступен hook (строка). Допустимые варианты:
*   `GET`;
*   `PUT`;
*   `POST`;
*   `PATCH`;
*   `DELETE`;
*   `HEAD`;
*   `OPTIONS`.

### script
Непосредственно JavaScript код. На вход получает переменную [$request](/doc/request/).
Должен вернуть объект типа [Response](/doc/httphooks/#response).

### uri
Полный путь будет сформирован таким образом:
~~~javascript
http[s]://server-address/hooks/storeName/uri
~~~
В `uri` можно использовать параметры, они начинаются с символа `:`, например:
```
"uri": "/like/:photoId"
```
Значения параметров будут доступны через свойство `params` объекта `$request`, переданного аргументом
в скрипт hook-а.

Подробнее об объекте `$request` читайте в разделе [Serverside JS API: $request](/doc/request/).

## Response
Объект описывающий формат возврата данных из хука.

## Свойства
### code
HTTP status code (int). По-умолчанию, 200.

### data
Тело ответа (строка). Будет передана в Body HTTP ответа сервера. В случае необходимости произвести перенаправление к другому ресурсу,
в `data` следует положить URL ресурса.

### fileName
Имя возвращаемого файла (строка). Указывается при `type:file`.

### header
HTTP заголовки ответа (JavaScript object).

### _id
Идентификатор файла (строка). Используется при [type:file](/doc/httphooks/#type).

### rawData
&laquo;Сырые&raquo; (не сериализованные данные) виде (например, объект или массив).

### store
Хранилище файла (строка). Используется при [type:file](/doc/httphooks/#type).

### type
Тип HTTP ответа (строка). Допустимые варианты:

*   `JSON`&nbsp;&mdash; возврат данных в виде JSON. Устанавливается соответствующий HTTP заголовок `Content-Type: application/json`.
Данные следует передавать либо в сериализованном виде в свойстве [data](/doc/httphooks/#data) (рекомендованный способ),
либо в &laquo;сыром&raquo; виде (например, объект или массив) в свойстве [rawData](/doc/httphooks/#rawdata).
В последнем случае, данные будут сериализованы автоматически.

*   `HTML`&nbsp;&mdash; возврат данных в виде HTML. Устанавливается соответствующий HTTP заголовок `Content-Type: text/html`.
Данные следует передавать в свойстве [data](/doc/httphooks/#data).

*   `XML`&nbsp;&mdash; возврат данных в виде HTML. Устанавливается соответствующий HTTP заголовок `Content-Type: text/xml`.
Данные следует передавать в сериализованном виде в свойстве [data](/doc/httphooks/#data).

*   `file`&nbsp;&mdash; возврат файлов. HTTP заголовок `Content-Type` устанавливается автоматически в зависимости от типа файла, определяемого по имени.
Данные следует передавать закодированным в base64 буфером ([Node Buffer](https://nodejs.org/api/buffer.html)) в свойстве [data](/doc/httphooks/#data).
При необходимости возврата файла из файлового хранилища, следует передать название Store в свойстве [store](/doc/httphooks/#store)
и идентификатор файла в свойстве [_id](/doc/httphooks/#id).

*   `redirect`&nbsp;&mdash; перенаправление на другой ресурс. URL ресурса следует передавать в свойстве [data](/doc/httphooks/#data).
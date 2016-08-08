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

### Структура
~~~javascript
"httpHooks": [HTTPHook {
    "uri": "string"
    "method": "GET", "PUT", "POST", "PATCH", "DELETE", "HEAD", "OPTIONS",
    "script": function ($request):Response {}
}]

Response {
    "type": "JSON", "HTML", "XML", "file",
    "data": "string",
    "rawData": any,
    "code": int, //HTTP status code
    "header": {},
    "fileName": "string", // Только для type:file
}
~~~

### Uri
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

Подробнее об объекте `$request` читайте в разделе [Serverside JS API: $request](/doc/request/)
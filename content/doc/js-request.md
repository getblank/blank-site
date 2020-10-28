+++
date = "2016-09-08T13:13:20+05:00"
title = "$request"
url = "/site/doc/request/"
[menu.doc]
    parent = "serverjs"
    weight = 110
    url = "/site/doc/request/"
+++

Объект `$request` передается обработчикам `HTTP Hooks`, `Actions` и `StoreActions` с типом `http`, либо доступным через [REST API](/site/doc/httprest/).

### Параметры


#### body

Содержимое HTTP запроса.


#### form

Содержимое отправленной формы в виде JavaScript Object.


#### header

Содержимое HTTP заголовка в виде JavaScript Object.

#### ip

IP адрес инициатора HTTP запроса.


#### params

Содержит данные параметров, определённых в свойстве `uri` `HTTP Hooks`. Пример записи `uri`:

```JavaScript
{
    uri: "user/:id"
}
```

Таким образом, идентификатор пользователя (параметр `:id`) будет доступен через:

```JavaScript
$request.params["id"];
```


#### query

Содержит параметры запроса из URL в виде JavaScript Object.

Например, для запроса `http://some.domain/?foo=bar&bar=baz`, `query` будет содержать следующий объект:

```JavaScript
{
    foo: ["bar"],
    bar: ["baz"]
}
```

#### referer

Содержит значение HTTP заголовка `Referer`

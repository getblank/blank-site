+++
date = "2016-09-08T17:16:00+05:00"
title = "Actions"
url = "doc/actions/"
[menu.doc]
    parent = "serverjs"
    weight = 5
    url = "doc/actions/"
+++

Actions&nbsp;&mdash; скрипты на JavaScript, производящие некоторые действия над объектами, хранящимися в Store.
Действия доступны через Websocket API и REST API. Формат описания Actions подробно рассмотрен в [Store Reference](/site/doc/store_reference/#actions).
Выполнять Actions могут только авторизованные пользователи.

Скрипты имееют возможность выполнять запросы к базе данных с помощью модуля [$db](/site/doc/db/).

### Доступные объекты

#### $item

Объект над которым выполняется Action. Для [StoreActions](/site/doc/store_reference/#storeactions) `$item` не передаётся.

#### $user

Пользователь, выполняющий Action.

#### $data

Данные формы, заполненной пользователем, в случае, если определены `props` для Action.

#### $filter

Только для [StoreActions](/site/doc/store_reference/#storeactions). При вызове из веб-приложения содержит текущие значения фильтров.

#### $request

Данные HTTP запроса, в случае, если Action.type установлен в `http`, либо если Action вызывается через [REST API](/site/doc/httprest/).
Подробнее об объекте `$request` читайте в разделе [Serverside JS API: $request](/site/doc/request/)

### Возврат результата

В случае, если скрипт возвращает какие-либо данные, они будут переданы инициатору вызова Action.
Если скрипт выполнился неудачно, следует &laquo;бросить ошибку&raquo;. Для передачи текста ошибки,
используется объект `UserError`.

```JavaScript
throw new Error("some error"); // текст ошибки будет выведен в логе, но не передан инициатору.
throw new UserError("some error with text"); // текст ошибки будет выведен в логе, и передан инициатору.
```

Если скрипт выполняет асинхронные инструкции, следует вернуть `Promise`.

Для HTTP Actions возвращаемый объект должен соответствовать структуре `Response` описанной в  [HTTP Hooks](/site/doc/httphooks/#structure).
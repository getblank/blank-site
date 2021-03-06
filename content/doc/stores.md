+++
date = "2016-08-04T22:25:53+05:00"
title = "Stores"
[menu.doc]
    parent = "schema"
    weight = 20
+++

Вся функциональность разрабатываемого с Blank Schema приложения строится вокруг одного понятия — «хранилище» или «Store».
В большинстве случаев, при проектировании приложений, достаточно создать отдельный Store для каждой сущности модели данных.
Например, для простейшего приложения учёта клиентов и их заказов можно создать два Store – `Clients` и `Orders`. Store
можно воспринимать как таблицы в MySQL или коллекции в MongoDB. В Store можно добавить обработчики жизненного цикла объектов – аналог
триггеров в SQL. Можно описать заранее определённые &laquo;действия&raquo; с данными. В SQL это были бы хранимые процедуры. Но всё-таки Store
в Blank Schema являются чем-то большим, чем таблицы в базах данных. Кроме триггеров и предопределённых действий, в Store есть:

* HTTP REST API для CRUD, включается одним параметром;
* HTTP Hooks: в дополнение к стандартному CRUD REST API, можно создать описать обработчики HTTP запросов на JavaScript;
* Tasks: задачи, выполняемые по расписанию;
* Widgets: инструменты для отображения статистики;
* Filters: набор заранее заданных поисковых критериев, которые будут доступны пользователю в интерфейсе и через API;
* I18N: специфичные для этой Store локализации;
* Настройки отображения в интерфейсе пользователя;
* Настройки прав доступа.

## Пример описания Store

Формат конфигурации, которые передается серверу Blank – JSON. Но так как мы используем сборщик конфигурации на
Node JS, для удобства и большей гибкости в распределении кода, описания Store выполняются в виде JavaScript объекта,
экспортируемого модулем.
```javascript
module.exports = {
    "exampleStore": {
        "display": "list",
        "navOrder": 0,
        "label": "{{$i18n.storeLabel}}",
        "labels": [],
        "props": {
            "exampleProp": {
                "type": "string",
                "display": "textInput",
            },
        },
        "actions": [],
        "objectLifeCycle": {},
        "storeLifeCycle": {},
        "filters": {},
        "httpHooks": [],
        "tasks": [],
        "i18n": {
            "storeLabel": "exampleStore",
        },
    },
};
```
В JSON нет возможности писать функции, но JavaScript объекты позволяют это делать, а сборщик преобразует эти функции
в строку, затем на сервере из этих строк вновь будут созданы соответствующие функции.

Например, можно написать функцию для обработки действия пользователя:
```javascript
"actions": [
    {
        "_id": "switchOnOff",
        "label": "{{#if $item.disabled}}Включить{{else}}Выключить{{/if}}",
        "script": function ($db, $item) {
            return $db.set({ "_id": $item._id, disabled: !$item.disabled }, "accounts");
        },
    },
],
```
Подробнее о действиях читайте в разделе [Actions](/site/doc/actions).

## Особенности работы со сборщиком
При использовании сборщика можно разделить конфигурацию на отдельные файлы для каждой Store. Если описание Store становится слишком
большим, его также можно разделить на отдельные файлы, создав, например, отдельную директорию для Store:
```
▾ accounts/
  accountsStore.js
  _actions.js
```
Обратите внимание на '_' в начале названия файла **'\_actions.js'** – это директива для сборщика, указывающая, что в этом файле
нет описания отдельной Store.

Для использования _actions теперь нужно подключиться их через require в описании Store:
```javascript
"actions": require("./_actions");
```

## Дальнейшее чтение
Более подробную информацию о настройках Store читайте в разделе [Store reference](/site/doc/store_reference/)
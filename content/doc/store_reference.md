+++
date = "2016-08-06T14:27:42+05:00"
title = "Store reference"
[menu.doc]
    parent = "schema"
    weight = 30
+++
### Access
~~~javascript
"access": [AccessRule {}]
~~~
Устанавливает права доступа на объекты Store. Доступный набор разрешений: **crud**.

Для того, чтобы пользователь получил доступ к описанию Store и она отобразилась в интерфейсе сгенерированного
веб-приложения, необходимо разрешение на чтение – **r**.

Если параметр не определён, доступ есть у всех пользователей, как если бы было указано:
~~~javascript
    "access": ["role": "all", "permissions": "crud"]
~~~
Если параметр указан, доступ есть только у тех групп пользователей, которым выданы разрешения.

Пример:
~~~javascript
    "access": [
            { "role": "devops", "permissions": "cru" },
            { "role": "supervisor", "permissions": "r" },
        ]
~~~

Подробнее о настройках доступа в Blank в разделе [Access control](/doc/access/)

### Actions
~~~javascript
"actions": [Action {}]
~~~
Описывает возможные действия над объектами, хранящимися в Store. Действия доступны через Websocket API.

Пример action для лайка фотографии:
~~~javascript
"actions": [
    {
        "_id": "like",
        "icon": "fa fa-heart",
        "disabled": "($item.likes || []).indexOf($user._id) >= 0",
        "script": function ($db, $item, $user) {
            let likes = $item.likes || [];
            likes.push($user._id);
            return $db.set({ "_id": $item._id, "likes": likes }, "photos");
        },
    },
],
~~~

### BaseStore
~~~javascript
"baseStore": "storeName"
~~~
Базовый Store. Если указан этот параметр, текущий Store будет работать с конфигурацией и объектами данных базового.
Это требуется, если нужно отобразить одни и те же данные для одного пользователя в разных видах и разделах навигации
в веб-приложении. Например, используется для того, чтобы у администратора был и свой профиль, и одновременно возможность
просматривать список профилей других пользователей.

Все настройки Store с указанным baseStore переопредлеяют настройки базового Store, но не влияют на него.

### Config
~~~javascript
"config": WorkspaceStoreDesc {}
~~~
Переопредление конфигурации приложения для Store с типом workspace.

### Display
~~~javascript
"display": "list", "single", "table", "cards", "dashboard"
~~~
Тип отображения Store в интерфейсе веб-приложения.

Если вы не используете автогенерируемое приложение, обратите внимание на **single**, при использовании этого типа
отображения будут изменения в работе через API.

#### list
Список с панелью просмотра выбранного элемента, так называемый master-detail view. Подходит в большинстве случаев.
Список в веб-приложении виртуализирован, так что прекрасно работает со сколь угодно большими коллекциями.

#### single
Позволяет сделать аналог **"type": "single"**, но с отдельными данными для каждого пользователя. Например, требуется
дать пользователю возможность настройки получения уведомлений – тут прекрасно подойдёт данный тип отображения Store.

Обратите внимание! При использовании этого типа отображения в работе с API следует передавать название Store в качестве
идентификатора объекта, и нужно указать соответствующие права пользователей, для которых установлен данный тип
отображения, например:
~~~javascript
"access": [
    { "role": "operator", "permissions": "r", "condition": { "_ownerId": { "$expression": "$user._id" } } },
],
~~~
Если не указать права, разрешающие пользователям доступ только к одному объекту, при получении и сохранении данных сервер
будет работать со случайным объектом, что приведёт к ошибкам.
Если все настроить правильно, то при сохранении данных через API не придется сначала искать идентификатор объекта,
принадлежащего этому пользователю – сервер Blank сделает это самостоятельно.

При использовании (Workspaces)[/doc/workspaces] можно настроить Store так, чтобы часть пользователей работала с ним как single,
а, например, администраторы - как с обычным списком. Это даст возможность администраторам просматривать и редактировать
данные других пользователей.

#### table
Табличный тип отображения. Подходит для отображения Store с историей каких-либо событий.
При использовании не забудьте настроить [TableColumns](/doc/store_reference/#tablecolumns)

#### cards
Большие карточки объектов. Используйте для Store с предполагаемым количеством объектов не более 10.

#### html
Если отображение не предполагает интерактивных элементов и требуется просто отобразить данные или статическую
страницу, можно включить тип отображения html. При использовании не забудьте написать шаблон
[Html](/doc/store_reference/#html) для отрисовки страницы.

#### dashboard
Описание отсутствует. Тип отображения еще дорабатывается, напишите нам, если хотите принять участие в тестировании.

### Entries [type:map]
~~~javascript
    "entries": {}
~~~
Данные для Store с типом **map**.

Пример использования:
~~~javascript
"_commonSettings": {
    "type": "map",
    "entries": {
        "title": "My App",
        "locales": ["ru"],
        "defaultLocale": "ru",
        "signInLogo": "/logo.svg",
        ...
    },
}
~~~

### Filters
~~~javascript
    "filters": [Filter {}]
~~~
Массив заранее определенных запросов к БД, которые будут доступны в веб-приложении и при выполнении метода Find через API.
Подробнее читайте в разделе [Filters](/doc/filters/)

### FormGroupsOrder
~~~javascript
    "formGroupsOrder": ["formGroupName"]
~~~
Массив, указывающий порядок расположения групп на форме редактирования объекта. Названия групп должны совпадать с указанными
группами в настройках props, например:
~~~javascript
    "formGroupsOrder": ["{{$i18n.group2Label}}", "Group 1"],
    "props": {
        "prop1" {
            ...
            "formGroup": "Group 1",
            ...
        },
        "prop2" {
            ...
            "formGroup": "{{$i18n.group2Label}}",
            ...
        },
    },
    "i18n": {
        "group2Label": "Group 2",
    }
~~~

### FormTabs
~~~javascript
    "formTabs": ["tabId" | {"_id": "string", "label": "Handlebars template", "hidden": "JavaScript expression"}]
~~~
Определяет порядок и отображение табов в карточках объектов в веб-приложении.

### HeaderProperty
~~~javascript
"headerProperty": "propName"
~~~
Определяет свойство для использования в заголовке карточек объектов Store в веб-приложении.

Значение по-умолчанию: **name**.

Пример:
~~~javascript
"headerProperty": "orderNumber",
~~~

### HeaderTemplate
~~~javascript
"headerTemplate": "Handlebars template"
~~~
Определяет текст заголовка карточек объектов Store в веб-приложении.

Если параметр указан, значение headerProperty игнорируется и заголовок становится не редактируемым.

Пример:
~~~javascript
"headerTemplate": "{{$item.lastName}} {{$item.name}}"
~~~

### HTML [display:html]
~~~javascript
"html": "Handlebars-enabled template"
~~~
Шаблон на [Handlebars](http://handlebarsjs.com/) со следующей моделью данных:
~~~javascript
{
    "$items": [] // Массив объектов Store
    "$user": {} // Объект пользователя, просматривающего Store
}
~~~

### HTTP API
~~~javascript
"httpApi": bool
~~~
Флаг формирования HTTP REST API для сторы.
Значение по-умолчанию: false.

### HTTPHooks
~~~javascript
"httpHooks": [HTTPHook {}]
~~~
Массив описаний методов Store, доступных через HTTP API.
Подробнее читайте в разделе [HTTPHooks](/doc/httphooks/)

### I18n
~~~javascript
"i18n": {}
~~~
Объект, содержащий специфичные для данной Store локализации.

Если локализации записаны прямо в корень объекта i18n, они будут относится к локали, установленное по-умолчанию
для приложения. Для записи в други локали нужно создать вложенные объекты, ключами для которых будут названия локалей:
~~~javascript
"i18n": {
    "storeLabel": "Название Store",
    "en": {
        "storeLabel": "Store name",
    }
}
~~~

Обратится к записям в i18n можно через объект **$i18n** в шаблонах, или через модуль **i18n**
в скриптах на JavaScript.

#### Работа с i18n из шаблонов
При доступе к i18n из шаблонов текущей Store, все локализации будут доступны напрямую:
~~~javascript
"label": "{{$i18n.storeLabel}}"
~~~
Для доступа к локализациям из других Store используется объект $stores:
~~~javascript
"label": "{{$i18n.$stores.otherStoreName.storeLabel}}"
~~~
Для доступа к общим локализациям из **_commonSettings** используется объект $settings:
~~~javascript
"label": "{{$i18n.$settings.phraseName}}"
~~~
Все обращения будут работать с текущей установленной локалью пользователя или локалью по-умолчанию.

### Indexes
~~~JSON
"indexes": []
~~~
Описание индексов хранилища.
Содержит массив аргументов для команды `createIndex` в MongoDB. Каждый элемент может быть либо строковым названием индексируемого поля:
~~~JSON
"indexes": [
    "lastName"
]
~~~

либо описание индекса в виде объекта:
~~~JSON
"indexes": [
    {"name": 1}
]
~~~

либо массивом из двух объектов, где первый объект&nbsp;&mdash; это описание индекса, а второй&nbsp;&mdash; дополнительные параметры:
~~~JSON
"indexes": [
    [{"login": 1}, {"unique": true}]
]
~~~

Конечно, можно сочетать все варианты описания индекса:
~~~JSON
"indexes": [
    "lastName",
    {"name": 1},
    [{"login": 1}, {"unique": true}]
]
~~~

При старте приложения, каждый элемент будет передан в команду `createIndex`.

Подробнее об индексах в MongoDB можно почитать здесь: [Indexes](https://docs.mongodb.com/manual/indexes/).

### Label
~~~javascript
"label": "Handlebars template"
~~~
Название Store, будет использоваться в навигации сгенерированного веб-приложения.

Пример:
~~~javascript
"label": "{{$i18n.storeLabel}}"
~~~

### Labels
~~~javascript
"labels": [Label {
    "icon": "className" //"fa fa-icon_name" или "material-icons text md-16 icon_name"
    "text": "Handlebars template", //Data model: { $item: {}, $user: {} }
    "color": "Handlebars template", //Data model: { $item: {}, $user: {} }
    "hidden": "JavaScript expression", //Variables: $item, $user
    "hideInForm": bool // Скрывает лэйбл в форме редактирования объекта
    "showInList": int // Определяет, на какой строке показывать лэйбл в элементе списка. Если 0 – не отображать
}]
~~~
Массив аннотаций к объектам. Используется для добавления summary объектов в списке и на форме редактирования в
сгенерированном веб-приложении.

Пример:
```javascript
"labels": [
    {
        "icon": "fa fa-power-off",
        "color": "{{#if $item.disabled}}#ddd{{else}}#43A047{{/if}}",
        "hideInForm": true,
        "showInList": 1,
    },
]
```

### NavGroup
~~~javascript
"navGroup": "string",
~~~
Определяет расположения в навигации веб-приложения. Если группа не задана, ссылка на эти объекты будет выведена в первом уровне навигации

### NavOrder
~~~javascript
"navOrder": int,
~~~
Порядок размещения в навигации веб-приложения

### NavLabel
~~~javascript
"navLabel": "Handlebars template",
~~~
Название Store в навигации веб-приложения. Требуется, если нужно оставить опеределенный label в заголовке открытой в приложении
Store, но в навигации она должна называться по-другому.

### ObjectLifeCycle
~~~javascript
"objectLifeCycle": {
    "eventName": function () {}
},
~~~
Обработчики событий жизненного цикла объектов в Store на JavaScript.

Подробнее читайте в разделе [ObjectLifeCycle](/doc/lifecycle_events/#objectlifecycle)

### OrderBy
~~~javascript
"orderBy": "propName",
~~~
Поле для сортировки данных по-умолчанию при запросах Find.
Для сортировки в обратном порядке добавьте '-' перед названием поля:
~~~javascript
"orderBy": "-propName",
~~~

### Props
~~~javascript
"props": {
    "propName": PropDesc {},
}
~~~
Структура данных для Store. Props – наиболее сложная и важная часть описания Store.

Простой пример объекта props:
~~~javascript
"props": {
    "name": {
        "type": "string",
        "display": "textInput",
        "label": "ФИО",
        "formOrder": 0,
        "required": true,
    },
    "phone": {
        "type": "string",
        "display": "masked",
        "label": "Телефон",
        "mask": "+7 (|||) |||-||-||",
        "formOrder": 10,
        "required": "$item.name",
    },
}
~~~

Подробнее читайте в разделе [Props reference](/doc/props_reference/)

### States
~~~javascript
    "states": {
        "stateName": StateDesc {"label": "Handlebars template", "navOrder": int}
    }
~~~
Параметр для тех Store, объекты которых могут находится в детерминированном наборе состояний, переходя от одного
состояния к другому. Подходит для различных процессов: документооборота, заказов, кампаний.
Если параметр задан, у объектов появится специальное свойство **_state** и в веб-приложении будет отрисована
дополнительная навигация по состояниям объектов.

### StoreActions
~~~javascript
    "storeActions": [Action {}]
~~~
Действия, которые относятся ко всему Store, а не к его отдельным объектам. Также, как и Actions, доступны через Websocket API.

При вызове из веб-приложения в аргументы скрипта передаются текущие значения фильтров.

### StoreLifeCycle
~~~javascript
"storeLifeCycle": {
    "eventName": function
},
~~~
Обработчики событий жизненного цикла объектов в Store на JavaScript.

Подробнее читайте в разделе [StoreLifeCycle](/doc/lifecycle_events/#storelifecycle)

### TableColumns
~~~javascript
"tableColumns": ["propName" | ColumnDesc { "prop": "propName", "display": "propDisplayType"}]
~~~
Определяет набор, порядок и тип отображения столбцов таблицы для display:html.

### Tasks
~~~javascript
"tasks": [Task {"schedule": "CRON-formatted string", "script": function }]
~~~
Задачи, требующие периодического запуска.

Подробнее читайте в разделе [Tasks](/doc/tasks/)

### Type
~~~javascript
    "type": "direcory", "single", "map"
~~~

#### directory
Тип Store по-умолчанию. Предназначен для хранения коллекции данных.
#### single
В отличие от Directory, хранит единственный документ. Используется для хранения каких-либо настроек приложения.
#### map
Используется только для системных Store, в которых хранятся настройки самого приложения на Blank. Создавать новые
Store с таким типом не имеет смысла, но при разработке, возможно, потребуется изменять настройки существующих Store с таким
типом, таких как:

- _commonSettings
- _nav

Store с типом map не хранят данные в БД, вся информация записывается в поле **entries** описания Store.

#### workspace
Тип для частичного переопределения конфигурации. Если у пользователя указано свойство **workspace** с соответствующим
значением, для него будет сформирована специальная конфигурация, объеденённая из базовой и конфигурации из свойства **config**
workspace-а.
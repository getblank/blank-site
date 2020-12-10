+++
date = "2016-09-07T13:10:48+05:00"
title = "Serverside JS API"
menuTitle = "Описание"
url = "doc/serverjs/"
[menu.doc]
    parent = "serverjs"
    identifier = "serverjs-description"
    weight = -10
    name = "Описание"
    url = "doc/serverjs/"
+++

Серверная часть платформы имеет несколько точек для выполнения собственного произвольного кода:

*   [Обработчики событий](/site/doc/lifecycle_events/), происходящих с объектами в Store;
*   Загрузчики [виртуальных полей](/site/doc/props_reference/#virtual);
*   [Действия над объектами](/site/doc/store_reference/#actions), хранящимися в Store;
*   [Действия](/site/doc/store_reference/#storeactions), которые относятся ко всему Store;
*   [Обработчики события](/site/doc/lifecycle_events/#storelifecycle), жизненного цикла Store;
*   [Обработчики HTTP запросов](/site/doc/httphooks/);
*   [Задачи, требующие периодического запуска](/site/doc/tasks/).

Во всех обработчиках доступна функция `require()`, позволяющая запускать встроенные в node.js и платформу JavaScript модули.
Так же допускается запуск собственных **CommonJS** модулей, расположенных в директории `/lib` проекта.

### Встроенные модули:

*   [$db](/site/doc/db/)&nbsp;&mdash; работа с базой данных;
*   [email](/site/doc/email/)&nbsp;&mdash; работа с электронной почтой;
*   [fetch](https://github.com/bitinn/node-fetch) [*](/site/doc/serverjs/#embeddedmodules)&nbsp;&mdash; работа с http запросами;
*   [files](/site/doc/files/)&nbsp;&mdash; работа со встроенным файловым хранилищем;
*   [fs](/site/doc/fs/)&nbsp;&mdash; работа с файловой системой;
*   [handlebars](http://handlebarsjs.com/) [*](/site/doc/serverjs/#embeddedmodules)&nbsp;&mdash; шаблонизатор;
*   [i18n](/site/doc/i18n/)&nbsp;&mdash; интернационализация;
*   [moment](http://momentjs.com/) [*](/site/doc/serverjs/#embeddedmodules)&nbsp;&mdash; работа с датами;
*   [queue](/site/doc/queue/)&nbsp;&mdash; работа с очередями и списками;
*   [sift](https://github.com/crcn/sift.js) [*](/site/doc/serverjs/#embeddedmodules)&nbsp;&mdash;
запросы к данным в формате [MongoDB Query](https://docs.mongodb.com/manual/tutorial/query-documents/);

<a name="embeddedmodules"></a>
Модули, помеченные знаком `*`, разработаны сторонними разработчиками, но входят в поставку Blank.
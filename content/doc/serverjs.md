+++
date = "2016-09-07T13:10:48+05:00"
title = "Serverside JS API"
menuTitle = "Описание"
[menu.doc]
    parent = "serverjs"
    identifier = "serverjs-description"
    weight = -10
    name = "Описание"
+++

Серверная часть платформы имеет несколько точек для выполнения собственного произвольного кода:

*   [Обработчики событий](/doc/lifecycle_events/), происходящих с объектами в Store;
*   Загрузчики [виртуальных полей](/doc/props_reference/#virtual);
*   [Действия над объектами](/doc/store_reference/#actions), хранящимися в Store;
*   [Действия](/doc/store_reference/#storeactions), которые относятся ко всему Store;
*   [Обработчики события](/doc/lifecycle_events/#storelifecycle), жизненного цикла Store;
*   [Обработчики HTTP запросов](/doc/httphooks/);
*   [Задачи, требующие периодического запуска](/doc/tasks/).

Во всех обработчиках доступна функция `require()`, позволяющая запускать встроенные в node.js и платформу JavaScript модули.
Так же допускается запуск собственных **CommonJS** модулей, расположенных в директории `/lib` проекта.

### Встроенные модули:

*   [$db](/doc/db/);
*   [async](http://caolan.github.io/async/) [*](/doc/serverjs/#embeddedmodules);
*   clickhouse;
*   email;
*   [fetch](https://github.com/bitinn/node-fetch) [*](/doc/serverjs/#embeddedmodules);
*   files;
*   fs;
*   [handlebars](http://handlebarsjs.com/) [*](/doc/serverjs/#embeddedmodules);
*   hash;
*   i18n;
*   [moment](http://momentjs.com/) [*](/doc/serverjs/#embeddedmodules);
*   queue;
*   [request](https://github.com/request/request) [*](/doc/serverjs/#embeddedmodules);
*   serviceRegistry;
*   [sift](https://github.com/crcn/sift.js) [*](/doc/serverjs/#embeddedmodules);
*   utils/find;
*   wamp;

<a name="embeddedmodules"></a>
*Сторонний модуль, входящий в поставку Blank.
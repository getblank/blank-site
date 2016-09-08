+++
date = "2016-09-08T13:07:30+05:00"
title = "FS"
url = "/doc/fs/"
[menu.doc]
    parent = "serverjs"
    weight = 170
    url = "/doc/fs/"
+++

Модуль `fs`&nbsp;&mdash модуль [Node FS](https://nodejs.org/api/fs.html) с одним дополнительным методом.

### Подключение

```JavaScript
let fs = require("fs");
```

### Дополнительные методы

#### readLib()

Метод `fs.readLib()` предназначен для чтения дополнительных пользовательских файлов, расположенных в директории `/lib/` проекта.
Синтаксис и механизм работы аналогичен [fs.readFile()](https://nodejs.org/api/fs.html#fs_fs_readfile_file_options_callback).
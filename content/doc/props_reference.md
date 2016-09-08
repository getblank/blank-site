+++
date = "2016-08-06T22:41:33+05:00"
title = "Props reference"
[menu.doc]
    parent = "schema"
    weight = 60
+++

В зависимости от типа, поле может обладать определённым набором свойств из списка:

*   [accept](/doc/props_reference/#accept);
*   [access](/doc/props_reference/#access);
*   [actions](/doc/props_reference/#actions);
*   [addLabel](/doc/props_reference/#addLabel);
*   [configurable](/doc/props_reference/#configurable);
*   [default](/doc/props_reference/#default);
*   [disableCustomInput](/doc/props_reference/#disablecustominput);
*   [disabled](/doc/props_reference/#disabled);
*   [disableOrder](/doc/props_reference/#disableorder);
*   [disableRefSync](/doc/props_reference/#disablerefsync);
*   [display](/doc/props_reference/#display);
*   [displayWidth](/doc/props_reference/#displaywidth);
*   [extraQuery](/doc/props_reference/#extraquery);
*   [foreignKey](/doc/props_reference/#foreignkey);
*   [format](/doc/props_reference/#format);
*   [formGroup](/doc/props_reference/#formgroup);
*   [formOrder](/doc/props_reference/#formorder);
*   [formTab](/doc/props_reference/#formtab);
*   [hidden](/doc/props_reference/#hidden);
*   [html](/doc/props_reference/#html);
*   [label](/doc/props_reference/#label);
*   [labelClassName](/doc/props_reference/#labelclassname);
*   [load](/doc/props_reference/#load);
*   [loadComponent](/doc/props_reference/#loadcomponent);
*   [mask](/doc/props_reference/#mask);
*   [max](/doc/props_reference/#max);
*   [maxLength](/doc/props_reference/#maxlength);
*   [min](/doc/props_reference/#min);
*   [minLength](/doc/props_reference/#minlength);
*   [noSanitize](/doc/props_reference/#nosanitize);
*   [oppositeProp](/doc/props_reference/#oppositeprop);
*   [options](/doc/props_reference/#options);
*   [pattern](/doc/props_reference/#pattern);
*   [placeholder](/doc/props_reference/#placeholder);
*   [populateIn](/doc/props_reference/#populateIn);
*   [props](/doc/props_reference/#props);
*   [required](/doc/props_reference/#required);
*   [searchBy](/doc/props_reference/#searchby);
*   [selectedTemplate](/doc/props_reference/#selectedtemplate);
*   [sortable](/doc/props_reference/#sortable);
*   [sortBy](/doc/props_reference/#sortby);
*   [store](/doc/props_reference/#store);
*   [style](/doc/props_reference/#style);
*   [tableColumns](/doc/props_reference/#tablecolumns);
*   [tableLink](/doc/props_reference/#tablelink);
*   [tooltip](/doc/props_reference/#tooltip);
*   [type](/doc/props_reference/#type);
*   [utc](/doc/props_reference/#utc);
*   [widgetId](/doc/props_reference/#widgetid);
*   [widgets](/doc/props_reference/#widgets);
*   [сlassName](/doc/props_reference/#сlassname).


### accept
Только для `type:file`. Позволяет задать маску принимаемых для загрузки файлов.
В настоящее время не реализовано.

### access
Массив правил, определяющих доступ к полю. Синтаксис аналогичен свойству [access](/doc/store_reference/#access) Store.

### actions
Только для `type:action`. Массив объектов с описанием Actions, определённых в текущем Store.
Используется для размещения кнопок запуска Actions на форме в интерфейсе клиента.
Может переопределять некоторые свойства конкретных отображаемых Action.

```JavaScript
actions: [
     // Здесь мы указываем, что нужно поместить кнопку вызова Action copy
    { _id: "copy" },

    // Здесь мы дополнительно переопределяем свойство label
    { _id: "move", label: "Перенести" },
]
```

### addLabel
Только для `type:objectList`. Строка текстом для кнопки добавления нового элемента в список.
При рендеринге, строка обрабатывается через handlebars.

### configurable
Внутреннее свойство для Store по-умолчанию (bool). Определяет возможность переопределения свойств поля в пользовательской конфигурации.

### default
Определяет значение поля по-умолчению. Будет установлено при создании объекта, в случае, если значение не определено в создаваемом объекте.

### disableCustomInput


### disabled
Строка, описывающая условие недоступности редактирования поля текущего элемента в пользовательском интерфейсе.
В условии доступны объекты `$item` (текущий объект) и `$user` (пользователь, работающий с объектом).

### disableOrder
Флаг, определяющий запрет сортировки по полю при типе отображения Store `table` (bool).

### disableRefSync
Флаг, указывающий, что не требуется проводить обновление связи данного поля.
Подробнее о механизме каскадного обновления связей читайте в разделе [References sync](/doc/ref_sync/)

### display
Тип отображения поля в пользовательском интерфейсе (string). Возможные варианты:

*   `autocomplete`&nbsp;&mdash; только для `type:string`. Текстовое поле ввода с автодополнением.
Варианты определяются в свойстве [options](/doc/props_reference/#options);

*   `checkbox`&nbsp;&mdash; только для `type:bool`. Поле с флажком в виде галочки;

*   `checkList`&nbsp;&mdash; поле выбора нескольких вариантов, определённых в свойстве [options](/doc/props_reference/#options). Отображается в виде списка флажков;

*   `code`&nbsp;&mdash; отображение в виде нередактируемого текста с сохранением исходного форматирования и моноширинным шрифтом;

*   `codeEditor`&nbsp;&mdash; только для `type:string`. Редактор кода;

*   `colorPicker`&nbsp;&mdash; только для `type:string` поле выбора цвета из описанных в [options](/doc/props_reference/#options);

*   `commentsEditor`&nbsp;&mdash; только для `type:comments`. Поле для ввода комментариев;

*   `dataTable`&nbsp;&mdash; не реализовано;

*   `datePicker`&nbsp;&mdash; только для `type:date`. Поле ввода даты;

*   `dateTimePicker`&nbsp;&mdash; только для `type:date`. Поле ввода даты и времени (не реализовано);

*   `filePicker`&nbsp;&mdash; только для `type:file`. Поле выбора и закачки файлов;

*   `floatInput`&nbsp;&mdash; только для `type:int` и `type:float`. Текстовое поле ввода с возможность ввода только числовых вещественных значений;

*   `headerInput`&nbsp;&mdash; ;

*   `html`&nbsp;&mdash; отображение поля по переданному в свойстве [html](/doc/props_reference/#html) шаблону;

*   `link`&nbsp;&mdash; отображение ссылки;

*   `masked`&nbsp;&mdash; только для `type:string`. Вввод данных по маске, определённой в свойстве [mask](/doc/props_reference/#mask) ;

*   `none`&nbsp;&mdash; запрет отображения поля в интерфейсе;

*   `numberInput`&nbsp;&mdash;  только для `type:int` и `type:float`. Текстовое поле ввода с возможность ввода только числовых целочисленных значений;

*   `password`&nbsp;&mdash; только для `type:password` и `type:string`. Поле ввода текста, при этом вводимые символы скрыты за звездочками;

*   `react`&nbsp;&mdash; отображение поля с помощью кастомного компонента ReactJS, определённого в свойстве [loadComponent](/doc/props_reference/#loadcomponent);

*   `searchBox`&nbsp;&mdash; только для `type:ref` и `type:refList`. Поле поиска и ввода объектов из Store,
определённой в свойстве [store](/doc/props_reference/#store);

*   `select`&nbsp;&mdash; поле выбора одного из нескольких вариантов, определённых в свойстве [options](/doc/props_reference/#options);

*   `text`&nbsp;&mdash; отображение в виде нередактируемого текста;

*   `textArea`&nbsp;&mdash;  только для `type:string`. Текстовое поле ввода с возможностью ввода нескольких строк текста;

*   `textInput`&nbsp;&mdash;  только для `type:string`. Текстовое поле ввода;

*   `timePicker`&nbsp;&mdash; только для `type:date`. Поле ввода времени (не реализовано).

### displayWidth


### extraQuery


### foreignKey
Только для `type:virtualRefList`. Определяет поле с `type:ref` в Store из свойства [store](/doc/props_reference/#store), содержащее ссылку на текущее Store
по которому будет делаться выборка данных для отображения.

### format
Только для `type:date`. Формат отображения даты в пользовательском интерфейсе в соответствии с синтаксисом [Moment.js](http://momentjs.com/) (строка).

### formGroup
Идентификатор группы для отображения поля в пользовательском интерфейсе (строка). Группы определяются в [Store.formGroupsOrder](/doc/store_reference/#formgroupsorder).

### formOrder
Число, определяющее место отображения поля на форме в пользовательском интерфейсе (int). Может быть отрицательным.

### formTab
Идентификатор табы для отображения поля в пользовательском интерфейсе (строка). Табы определяются в [Store.formTabs](/doc/store_reference/#formtabs).

### hidden
Условие, при выполнении которого поле будет скрыто с формы в пользовательском интерфейсе (строка).
В условии доступны объекты `$item` (текущий объект) и `$user` (пользователь, работающий с объектом).

### html
Только для `display:html`. Шаблон для отображения поля в пользовательском интерфейсе (строка). При рендеринге, обрабатывается через handlebars.

### label
Заголовок поля на форме в пользовательском интерфейсе. При рендеринге, обрабатывается через handlebars.

### labelClassName
Определяет дополнительный CSS класс для заголовка поля в пользовательском интерфейсе.

### load
Только для `type:virtual` и `type:virtual/client`. Функция загрузки виртуального поля.
В функции доступны объекты `$item` (текущий объект) и `$user` (пользователь, работающий с объектом).

### loadComponent
Только для `display:react`. Код компонента React.JS для отображения поля в пользовательском интерфейсе.

### mask
Только для `type:string` и `display:masked`. Определение маски ввода строки (строка или объект).

### max
Только для  `type:int` и `type:float`. Минимальное значение поля (число).

### maxLength
Только для `type:string`. Минимальная длина строки (число).

### min
Только для  `type:int` и `type:float`. Максимальное значение поля (число).

### minLength
Только для `type:string`. Максимальная длина строки (число).

### noSanitize
Флаг указывающий на то, что html в пропе является безопасным (bool).

### oppositeProp
Только для `type:ref`. Название поля в Store, определённой свойством [store](/doc/props_reference/#store) (строка).
Требуется для работы механизма каскадного обновления связей.
Подробнее о механизме каскадного обновления связей читайте в разделе [References sync](/doc/ref_sync/)

### options
Только для `display:select`, `display:checkList`, `display:autocomplete` и `display:colorPicker`.
Определяет возможные варианты значений поля (массив значений или объектов). Для опредления в пользовательском интерфейсе
отображения названий значений отличных от самих значений, следует передавать массив объектов следующего вида:
```JavaScript
{
    value: 1, // значение соответствующего типа
    label: "Номер один", // название значения, отображаемое в пользовательском интерфейсе
}
```

### pattern
Регулярное выражение для проверки вводимого значения (строка или объект). Имеется возможность переопределения
текста ошибки ввода значения поля в пользовательском интерфейсе. Для этого следует использовать объект вида:
```JavaScript
{
    expression: "^\d+$", // регулярное выражение в виде строки.
    message: "Нужно ввести хотя бы одну цифру", // Текст ошибки для отображения в пользовательском интерфейсе.
}
```

### placeholder
Для полей ввода данных в пользовательском интерфейсе. Определяет текстовую подсказку, отображаемую в поле ввода
при отсутствии значения.

### populateIn
Только для `type:ref`. Обозначает поле, в которое будет передан соответствующий объект из Store
определённом в свойстве [store](/doc/props_reference/#store).

### props
Только для `type:object` и `type:objectList`. Определяет свойства вложенных объектов.


### required
Флаг обязательного поля (bool). Если `true`, то при сохранении объекта с неустановленным значением поля будет возвращена ошибка.
В пользовательском интерфейсе при этом будет заблокирована кнопка **Сохранить**.

### searchBy


### selectedTemplate


### sortable


### sortBy


### store


### style


### tableColumns


### tableLink


### tooltip


### Type

```javascript
type: "string|int|float|bool|date|file|ref|refList|virtual"
```

Тип данных свойства.

#### bool
Значения типа `true` или `false`.

#### date
Соответствует JavaScript Date. При сериализации в JSON преобразуются в строку в формате [ISO&nbsp;8601](https://en.wikipedia.org/wiki/ISO_8601),
например – `"2016-08-11T06:36:47.134Z"`.

#### file
Файловое хранилище в Blank работает отдельно, в MongoDB сохраняются только идентификаторы файлов.

#### float
Вещественный тип.

#### int
Целочисленный тип.

#### object

```javascript
type: "object",
props: {
    //Свойства вложенного объекта
},
```

Тип для создания вложенной структуры данных. Поддерживается только один уровень вложенности объектов.

#### objectList

```javascript
type: "objectList",
props: {
    //Свойства вложенных объектов
},
```

Тип для создания массивов вложенных объектов данных. Поддерживается только один уровень вложенности.

#### ref

```javascript
type: "ref",
store: "refStoreName",
```

Ссылка на другой объект. Подходит для связей 1-1, N-1. Значением является строка с идентификатором объекта.

В Blank работает каскадное обновление связей, подробнее об этом механизме читайте в разделе [References sync](/doc/ref_sync/)

#### refList

```javascript
type: "refList",
store: "refStoreName",
```

Массив ссылок на другие объекты, используется для создания связей 1-N, M-N. Значение записывается в виде
массива строковых идентификаторов:

```javascript
["e5ba2446-81e1-4b2d-b901-ca9eabe9817e", "533ddfc5-5d3f-41f7-8557-872d4bfd2735"]
```

В Blank работает каскадное обновление связей, подробнее об этом механизме читайте в разделе [References sync](/doc/ref_sync/)

#### string
Строка.

#### virtual

Виртуальные свойства, данные этих свойств являются вычисляемыми и не сохраняются в БД. Для вычисления значения
используется функция load, получающая на вход текущий объект и пользователя, запрашивающего данные:

```javascript
type: "virtual",
load: function ($item, $user) {
    return $item.prop1 + $item.prop2;
},
```

### utc


### widgetId


### widgets


### сlassName
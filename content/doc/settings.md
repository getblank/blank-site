+++
date = "2016-09-08T15:11:25+05:00"
title = "Конфигурация"
[menu.doc]
    parent = "start"
    weight = 30
+++

Настройка Blank производится в нескольких Store типа `map`, описанных в формате [Blank Schema](/doc/schema/).

*   [_serverSettings](/doc/settings/#server)&nbsp;&mdash; параметры сервера;
*   [_commonSettings](/doc/settings/#common)&nbsp;&mdash; параметры, которые являются общими как для сервера, так и для клиентского приложения;
*   [_nav](/doc/settings/#_nav)&nbsp;&mdash; описание навигации клиентского приложения;

## _serverSettings {#server}

Используется для переопределения параметров работы серверных приложений.

### Конфигурация по-умолчанию

```JavaScript
_serverSettings: {
        type: "map",
        entries: {
            registerTokenExpiration: "0:60",
            passwordResetTokenExpiration: "0:10",
            facebookClientSecret: undefined,
        },
},
```

**registerTokenExpiration**

Время, отведённое на активацию зарегистрированных пользователей. Задается в формате `HH:MM`, где `HH`&nbsp;&mdash; часы,
а `MM`&nbsp;&mdash; минуты. В случае неактивации, по истечении указанного времени, пользовательский аккаунт будет удалён из системы.

**passwordResetTokenExpiration**

Время жизни токена для сброса пароля. Задается в формате `HH:MM`, где `HH`&nbsp;&mdash; часы,
а `MM`&nbsp;&mdash; минуты. По истечении указанного времени, токен обнуляется.

**facebookClientSecret**

Секретный ключ для [интеграции с Facebook](/doc/facebook/).

## _commonSettings {#common}

Используется для переопределения параметров, которые являются общими как для сервера, так и для клиентского приложения.

### Конфигурация по-умолчанию

```JavaScript
_commonSettings: {
        type: "map",
        entries: {
            title: "Default title",
            titleHref: undefined,
            titleIcon: undefined,
            locales: ["en", "ru"],
            defaultLocale: "en",
            meta: [
                { name: "description", content: "Application description" },
                { name: "author", content: "Application author" },
            ],
            links: [
                { rel: "canonical", href: "http://mysite.com/example" },
            ],
            scripts: [],
            lessVars: {},
            facebookClientId: undefined,
            signInProps: {
                login: {
                    type: "string",
                    display: "textInput",
                    label: "{{$i18n.$settings.common.email}}",
                    required: true,
                    formOrder: 1,
                },
                password: {
                    type: "string",
                    display: "password",
                    label: "{{$i18n.$settings.common.password}}",
                    required: true,
                    formOrder: 2,
                },
            },
            userActivation: false,
            resetPasswordDisabled: false,
            signUpDisabled: false,
            resetPasswordProps: {
                password: {
                    type: "string",
                    display: "password",
                    label: "{{$i18n.$settings.resetPassword.newPassword}}",
                    required: true,
                    formOrder: 2,
                },
            },
            resetPasswordRequestProps: {
                email: {
                    type: "string",
                    display: "textInput",
                    label: "{{$i18n.$settings.common.email}}",
                    required: true,
                    pattern: { expression: "^\\S+@\\S+\\.\\S+$", message: "{{$i18n.$settings.signUp.invalidEmail}}" },
                },
            },
            signUpProps: {
                email: {
                    type: "string",
                    display: "newUsernameInput",
                    pattern: { expression: "^\\S+@\\S+\\.\\S+$", message: "{{$i18n.$settings.signUp.invalidEmail}}" },
                    label: "{{$i18n.$settings.common.email}}",
                    required: true,
                    formOrder: 1,
                },
                password: {
                    type: "string",
                    display: "password",
                    label: "{{$i18n.$settings.common.password}}",
                    required: true,
                    formOrder: 2,
                },
                eula: {
                    type: "bool",
                    display: "checkbox",
                    label: "{{{$i18n.$settings.signUp.eulaCheck}}}",
                    required: true,
                    formOrder: 4,
                },
            },
        },
},
```

<a name="defaultLocale">
**defaultLocale**

Локаль по-умолчанию (string).

**facebookClientId**

Идентификатор приложения для [интеграции с Facebook](/doc/facebook/).

**lessVars**

Переопредяет CSS параметры клиентского приложения.

**links**

Определения дополнительные `link` тэги в разделе `<head>` клиентского приложения.
Например, можно туда поместить дополнительные css файлы, необходимые для работы приложения.

**locales**

Переопределеяет набор локалей приложения (array of string).

**meta**

Определяет дополнительные `meta` тэги в разделе `<head>` клиентского приложения.

**resetPasswordDisabled**

Запрет сброса пароля (bool). Если установлен в `true`, то в клиентском приложении не будет показан диалог сброса пароля.

**resetPasswordProps**

Переопределяет набор и характеристики диалога сброса пароля.

**resetPasswordRequestProps**

Переопределяет набор и характеристики диалога запроса сброса пароля.

**scripts**

Определяет дополнительные `script` тэги в разделе `<head>` клиентского приложения.
Например, можно использовать для загрузки дополнительных JavaScript файлов, необходимых для работы приложения.

**signInProps**

Переопределяет набор и характеристики диалога входа в систему.

**signUpDisabled**

Запрет самостоятельной регистрации пользователей (bool). Если установлен в `true`, то в клиентском приложении не будет показан диалог регистрации.

**signUpProps**

Переопределяет набор и характеристики диалога самостоятельной регистрации пользователей.
Дополнительные поля будут переданы в создаваемый профиль пользователя.

**title**

Переопределяет содержимое тэга `title` и заголовок клиентского приложения.

**titleHref**

Переопределяет ссылку в заголовке клиентского приложения.

**titleIcon**

Определяет изображение в заголовке клиентского приложения (ссылка на файл, может быть относительной, например "favicon.png").

**userActivation**

Включает необходимость активации учетных записей пользователей. Если установлен в `true`, только что зарегистрированному пользователю
на адрес электронной почты будет отправлено письмо со ссылкой на страницу активации учетной записи.


## _nav {#_nav}

Используется для определения структуры навигации клиентского приложения.

### Конфигурация по-умолчанию

```JavaScript
_nav: {
    type: "map",
    entries: {
        config": {
            label: "Administration",
        },
    },
},
```
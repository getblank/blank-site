+++
date = "2016-08-19T21:19:48+05:00"
title = "Facebook"
[menu.doc]
    parent = "social"
    weight = 10
+++

Аутентификация пользователей **Blank** может выполняться через популярные социальные сети.
В данном разделе описан порядок действий, необходимых для обеспечения интеграции **Blank** и **Facebook**.

### Создание приложения в Facebook

Первым делом, следует создать на [странице](https://developers.facebook.com/apps) приложение, которое будет получать данные пользователя.
Выбираем **Website**:
![step1](/img/facebook/step1.png)

Указываем название нового приложения. Именно его увидят пользователи при попытке войти в **Blank** через Facebook.
![step2](/img/facebook/step2.png)

Указываем контактный email и выбираем категорию, например, business.
![step3](/img/facebook/step3.png)

Самый важный шаг&nbsp;&mdash; указываем точный адрес работающего приложения на **Blank**.
![step4](/img/facebook/step4.png)

Попав на дашборд созданного приложения, копируем **App ID** и вставляем его параметром `facebookClientId` в хранилище `_commonSettings`,
**App Secret** указываем в хранилище `_serverSettings` параметром `facebookClientSecret`
![step5](/img/facebook/step5.png)

```JSON
"_serverSettings": {
    //
    "entries": {
        //
        "facebookClientSecret": "95edc3c722be8ec99d1739e8eaabdc4f"
    }
}
```

```JSON
"_commonSettings": {
    //
    "entries": {
        //
        "facebookClientId": "1063958526991595"
    }
}
```

После проведения всех настроек, остаётся только сделать доступным приложение всем пользователям
![step6](/img/facebook/step6.png)
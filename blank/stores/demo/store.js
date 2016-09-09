module.exports = {
    "demoStore": {
        "display": "list",
        "navOrder": 0,
        "label": "{{$i18n.storeLabel}}",
        "labels": [],
        "props": {
            "stringProperty": {
                "type": "string",
                "display": "textInput",
                "label": "String property"
            }
        },
        "actions": [],
        "objectLifeCycle": require("./_itemHooks.js"),
        "storeLifeCycle": {},
        "filters": {},
        "httpHooks": [],
        "tasks": [],
        "i18n": {
            "storeLabel": "Demo store"
        }
    }
};
module.exports = {
    "demoStore": {
        "display": "list",
        "navOrder": 0,
        "label": "{{$i18n.storeLabel}}",
        "labels": [],
        "props": {
            "chckbx": {
                "type": "string",
                "display": "password",
                "min": 10,
                "max": 100,
                "label": "password",
                "formOrder": 0,
            },
        },
        "actions": [],
        "objectLifeCycle": require("./_itemHooks.js"),
        "storeLifeCycle": {},
        "filters": {},
        "httpHooks": [],
        "tasks": [],
        "i18n": {
            "storeLabel": "Demo store",
        },
    },
};
module.exports = {
    "landings": {
        "display": "list",
        "navOrder": 0,
        "label": "{{$i18n.storeLabel}}",
        "labels": [],
        "props": {
            "email": {
                "type": "string",
                "display": "text",
                "label": "Email",
            },
        },
        "actions": [],
        "httpHooks": [
            {
                "uri": "land",
                "method": "POST",
                "script": function ($request) {
                    console.log($request.body);
                    return { type: "JSON", code: 200, rawData: {}, header: { "Access-Control-Allow-Origin": "*" } };
                },
            },
        ],
        "tasks": [],
        "i18n": {
            "storeLabel": "landings",
        },
    },
};
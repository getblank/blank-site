module.exports = {
    "landings": {
        "display": "list",
        "navOrder": 0,
        "label": "{{$i18n.storeLabel}}",
        "labels": [],
        "headerProperty": "email",
        "props": {
            "name": {
                "type": "string",
                "display": "textInput",
                "label": "Имя",
                "formOrder": 0,
            },
            "email": {
                "type": "string",
                "display": "text",
                "label": "Email",
                "formOrder": 5,
            },
            "activity": {
                "type": "string",
                "display": "textInput",
                "label": "Род занятий",
                "formOrder": 10,
            },
            "customactivity": {
                "type": "string",
                "display": "textInput",
                "label": "Род занятий – свой вариант",
                "formOrder": 15,
            },
            "company": {
                "type": "string",
                "display": "textInput",
                "label": "Компания",
                "formOrder": 20,
            },
        },
        "actions": [],
        "httpHooks": [
            {
                "uri": "land",
                "method": "POST",
                "script": function ($request) {
                    console.log($request.form);
                    let email = (($request.form.email || [])[0] || "").trim();
                    if (!email) { return { type: "JSON", code: 400, header: { "Access-Control-Allow-Origin": "*" } } }
                    return $db.insert("landings", { email: email })
                        .then((item) => {
                            return { type: "JSON", code: 200, rawData: item._id, header: { "Access-Control-Allow-Origin": "*" } };
                        });
                },
            },
            {
                "uri": "extra",
                "method": "POST",
                "script": function ($request) {
                    let o = {
                        _id: (($request.form.subscribeId || [])[0] || "").trim(),
                        name: (($request.form.name || [])[0] || "").trim(),
                        activity: (($request.form.activity || [])[0] || "").trim(),
                        customactivity: (($request.form.customactivity || [])[0] || "").trim(),
                        company: (($request.form.company || [])[0] || "").trim(),
                    };
                    console.log("________________________________", o);
                    if (!o._id) { return { type: "JSON", code: 400, header: { "Access-Control-Allow-Origin": "*" } } }
                    return $db.set("landings",o)
                        .then((item) => {
                            return { type: "JSON", code: 200, rawData: item._id, header: { "Access-Control-Allow-Origin": "*" } };
                        });
                },
            },
        ],
        "tasks": [],
        "i18n": {
            "storeLabel": "landings",
        },
    },
};
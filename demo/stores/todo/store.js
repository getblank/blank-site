module.exports = {
    todoStore: {
        label: "Мои задачи",
        access: [
            {
                role: "all",
                permissions: "vcrudx",
                condition: {
                    _ownerId: {
                        $expression: "$user._id",
                    },
                },
            },
        ],
        props: {
            todoList: {
                type: "objectList",
                label: " ",
                addLabel: "Добавить задачу",
                props: {
                    task: {
                        type: "string",
                        display: "textInput",
                        label: "Задача",
                        formOrder: 0,
                    },
                    done: {
                        type: "bool",
                        display: "checkbox",
                        label: "Выполнено?",
                        formOrder: 10,
                        style: { width: 50 },
                    },
                },
            },
        },
    },
};
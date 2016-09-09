module.exports = {
    "willCreate": function ($item) {
        return $db.nextSequenceString("demoStore").then((res) => {
            $item.name = res;
        });
    },
};
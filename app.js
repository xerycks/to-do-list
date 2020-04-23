const express = require("express");
const bodyParser = require("body-parser");
const newDate = require(__dirname + "/date.js")

const app = express();
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

var items = [];
let workItems = [];

app.set("view engine", "ejs");

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(express.static("public"));

app.get("/", function (req, res) {
    var today = newDate.newDate();
    res.render("index", {
        listTitle: today,
        newListItem: items,
    });
});

app.get("/work", function (req, res) {
    res.render("index", {
        listTitle: "work",
        newListItem: workItems,
    });
});

app.post("/", function (req, res) {
    var item = req.body.newItem;
    if (req.body.list === "work ") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
});

app.get("/about", (req, res) => res.render("about"));

app.listen(3000, () => console.log(`Example app listening on port 3000!`));
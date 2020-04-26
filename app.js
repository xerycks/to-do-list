const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const lodash = require("lodash");

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.set("view engine", "ejs");

app.use(express.static("public"));

mongoose.connect(
  "mongodb+srv://xerycks:12345678qwe@cluster0-cnzva.mongodb.net/listDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const listSchema = mongoose.Schema({
  item: String,
});

const newListSchema = {
  name: String,
  items: [listSchema],
};

const newList = mongoose.model("newList", newListSchema);

const Item = mongoose.model("item", listSchema);

const i1 = new Item({
  item: "simple to do list",
});

const i2 = new Item({
  item: "<-- delete any item by clicking here",
});

const i3 = new Item({
  item: "create another --> add /<anyName> to address",
});

const defaultItems = [i1, i2, i3];

app.get("/", function (req, res) {
  Item.find({}, function (err, i) {
    if (i.length === 0) {
      Item.insertMany(defaultItems, function (err) {
        if (err) {
          console.log("atka");
        } else {
          console.log("insert ho gaya !!");
        }
      });
      res.redirect("/");
    } else {
      res.render("index", {
        listTitle: "today",
        newListItem: i,
      });
    }
  });
});

app.post("/", function (req, res) {
  var itemName = req.body.newItem;
  var listName = req.body.btn;

  const i = new Item({
    item: itemName,
  });

  if (listName === "today") {
    i.save();
    res.redirect("/");
  } else {
    newList.findOne({
      name: listName
    }, function (err, result) {
      result.items.push(i);
      result.save();

      res.redirect("/" + listName);
    });
  }
});

app.post("/delete", function (req, res) {
  var check_id = req.body.check;
  var listName2 = req.body.checkList;

  if (listName2 === "today") {
    Item.findByIdAndDelete({
        _id: check_id,
      },
      function (err) {}
    );

    res.redirect("/");
  } else {
    newList.findOneAndUpdate({
        name: listName2
      }, {
        $pull: {
          items: {
            _id: check_id
          }
        }
      },
      function (err, result) {
        if (!err) {
          res.redirect("/" + listName2);
        }
      }
    );
  }
});

app.get("/:newListTitle", function (req, res) {
  var newListName = lodash.startCase(req.params.newListTitle);

  newList.findOne({
    name: newListName
  }, function (err, result) {
    if (!err) {
      if (result) {
        res.render("index", {
          listTitle: newListName,
          newListItem: result.items,
        });
      } else {
        const nayiList = new newList({
          name: newListName,
          items: defaultItems,
        });

        nayiList.save();

        res.redirect("/" + newListName);
      }
    } else {}
  });
});

app.get("/about", (req, res) => res.render("about"));

app.listen(process.env.PORT || 5000, () =>
  console.log(`Example app listening on port 3000!`)
);

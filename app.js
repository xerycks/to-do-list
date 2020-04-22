const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}))

app.get('/', function (req, res) {
    var date = new Date();
    var day = date.getDay();
    const dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    var today = "";

    res.render('index', {
        theDay: dayName[day]
    })

    // if (day === 0 || day === 6) {
    //     today = "weekend";
    //     res.send("hey ba");
    // } else {
    //     today = "weekday";
    //     res.render("index", {
    //         theDay: today
    //     });
    // }
})


app.listen(3000, () => console.log(`Example app listening on port 3000!`))
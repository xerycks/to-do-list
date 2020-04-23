// jshint esversion:6

exports.newDate = function () {
    var date = new Date();

    var options = {
        weekday: "long",
        day: "numeric",
        month: "long",
    };

    return date.toLocaleDateString("en-Us", options);
}

exports.newday = function () {
    var date = new Date();

    var options = {
        weekday: "long"
    };

    return date.toLocaleDateString("en-Us", options);
}
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = Schema({
        username        : String,
        password        : String,
        reminders       : [{type: Schema.Types.ObjectId, ref: "Reminder"}]
});

module.exports = mongoose.model("User", userSchema);



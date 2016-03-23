var mongoose = require('mongoose')
var Schema = mongoose.Schema


var reminderSchema = Schema({
        schedule        : Object,
        title           : String, 
        message         : String
})

module.export  = mongoose.model("Reminder", reminderSchema);


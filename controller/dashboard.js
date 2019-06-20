var db = require('../conn');
var Task = function(task){
    this.task = task.task;
    this.status = task.status;
    this.created_at = new Date();
};

Task.get_user = function getAllTask(result) {
    db.query("Select * from user", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            //console.log('tasks : ', res);
            result(null, res);
        }
    });   
};
module.exports= Task;
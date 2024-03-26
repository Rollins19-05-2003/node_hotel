var os = require('os');
var fs = require('fs');
var _ = require('lodash');  // performs many useful operations and logic

var user = os.userInfo();
console.log(user);

fs.appendFile('greeting.txt', `Hi ${user.username} ! \n`,()=>{console.log("File is created")});

var data = ['person', 1 , 2 , 21, 2 ,1, "person", 'name',1+3];
const filter = _.uniq(data);    // it will give the unique data in the array
console.log(filter);
console.log(_.isString(true));
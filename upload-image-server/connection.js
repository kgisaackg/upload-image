const mysql      = require('mysql');

const connection = mysql.createConnection({
 
  host: 'localhost',
  password: '12345', 
  user:'isaacadmin', 
  database: 'image_db'
});

connection.connect((err) => {
    if(err) 
        console.log(err);
    else
        console.log('Connection establised');
});

module.exports = {connection};
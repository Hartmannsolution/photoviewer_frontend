var casual = require('casual');

// Create an object for config file
var db = { persons: [] };

for (var i = 1; i <= 2001; i++) {
    var person = {};
    person.id = i;
    person.firstName = casual.first_name;
    person.lastName = casual.last_name;
    person.gender = ['male','female'][Math.floor(Math.random() * 2)];
    person.email = casual.email;
    
    db.persons.push(person);
}
console.log(JSON.stringify(db));
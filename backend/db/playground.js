const Users = require('../models/Users');
const db = require('../db');

async function test() {
    let test = await Users.findByEmail('john@example.com')
    console.log(test)
}
test()
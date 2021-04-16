const bcrypt = require('bcryptjs')

const users = [
    {
        email:'mirovois@gmail.com',
        password: bcrypt.hashSync('123456',10),
        displayName:'miro'
    },
    {
        email:'john@do.com',
        password:bcrypt.hashSync('123456',10),
        displayName:'john'
    },
    {
        email:'tetiana@gmail.com',
        password:bcrypt.hashSync('123456',10),
        displayName:'tetiana'
    }
]
module.exports = users
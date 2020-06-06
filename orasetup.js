var oracledb = require('oracledb')

var connOptions = {
    user: "system",
    password: "Password12!",
    connectString: "localhost/XE"
}

oracledb.getConnection(connOptions, function(err, connection) {
    if (err) {
        console.log(err.message)
        return process.exit(1)
    }

    connection.execute('CREATE USER apatite IDENTIFIED BY "Nodejs20090527!"',[], function(createErr, result) {
        if (createErr) {
            console.log(createErr.message)
            return process.exit(1)
        }
        connection.execute('GRANT ALL PRIVILEGES TO apatite',[], function(grantErr, result) {
            if (grantErr) {
                console.log(grantErr.message)
                return process.exit(1)
            }
            return process.exit(0)
        })
    })
})
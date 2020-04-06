module.exports = class {
    constructor() {
        let sqlObject = require("mysql");

        this.databaseConnectionObject = sqlObject.createConnection({
            host: "us-cdbr-iron-east-01.cleardb.net",
            user: "b27a07a4eaaead",
            password: "b0233fc4*",
            database: "heroku_97950ac6928757d"
        });

        this.connectToSql();
    }

    connectToSql() {
        this.databaseConnectionObject.connect(function (err) {
            if (err) {
                let error = {};
                error.errorType = err.code;
                error.errorMessage = err.sqlMessage;
                console.log(error);
            }
            else {
                console.log("Connected to Database...");
            }
        });
    }

    insertData(query) {
        return new Promise((resolve, reject) => {
            this.databaseConnectionObject.query(query, function (err, result) {
                let isSuccessful = "Failed";
                let error = {};

                if (err) {
                    error.errorType = err.code;
                    error.errorMessage = err.sqlMessage;
                }
                else {
                    error = null;
                    isSuccessful = "Success";
                }

                resolve({ status: isSuccessful, error: error });
            });
        });
    }
}
var inquirer = require('inquirer');
var connection;
const PORT = process.env.PORT || 3001;


    try {
        const mysql = require('mysql2');
        // create the connection
        connection = mysql.createConnection({ host: 'localhost', user: 'root', database: 'employees_db' });
        console.log("Connection created")
        // query database
    } catch (error) {
        console.log(error)
    }


function mainMenu() {
    inquirer.prompt({
        type: "list",
        message: "what would you like to do?",
        name: "choice",
        choices: [
            "View all departments",
            "View all roles",
            "View all employees",
            "Add a department",
            "Add a role",
            "Add an employee",
            "Update employee role",
            "Quit",
        ],
    }).then((answers) => {
        console.log(answers)
        switch (answers.choice) {
            case "View all departments":
                connection.execute("select * from department", 
                function(err, [result]){
                    console.table(result)
                })
                mainMenu();
                break;
            case "View all roles":
                break;
            case "View all employees":
                break;
            case "Add a department":
                break;
            case "Add a role":
                break;
            case "Add an employee":
                break;
            case "Update employee role":
                break;
            case "Quit":
                console.log("bye-bye")
                process.exit();
            default:
                console.log("Make another choice")
                break;
        }
    })
}

mainMenu()
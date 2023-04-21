var inquirer = require('inquirer');
const cTable = require('console.table');
var connection;
const PORT = process.env.PORT || 3001;

async function main() {
    // get the client
    try {
        const mysql = require('mysql2/promise');
        // create the connection
        connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'employees_db' });
        console.log("Connection created")
        // query database
        mainMenu()
    } catch (error) {
        console.log(error)
    }
}

async function mainMenu() {
    console.log("main menu running")

    const [departmentData, fields] = await connection.execute("SELECT * FROM department");

    console.table(departmentData)
}

main()

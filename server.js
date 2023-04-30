var inquirer = require('inquirer');
const cTable = require('console.table');
var connection;
const PORT = process.env.PORT || 3001;

async function main() {
    // get the client
    try {
        const mysql = require('mysql2/promise');
        // create the connection
        connection = await mysql.createConnection({ 
            host: 'localhost', 
            user: 'root', 
            database: 'employees_db' 
        });
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

    // console.table(departmentData)

//

    const answer = await inquirer.prompt([
        {
            type: "list",
            name: "choices",
            message: "What would you like to do?",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update an employee role",
                "Exit"
            ]
        }
    ])
    .then((responses) => {
        const { choices } = responses;
        console.log(responses)

        if (choices === "View all departments") {
            viewDepartments();
        }

        if (choices === "View all roles") {
            viewRoles()
        }

        if (choices === "View all employees") {
            viewEmployees()
        }

        if (choices === "Add a department") {
            addDepartment()
        }

        if (choices ===  "Add a role") {
            addRole()
        }

        if (choices === "Add an employee") {
            addEmployee()
        }

        if (choices === "Update an employee role") {
            updateRole()
        }

        if (choices === "Exit") {
            process.exit()
        }
        
    })
}

async function viewDepartments(){
    const departmentData = await connection.query("select * from department")
    console.table(departmentData[0])
    mainMenu()
};

async function viewEmployees(){
    const employeesData = await connection.query("select * from employees")
    console.table(employeesData[0])
    mainMenu()
};

async function viewRoles(){
    const roleData = await connection.query("select * from role")
    console.table(roleData[0])
    mainMenu()
};

async function addDepartment(){
    const answer = await inquirer.prompt([
        {
            type: "input",
            name: "departmentName",
            message: "What's the name of the department you would like to add",
        }
    ])
    console.log(answer)
    const departmentData = await connection.query("insert into department(name) values (?)", answer.departmentName)
    console.log (departmentData)
};

async function addEmployee(){
    const roleData = await connection.query("select * from role")
    const employeeData = await connection.query("select * from employees")
    // console.log(employeeData)
    // console.log(roleData)
    const roleChoices = roleData[0].map(({id, title}) => ({name:title, value:id}))
    const employeeChoices = employeeData[0].map(({id, first_name, last_name,}) => ({name:`${first_name} ${last_name}`, value:id}))
    const answer = await inquirer.prompt([
        {
            type: "input",
            name: "employeeFirstName",
            message: "What's the employees first name you would like to add",
        },
        {
            type: "input",
            name: "employeeLastName",
            message: "What's the employees last name you would like to add",
        },
        {
            type: "list",
            name: "employeeRole",
            message: "What's the employees role you would like to add",
            choices: roleChoices
        },
        {
            type: "list",
            name: "employeeManager",
            message: "What's the employees manager role you would like to add",
            choices: employeeChoices
        }
    ])
    // console.log(answer)
    const newEmployeeData = await connection.query(`insert into employees (first_name, last_name, role_id, manager_id) values ("${answer.employeeFirstName}", "${answer.employeeLastName}", ${answer.employeeRole}, ${answer.employeeManager})`)
    // console.log(newEmployeeData[0])
    mainMenu()
};

async function addRole(){
    const departmentData = await connection.query("select * from department")
    const departmentChoices = departmentData[0].map(({id, name}) => ({name, value:id}))

    const answer = await inquirer.prompt([
        {
            type: 'input',
            name: 'roleTitle',
            message: 'What is the title of the role you would like to add'
        },
        {
            type: 'input',
            name: 'roleSalary',
            message: 'What is the salary for this role'
        },
        {
            type: 'list',
            name: 'departmentId',
            message: 'Which department does this role belong to',
            choices: departmentChoices
        },
    ]);
    
    const newRoleData = await connection.query(
        'insert into role (title, salary, department_id) values (?, ?, ?)',
        [answer.roleTitle, answer.roleSalary, answer.departmentId])

    mainMenu()

    // console.log(`Added new role: ${answer.roleTitle}`)
};

async function updateRole(){
    const employeeData = await connection.query('select * from employees')
    const employeeChoices = employeeData[0].map(({ id, first_name, last_name }) => ({ name: `${first_name} ${last_name}`,  value: id }))

    const roleData = await connection.query("select * from role")
    const roleChoices = roleData[0].map(({ id, title }) => ({ name: title, value: id}))

    const answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'employeeUpdate',
            message: 'Which employees role would you like to update',
            choices: employeeChoices
        },
        {
            type: 'list',
            name: 'newRole',
            message: 'What is the employees new role',
            choices: roleChoices
        },
    ])

    const { employeeUpdate, newRole } = answer;
    await connection.query(`update employees set role_id = ? where id = ?`, [newRole, employeeUpdate])
    console.log("Employee role has been updated")
    mainMenu()
};





main()
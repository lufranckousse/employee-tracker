const inquirer = require('inquirer');
const { addDepartment,addRole,addEmployee, getAllDepartments,getAllRoles,getAllEmployee, updateRole } = require('./databaseFunctions');
// Function to display all departments
async function displayDepartments() {
    try {
        const departments = await getAllDepartments();
        console.log('\nAll Departments:');
        console.table(departments);
    } catch (error) {
        console.error('Error:', error);
    }
    await promptAction();
}
async function displayRoles() {
    try {
        const roles = await getAllRoles();
        console.log('\nAll Roles:');
        console.table(roles);
    } catch (error) {
        console.error('Error:', error);
    }
    await promptAction();
}

async function displayEmployees() {
    try {
        const employees = await getAllEmployee();
        console.log('\nAll Employees:');
        console.table(employees);
    } catch (error) {
        console.error('Error:', error);
    }
    await promptAction();
}
// Function to prompt user for action
async function promptAction() {
    const { action } = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            "View all departments",
            "View all roles",
            "View all employees",
            "Add a department",
            "Add a role",
            "Add an employee",
            "Update an employee role",
            'Exit'
        ]
    });

    switch (action) {
        case 'View all departments':
            await displayDepartments();
            break;
        case "View all roles":
            await displayRoles();
            break;
                
        case "View all employees":
            await displayEmployees();
            break;
            
        case "Add a department":
            await promptAddDepartment();
            break;
        
        case "Add a role":
            await promptAddRole();
            break;
            
        case "Add an employee":
            await promptAddEmployee();
            break;

        case "Update an employee role":
            await promptUpdateEmployee();
            break;    
       
        case 'Exit':
            console.log('Goodbye!');
            process.exit();
    }
}


async function promptUpdateEmployee() {
    const roleArray= [];
    const employeeArray= [];
    const allRoles = await getAllRoles();
    const allEmployee = await getAllEmployee();
    // populates role array with all roles
    for (let i = 0; i < allRoles.length; i++) {
            roleArray.push(allRoles[i].title);
    }
    // populates employee array with all employees
    for (let i = 0; i < allEmployee.length; i++) {
            let employeeName = `${allEmployee[i].first_name} ${allEmployee[i].last_name}`
            employeeArray.push(employeeName);
    }
   
    const { employeeinfo } = await inquirer.prompt({
        type: 'list',
        name: 'employeeinfo',
        message: "Which employee do you want to update?",
        choices: employeeArray
       
    });
    const { role } = await inquirer.prompt({
        type: 'list',
        name: 'role',
        message: "What is the employee's new role?",
        choices: roleArray
        
    });
    const roleTitle = allRoles.find(roledata => roledata.title === role.trim());
    const employeedata = allEmployee.find(employee => employee.first_name === employeeinfo.split(" ")[0] && employee.last_name === employeeinfo.split(" ")[1]);
    
    await updateRole(employeedata.id,roleTitle.id);
    console.log('Employee Role update successfully!');
    await promptAction();
}



async function promptAddEmployee() {
    const roleArray= [];
    const employeeArray= [];
    const allRoles = await getAllRoles();
    const allEmployee = await getAllEmployee();
    // populates role array with all roles
    for (let i = 0; i < allRoles.length; i++) {
            roleArray.push(allRoles[i].title);
    }
    // populates employee array with all employees
    for (let i = 0; i < allEmployee.length; i++) {
            let employeeName = `${allEmployee[i].first_name} ${allEmployee[i].last_name}`
            employeeArray.push(employeeName);
    }
   
    const { first_name } = await inquirer.prompt({
        type: 'input',
        name: 'first_name',
        message: "What is the employee's first name?",
        validate: function(value) {
            if (value.trim() === '') {
                return 'Please enter a Employee first name.';
            }
            return true;
        }
    });
    const { last_name } = await inquirer.prompt({
        type: 'input',
        name: 'last_name',
        message: "What is the employee's last name?",
        validate: function(value) {
            if (value.trim() === '') {
                return 'Please enter Employee last name.';
            }
            return true;
        }
    });
    const { role } = await inquirer.prompt({
        type: 'list',
        name: 'role',
        message: "What is the employee's role?",
        choices: roleArray,
        validate: function(value) {
            if (value.trim() === '') {
                return 'Please Select employee role.';
            }
            return true;
        }
    });
    const { has_manager } = await inquirer.prompt({
        type: 'list',
        message: "Does the employee have a manager?",
        name: 'has_manager',
        choices: ["Yes", "No"]
    });

    let managerid = null
    if (has_manager === "Yes") {
        const { manager }= await inquirer.prompt(
            {
            type: 'list',
            message: "Please select the employees manager",
            name: 'manager',
            choices: employeeArray
        }); 
        console.log(manager)

        const managerinfo = allEmployee.find(employee => employee.first_name === manager.split(" ")[0] && employee.last_name === manager.split(" ")[1]);
        console.log(managerinfo)
        managerid=managerinfo.id
        
    }
    const roleTitle = allRoles.find(roledata => roledata.title === role.trim());
    const employeeExists = allEmployee.some(employee => employee.first_name === first_name.trim() && employee.last_name === last_name.trim());
    if (employeeExists) {
        console.log('Employee already exists.');
    } else {
            // Add the role
            await addEmployee(first_name.trim(),last_name.trim(),roleTitle.id,managerid);
            console.log('Employee added successfully!');
    }
     // Prompt user for next action
     await promptAction();
   
}


async function promptAddRole() {
    let departmentArray = [];
    const departments = await getAllDepartments();
    for (let i = 0; i < departments.length; i++) {
        departmentArray.push(departments[i].name);
    }
    const { title } = await inquirer.prompt({
        type: 'input',
        name: 'title',
        message: 'What is the name of the new role?',
        validate: function(value) {
            if (value.trim() === '') {
                return 'Please enter a New Role name.';
            }
            return true;
        }
    });
    const { salary } = await inquirer.prompt({
        type: 'input',
        name: 'salary',
        message: 'What is the salary of the new role?',
        validate: function(value) {
            if (value.trim() === '') {
                return 'Please enter a Salary.';
            }
            return true;
        }
    });
    const { departmentname } = await inquirer.prompt({
        type: 'list',
        name: 'departmentname',
        message: 'What department is the role under?',
        choices: departmentArray,
        validate: function(value) {
            if (value.trim() === '') {
                return 'Please Select department Name.';
            }
            return true;
        }
    });
    const departmentId = departments.find(department => department.name === departmentname);
    const allroles = await getAllRoles();
    const roleTitleExists = allroles.some(role => role.title === title.trim());
    if (roleTitleExists) {
        console.log('Role already exists.');
    } else {
            // Add the role
            await addRole(title.trim(),salary.trim(),departmentId.id);
            console.log('Role added successfully!');
    }
     // Prompt user for next action
     await promptAction();
   
}


// Function to prompt user for department details and add a department
async function promptAddDepartment() {
    const { name } = await inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'Enter the name of the department:',
        validate: function(value) {
            if (value.trim() === '') {
                return 'Please enter a department name.';
            }
            return true;
        }
    });

    try {
        // Check if the department already exists
        const departments = await getAllDepartments();
        const departmentExists = departments.some(department => department.name === name.trim());
        if (departmentExists) {
            console.log('Department already exists.');
        } else {
            // Add the department
            await addDepartment(name.trim());
            console.log('Department added successfully!');
        }
    } catch (error) {
        console.error('Error adding department:', error);
    }

    // Prompt user for next action
    await promptAction();
}

// Start the CLI
async function start() {
    console.log('Welcome to the Employee Tracker CLI!');
    await promptAction();
}

// Call the start function to begin the CLI
start();

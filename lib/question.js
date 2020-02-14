const inquirer = require('inquirer');

function teamMember() {
    inquirer.prompt([
        {
            type: "input",
            message: "Member Name:",
            name: "name"
        },
        {
            type: "rawlist",
            message: "Member Role:",
            name: "role",
            choices: [
                "Manager",
                "Engineer",
                "Intern"
            ]
        }
    ])
}

teamMember();
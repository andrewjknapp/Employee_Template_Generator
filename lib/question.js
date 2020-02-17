const inquirer = require('inquirer');
const { Employee, Manager, Engineer, Intern } = require('./class');

const teamArr = [];

const questions = new Promise((resolve, reject) => {

    function manager() {
    inquirer.prompt([
        {
            type: "input",
            message: "Manager name:",
            name: "name"
        },
        {
            type: "input",
            message: "Email:",
            name: "email"
        },
        {
            type: "input",
            message: "Office Number:",
            name: "office"
        }
    ]).then(function(ans) {
        teamArr.push(new Manager(ans.name, 1, ans.email, ans.office));
        another();
        //return new Manager(ans.name, 1, ans.email, ans.office);
    })
    }

    function teamMember() {
    inquirer.prompt([
        {
            type: "input",
            message: "Member Name:",
            name: "name"
        },
        {
            type: "input",
            message: "Email",
            name: 'email'
        },
        {
            type: "rawlist",
            message: "Member Role:",
            name: "role",
            choices: [
                "Engineer",
                "Intern"
            ]
        }
    ]).then(function(ans) {
    
        if(ans.role === "Engineer") {
            inquirer.prompt(
                {
                    type: "input",
                    message: "Github username",
                    name: 'github'
                }
            ).then(function(engAns) {
                teamArr.push(new Engineer(ans.name, teamArr.length + 1, ans.email, engAns.github));
                another();
            })
        } else {
            inquirer.prompt(
                {
                    type: "input",
                    message: "School",
                    name: 'school'
                }
            ).then(function(intAns) {
                teamArr.push(new Intern(ans.name, teamArr.length + 1, ans.email, intAns.school));
                another();
            })
        }
    })
    }

    function another() {
    inquirer.prompt(
        {
            type: "input",
            message: "Add another team member?",
            default: "yes",
            name: "continue"
        }
    ).then(function(ans) {
        
        if(ans.continue === 'yes') {
            teamMember();
        }//else call the make html function
        else {
            resolve(teamArr);
            //return teamArr;
        }
    })
    }

    manager();
})
module.exports = {
    questions
}

//manager();
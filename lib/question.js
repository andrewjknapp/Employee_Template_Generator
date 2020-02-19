const inquirer = require('inquirer');
const chalk = require('chalk');
const Manager = require('./Manager');
const Engineer = require('./Engineer');
const Intern = require('./Intern');

const teamArr = [];

const questions = new Promise((resolve, reject) => {

    function project() {
        inquirer.prompt([
            {
                type: "input",
                message: chalk.yellow("Project Title"),
                name: 'title'
            }
        ]).then(function(ans) {
            teamArr.push(ans.title);
            manager();
        })
    }

    function manager() {
    inquirer.prompt([
        {
            type: "input",
            message: chalk.cyan("Manager name:"),
            name: "name"
        },
        {
            type: 'input',
            message: chalk.cyan("Manager id"),
            name: 'id'
        },
        {
            type: "input",
            message: chalk.cyan("Email:"),
            name: "email"
        },
        {
            type: "input",
            message: chalk.cyan("Office Number:"),
            name: "office"
        }
    ]).then(function(ans) {
        teamArr.push(new Manager(ans.name, ans.id, ans.email, ans.office));
        another();
        //return new Manager(ans.name, 1, ans.email, ans.office);
    }).catch(function(err) {
        reject(err);
    })
    }

    function teamMember() {
    inquirer.prompt([
        {
            type: "input",
            message: chalk.cyan("Member Name:"),
            name: "name"
        },
        {
            type: 'input',
            message: chalk.cyan("Member ID: "),
            name: 'id'
        },
        {
            type: "input",
            message: chalk.cyan("Email"),
            name: 'email'
        },
        {
            type: "rawlist",
            message: chalk.cyan("Member Role:"),
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
                    message: chalk.cyan("Github username"),
                    name: 'github'
                }
            ).then(function(engAns) {
                teamArr.push(new Engineer(ans.name, ans.id, ans.email, engAns.github));
                another();
            }).catch(function(err) {
                reject(err);
            })
        } else {
            inquirer.prompt(
                {
                    type: "input",
                    message: chalk.cyan("School"),
                    name: 'school'
                }
            ).then(function(intAns) {
                teamArr.push(new Intern(ans.name, ans.id, ans.email, intAns.school));
                another();
            }).catch(function(err) {
                reject(err);
            })
        }
    }).catch(function(err) {
        reject(err);
    })
    }

    function another() {
    inquirer.prompt(
        {
            type: "input",
            message: chalk.yellow("Add another team member?"),
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
    }).catch(function(err) {
        reject(err);
    })
    }

    project();
})
module.exports = {
    questions
}

//manager();
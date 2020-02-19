const inquirer = require('inquirer');
const chalk = require('chalk');
const Manager = require('./Manager');
const Engineer = require('./Engineer');
const Intern = require('./Intern');

const teamArr = [];

const questions = new Promise((resolve, reject) => {

    //First step of app. Adds project title to teamArr and calls manager()
    function project() {
        inquirer.prompt([
            {
                type: "input",
                message: chalk.yellow("Project Title"),
                name: 'title',
                validate: answer => {
                    if (answer !== "") {
                      return true;
                    }
                    return "Please enter at least one character.";
                  }
            }
        ]).then(function(ans) {
            teamArr.push(ans.title);
            manager();
        })
    }

    //Prompts user for manager information and calls another()
    function manager() {
        inquirer.prompt([
        {
            type: "input",
            message: chalk.cyan("Manager name:"),
            name: "name",
            validate: answer => {
                if (answer !== "") {
                  return true;
                }
                return "Please enter at least one character.";
              }
        },
        {
            type: 'input',
            message: chalk.cyan("Manager id"),
            name: 'id',
            validate: answer => {
                const pass = answer.match(
                  /^[1-9]\d*$/
                );
                if (pass) {
                  return true;
                }
                return "Please enter a positive number greater than zero.";
              }
        },
        {
            type: "input",
            message: chalk.cyan("Email:"),
            name: "email",
            validate: answer => {
                const pass = answer.match(
                  /\S+@\S+\.\S+/
                );
                if (pass) {
                  return true;
                }
                return "Please enter a valid email address.";
              }
        },
        {
            type: "input",
            message: chalk.cyan("Office Number:"),
            name: "office",
            validate: answer => {
                const pass = answer.match(
                  /^[1-9]\d*$/
                );
                if (pass) {
                  return true;
                }
                return "Please enter a positive number greater than zero.";
              }
        }
        ]).then(function(ans) {
            teamArr.push(new Manager(ans.name, ans.id, ans.email, ans.office));
            another();
        
        }).catch(function(err) {
            reject(err);
        })
    }

    //Promts user for team member information. 
    //Changes based on whether member is an intern or engineer. calls another()
    function teamMember() {
        inquirer.prompt([
        {
            type: "input",
            message: chalk.cyan("Member Name:"),
            name: "name",
            validate: answer => {
                if (answer !== "") {
                  return true;
                }
                return "Please enter at least one character.";
              }
        },
        {
            type: 'input',
            message: chalk.cyan("Member ID: "),
            name: 'id',
            validate: answer => {
                const pass = answer.match(
                  /^[1-9]\d*$/
                );
                if (pass) {
                  return true;
                }
                return "Please enter a positive number greater than zero.";
              }
        },
        {
            type: "input",
            message: chalk.cyan("Email"),
            name: 'email',
            validate: answer => {
                const pass = answer.match(
                  /\S+@\S+\.\S+/
                );
                if (pass) {
                  return true;
                }
                return "Please enter a valid email address.";
              }
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
                    name: 'github',
                    validate: answer => {
                        if (answer !== "") {
                          return true;
                        }
                        return "Please enter at least one character.";
                    }
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
                    name: 'school',
                    validate: answer => {
                        if (answer !== "") {
                          return true;
                        }
                        return "Please enter at least one character.";
                      }
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

    //Asks user if there is another member. If yes calls teamMember().
    //else returns teamArr through resolve
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
        }
        else {
            resolve(teamArr);
        }
    }).catch(function(err) {
        reject(err);
    })
    }

    //Starts the questioning process
    project();
})

module.exports = {
    questions
}
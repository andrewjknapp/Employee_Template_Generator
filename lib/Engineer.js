const Employee = require('./Employee');

class Engineer extends Employee {
    constructor(name, id, email, github){
        super(name, id, email);
        this.github = github;
        this.icon = 'glasses';
    }

    getGithub() {
        return this.github;
    }
}

Engineer.prototype.getRole = function() {
    return "Engineer";
}

module.exports = Engineer;
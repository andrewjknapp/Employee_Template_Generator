class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }

    getName() {
        return this.name;
    }

    getId() {
        return this.id;
    }

    getEmail() {
        return this.email;
    }

    getRole() {
        return "Employee";
    }
};

class Manager extends Employee {
    constructor(name, id, email, officeNumber){
        super(name, id, email);
        this.officeNumber = officeNumber;
    }
}

Manager.prototype.getRole = function() {
    return "Manager";
}

class Engineer extends Employee {
    constructor(name, id, email, github){
        super(name, id, email);
        this.github = github;
    }
}

Engineer.prototype.getRole = function() {
    return "Engineer";
}

class Intern extends Employee {
    constructor(name, id, email, school){
        super(name, id, email);
        this.school = school;
    }
}

Intern.prototype.getRole = function() {
    return "Intern";
}

module.exports = {
    Employee,
    Manager,
    Engineer,
    Intern
}
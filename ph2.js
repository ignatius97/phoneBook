"use strict";
exports.__esModule = true;
var fs = require('fs');
var inquirer = require('inquirer');
var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var phoneBook = /** @class */ (function () {
    function phoneBook() {
        this.phone_book = [];
    }
    phoneBook.prototype.addContact = function (name, phone) {
        var _this = this;
        fs.readFile('phonebook.json', function (err, data) {
            if (err)
                throw err;
            _this.phone_book = JSON.parse(data);
            _this.phone_book.push({
                name: name,
                phone: phone
            });
            console.log(_this.phone_book);
            ask();
            data = JSON.stringify(_this.phone_book);
            fs.writeFile("phonebook.json", data, function (err) {
                if (err)
                    throw console.log(err);
            });
        });
        return this.phone_book;
    };
    phoneBook.prototype.deleteContact = function (delNameInput) {
        var _this = this;
        fs.readFile('phonebook.json', function (err, data) {
            if (err)
                throw err;
            _this.phone_book = JSON.parse(data);
            var nameIndex = _this.phone_book.map(function (a) { return a.name; }).indexOf(delNameInput);
            console.log(nameIndex);
            _this.phone_book.splice(nameIndex, 1);
            console.log('contact has been deleted');
            console.log(_this.phone_book);
            ask();
            data = JSON.stringify(_this.phone_book);
            fs.writeFile("phonebook.json", data, function (err) {
                if (err)
                    throw console.log(err);
            });
        });
        return this.phone_book;
    };
    phoneBook.prototype.updateContact = function (oldNameInput, name, phone) {
        var _this = this;
        fs.readFile('phonebook.json', function (err, data) {
            if (err)
                throw err;
            _this.phone_book = JSON.parse(data);
            var nameIndex = _this.phone_book.map(function (a) { return a.name; }).indexOf(oldNameInput);
            _this.phone_book[nameIndex] = { name: name, phone: phone };
            console.log(_this.phone_book);
            ask();
            data = JSON.stringify(_this.phone_book);
            fs.writeFile("phonebook.json", data, function (err) {
                if (err)
                    throw console.log(err);
            });
        });
        return this.phone_book;
    };
    phoneBook.prototype.viewContact = function (nameInput) {
        var _this = this;
        fs.readFile('phonebook.json', function (err, data) {
            if (err)
                throw err;
            _this.phone_book = JSON.parse(data);
            var nameIndex = _this.phone_book.map(function (a) { return a.name; }).indexOf(nameInput);
            var nameValue = _this.phone_book.map(function (a) { return a.name; });
            if (nameValue.includes(nameInput)) {
                console.log(_this.phone_book[nameIndex]);
                ask();
            }
            else {
                console.log("Name not found");
                ask();
            }
            _this.phone_book[nameIndex];
            data = JSON.stringify(_this.phone_book);
            fs.writeFile("phonebook.json", data, function (err) {
                if (err)
                    throw console.log(err);
            });
        });
        return this.phone_book;
    };
    phoneBook.prototype.viewAllContacts = function () {
        var _this = this;
        fs.readFile('phonebook.json', function (err, data) {
            if (err)
                throw err;
            _this.phone_book = JSON.parse(data);
            console.log(_this.phone_book);
            ask();
            data = JSON.stringify(_this.phone_book);
            fs.writeFile("phonebook.json", data, function (err) {
                if (err)
                    throw console.log(err);
            });
        });
        return this.phone_book;
    };
    return phoneBook;
}());
var question = [
    {
        type: 'confirm',
        name: 'askAgain',
        message: 'Do you want contiue (just hit enter for YES)?',
        "default": true
    }
];
function ask() {
    inquirer.prompt(question).then(function (answers) {
        if (answers.askAgain) {
            MenuList();
        }
        else {
            console.log('Good Bye');
        }
    });
}
var newContact = [
    {
        type: 'input',
        name: 'name',
        message: "Enter a Name"
    },
    {
        type: 'input',
        name: 'number',
        message: "Enter a Number"
    }
];
var delContact = [
    {
        type: 'input',
        name: 'name',
        message: "Enter a Name"
    }
];
var updateContact = [
    {
        type: 'input',
        name: 'oldName',
        message: "Enter a Name"
    },
    {
        type: 'input',
        name: 'name',
        message: "Enter a Name"
    },
    {
        type: 'input',
        name: 'number',
        message: "Enter a Number"
    }
];
var menu = [
    {
        type: 'list',
        name: 'menu',
        message: "Enter a Name",
        choices: ["Add contact", "Search contact", "Delete contact", "Update contact", "View All contact"]
    }
];
var personcart = new phoneBook();
function add() {
    inquirer.prompt(newContact).then(function (answers) {
        personcart.addContact(answers.name, answers.number);
    });
}
function del() {
    inquirer.prompt(delContact).then(function (answers) {
        personcart.deleteContact(answers.name);
    });
}
function update() {
    inquirer.prompt(updateContact).then(function (answers) {
        personcart.updateContact(answers.oldName, answers.name, answers.number);
    });
}
function viewOne() {
    inquirer.prompt(delContact).then(function (answers) {
        personcart.viewContact(answers.name);
    });
}
function viewAll() {
    personcart.viewAllContacts();
}
function MenuList() {
    inquirer.prompt(menu).then(function (ans) {
        if (ans.menu == "Add contact") {
            add();
        }
        else if (ans.menu == "Delete contact") {
            del();
        }
        else if (ans.menu == "Search contact") {
            viewOne();
        }
        else if (ans.menu == "Update contact") {
            update();
        }
        else if (ans.menu == "View All contact") {
            viewAll();
        }
        else {
            console.log('nooooo');
        }
    });
}
MenuList();
module.exports = MenuList;

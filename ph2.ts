const fs = require('fs');
const inquirer = require('inquirer');
import * as readline from 'readline'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
class phoneBook{
    phone_book = [];

    addContact(name,phone){
            fs.readFile('phonebook.json', (err, data) => {
                if (err) throw err;
                this.phone_book = JSON.parse(data);
                this.phone_book.push(
                    {
                        name,
                        phone
                    });
                console.log(this.phone_book);
                ask()
                data = JSON.stringify(this.phone_book)
                fs.writeFile("phonebook.json" ,data, (err)=>{
                    if(err) throw console.log(err);
                });
            });
        return this.phone_book  
    }

    deleteContact(delNameInput){
        fs.readFile('phonebook.json', (err, data) => {
            if (err) throw err;
            this.phone_book = JSON.parse(data);
            const nameIndex = this.phone_book.map(a => a.name).indexOf(delNameInput)
            console.log(nameIndex);  
            this.phone_book.splice(nameIndex,1);
            console.log('contact has been deleted');
            
            console.log(this.phone_book);
            ask();
            data = JSON.stringify(this.phone_book)
            fs.writeFile("phonebook.json" ,data, (err)=>{
                if(err) throw console.log(err);
            });
        });
        return this.phone_book  
    }

    updateContact(oldNameInput,name,phone){
        fs.readFile('phonebook.json', (err, data) => {
            if (err) throw err;
            this.phone_book = JSON.parse(data);
            const nameIndex = this.phone_book.map(a => a.name).indexOf(oldNameInput)
            this.phone_book[nameIndex]= {name,phone};
            console.log(this.phone_book);
            ask()
            data = JSON.stringify(this.phone_book)
            fs.writeFile("phonebook.json" ,data, (err)=>{
                if(err) throw console.log(err);
            });
        });
        return this.phone_book  
    }

    viewContact(nameInput){
        fs.readFile('phonebook.json', (err, data) => {
            if (err) throw err;
            this.phone_book = JSON.parse(data);
            const nameIndex = this.phone_book.map(a => a.name).indexOf(nameInput)
            if(this.phone_book.includes(nameInput)){
                console.log(this.phone_book[nameIndex]);
                ask();
            }
            else{
                console.log("Name not found");
                ask();
            }
            this.phone_book[nameIndex];
            data = JSON.stringify(this.phone_book)
            fs.writeFile("phonebook.json" ,data, (err)=>{
                if(err) throw console.log(err);
            });
        });
        return this.phone_book
    }

    viewAllContacts(){
        fs.readFile('phonebook.json', (err, data) => {
            if (err) throw err;
            this.phone_book = JSON.parse(data);
            console.log(this.phone_book);
            ask()
            data = JSON.stringify(this.phone_book)
            fs.writeFile("phonebook.json" ,data, (err)=>{
                if(err) throw console.log(err);
            });
        });
        return this.phone_book
    }
}

var question = [
    {
      type: 'confirm',
      name: 'askAgain',
      message: 'Do you want contiue (just hit enter for YES)?',
      default: true,
    }
  ];

function ask() {
    inquirer.prompt(question).then((answers) => {
      if (answers.askAgain) {
        MenuList()
      } else {
        console.log('Good Bye');
      }
    });
  }

var newContact = [
  {
    type: 'input',
    name: 'name',
    message: "Enter a Name",
  },
  {
    type: 'input',
    name: 'number',
    message: "Enter a Number",
  }
];

var delContact = [
    {
      type: 'input',
      name: 'name',
      message: "Enter a Name",
    }
];

var updateContact = [
    {
      type: 'input',
      name: 'oldName',
      message: "Enter a Name",
    },
    {
        type: 'input',
        name: 'name',
        message: "Enter a Name",
    },
    {
      type: 'input',
      name: 'number',
      message: "Enter a Number",
    }
  ];

var menu = [
    {
      type: 'list',
      name: 'menu',
      message: "Enter a Name",
      choices:["Add contact", "Search contact","Delete contact","Update contact","View All contact"]
    }
  ];

const personcart = new phoneBook();

function add() {
    inquirer.prompt(newContact).then((answers) => {
      personcart.addContact(answers.name,answers.number);
    });
}
function del() {
    inquirer.prompt(delContact).then((answers) => {
      personcart.deleteContact(answers.name);
    });
}
function update() {
    inquirer.prompt(updateContact).then((answers) => {
      personcart.updateContact(answers.oldName,answers.name,answers.number);
    });
}
function viewOne() {
    inquirer.prompt(delContact).then((answers) => {
      personcart.viewContact(answers.name);
    });
}
  
function viewAll(){
    personcart.viewAllContacts();
}



  function MenuList(){
      inquirer.prompt(menu).then((ans)=>{
        if(ans.menu == "Add contact"){
              add();   
        }
        else if(ans.menu == "Delete contact"){
            del();   
        }
        else if(ans.menu == "Search contact"){
            viewOne();  
        }
        else if(ans.menu == "Update contact"){
            update();  
        }
        else if(ans.menu == "View All contact"){
            viewAll();  
        }
        else{
              console.log('nooooo'); 
          }
      })
  }

  MenuList()








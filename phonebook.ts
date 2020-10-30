const fs = require('fs');


function testing(){
    fs.readFile('phonebook.json', (err, data) => {
        if (err) throw err;
        this.phone_book = JSON.parse(data);
        data = JSON.stringify(this.phone_book)
        console.log(this.phone_book);
        fs.writeFile("phonebook.json" ,data, (err)=>{
            if(err) throw console.log(err);
        });
    });
    return this.phone_book
}


testing();

module.exports = testing;



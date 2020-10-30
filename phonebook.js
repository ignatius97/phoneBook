var fs = require('fs');
function testing() {
    var _this = this;
    fs.readFile('phonebook.json', function (err, data) {
        if (err)
            throw err;
        _this.phone_book = JSON.parse(data);
        data = JSON.stringify(_this.phone_book);
        console.log(_this.phone_book);
        fs.writeFile("phonebook.json", data, function (err) {
            if (err)
                throw console.log(err);
        });
    });
    return this.phone_book;
}
testing();
module.exports = testing;

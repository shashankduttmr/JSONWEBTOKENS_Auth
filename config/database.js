const mongoose = require('mongoose')



exports.Connect = ()=>{
    mongoose.set('strictQuery', true)

    mongoose.connect(process.env.dburl)
        .then(function () {
            console.log('Connected');
        })
        .catch(function (err) {
            console.log('failed to connect');
            console.log(err);
            process.exit(1)

        })
}
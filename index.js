const app = require('./App')

const {PORT} = process.env

app.listen(PORT, function(req, res){
    console.log('Server is running...', + PORT);
})
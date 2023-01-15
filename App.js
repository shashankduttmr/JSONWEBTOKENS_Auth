
require('dotenv').config()
require('./config/database').Connect()
const express = require('express')
const app = express()
const bcrypt = require('bcryptjs')
const Auth = require('./models/User')
const jwt = require('jsonwebtoken')
const isloggedin = require('./middleware/Auth')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Middlewares === happens in between requests and response medeoker works in between each and every requests




app.get('/', function (req, res) {

    res.send("<h1>Hello from Rogan</h1>")
})

app.post('/register', async function (req, res) {
    try {
        const { firstname, lastname, email, password } = req.body
        if (firstname && lastname && email && password) {

            const existingUser = await Auth.findOne({email:email.toLowerCase()})
            
            if(existingUser){
                return res.status(404).send('User already')
            }

            const hash = await bcrypt.hash(password, 10)
            const u1 = await Auth.create({
                firstname: firstname,
                lastname: lastname,
                email: email.toLowerCase(),
                password: hash
            })
            //token creation
            const token = jwt.sign(
                {
                    user_id: u1._id,
                    email: email
                },
                process.env.secret_key,
                { expiresIn: '2h' }
            )

            u1.token = token
            u1.password=undefined
            res.status(200).json(u1)
        } else {
            res.status(400).send('All fields are required')
        }
    } catch (error) {
        console.log(error);
    }
})

app.post('/login', async function(req, res){
    const {email, password} = req.body
    if(email && password){
        const user = await Auth.findOne({email:email.toLowerCase()})
        if(!user){
            res.status(404).send('User is not registered yet')
        }else{
            const verify = await bcrypt.compare(password, user.password)
            if(verify){
                const token = jwt.sign({
                    user_id:user._id,
                    email:user.email
                }, process.env.secret_key,
                    {expiresIn:'2h'}
                )
                user.token = token
                user.password = undefined
                res.status(200).send(user)
            }else{
                res.status(404).send('Invalid email or a password')
            }
        }
    }else{
        res.send('All field are mendatory')
    }
})

app.get('/dashboard', isloggedin,function(req, res){
    res.status(200).send('Hello')
})

module.exports = app
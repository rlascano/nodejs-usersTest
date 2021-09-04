const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch(error){
        res.status(500).json({ error })
    }
})

router.post('/', async (req, res) => {
    try{
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const user = new User({
            name: req.body.name,
            password: hashedPassword
        })        
        const newUser = await user.save()
        res.status(201).send()
    } catch(err) {
        res.status(500).json({ err: err.message })
    }
    
})

router.post('/login', async (req, res) => {    
    try {
        const user = await User.findOne({name: req.body.name})
        if(user == null) {
            return res.status(400).send("Cannot find user")
        }
        if(await bcrypt.compare(req.body.password, user.password)){
            res.send("Success")            
        }
        else {
            res.send("Not Allowed")
        }
    } catch(err) {
        res.status(500).json({err: err.message})
    }
})

module.exports = router
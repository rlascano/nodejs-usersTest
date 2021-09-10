const express = require('express')
const router = express.Router()
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
        const user = new User({
            name: req.body.name,
            password: req.body.password
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
        const valid = await user.isValidPassword(req.body.password)           
        if(!valid) {            
            return res.status(400).send("Invalid name or password")
        }
        res.status(201).send("Success")
    } catch(err) {
        res.status(500).json({err: err.message})
    }
})

module.exports = router
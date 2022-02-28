const Port = 8000
const express = require('express')
const bcrypt = require('bcrypt')
const{ v1   : uuidv1 } = require('uuid')
const {connect} = require('getstream')
const StreamChat = require('stream-chat').StreamChat
const app =express()
const cors = require('cors')
app.use(cors())
app.use(express.json())

const API_ID = '1170160'
const API_secret= 'y69ryssj69w44cf4zy3bc676jcbzt9ycmp3u66k5ndj8n4hqb3bf9zs68esnrngk'
const API_key= '5fvpwurat73w'
// sign up
app.post('/signup', async(req,res)=> {
    try{
        const{username ,password} = req.body
        const userId = uuidv1()
        const hashedpassword = await bcrypt.hash(password ,10)

        const client = connect(API_key,API_secret,API_ID)
        const token  = client.createUserToken(userId)
        res.status(200).json({username , userId , hashedpassword , token })




        console.log(username ,password)
    }
    catch(error){console.log(error)
        req.status(500).json({message :error})

    }
})


// login


app.post('/login' , async(req,res)=>{
    try{
        const{username ,password} = req.body
        const client = connect(API_key,API_secret,API_ID)
        const chatClient = StreamChat.getInstance(API_key,API_secret )
        const { users} =await chatClient.queryUsers({name : username})

        if(!users.length) return res.json(400).json({message:'User does not exist'})
        const success =  await bcrypt.compare(password , users[0].hashedpassword)
        const token = client.createUserToken(users[0].id)
        const confirmedName = users[0].name
        const userId = users[0].id 

        if(success){
            res.status(200).json({token , username: confirmedName, userId})
        }
        else{
            res.status(500).json({message :'Login failed'})
        }

    }
    catch(error){
        console.log(error)
        req.status(500).json({message :error})


    }



})




app.listen(Port , () => console.log('Server running on Port' + Port))


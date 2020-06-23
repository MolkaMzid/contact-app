const express=require('express')
const bodyparser=require('body-parser')
const {MongoClient,ObjectId}=require('mongodb')
const cors=require('cors')
const app=express()

app.use(bodyparser.json())
app.use(cors())
const mongo_URL="mongodb://localhost:27017/"
// const  mongo_URL="mongodb+srv://molka:miko1991@cluster0-bzcnk.mongodb.net/<dbname>?retryWrites=true&w=majority"
const dbName="First_db_api"
MongoClient.connect(mongo_URL,{ useUnifiedTopology: true },(er,client)=>{
    if(er){
        console.log(er)
    }else{
        console.log("db is connected")
    const db=client.db(dbName)

app.get('/find_all',(req,res)=>{
db.collection('contactList').find().toArray((er,data)=>{
if(er) console.log(er)
else res.send(data)
        })
    })
app.get('/find_one/:id',(req,res)=>{
     let id=ObjectId(req.params.id)
    db.collection('contactList').findOne({_id:id})
    .then(result=>res.send(result))
    .catch(er=>res.send(er))
})    
app.post('/add_contact',(req,res)=>{
    let new_contact=req.body
    db.collection('contactList').insertOne(new_contact)
    .then(result=>res.send(result))
    .catch(er=>console.log(er))
})

app.put('/edit_contact/:id',(req,res)=>{
    let id=ObjectId(req.params.id)
    let Modified_contact=req.body
    db.collection('contactList').findOneAndReplace({_id:id},Modified_contact)
    .then(result=>res.send(result))
    .catch(er=>console.log(er))

})

app.delete('/delete/:id',(req,res)=>{
    let id=ObjectId(req.params.id) 
    db.collection('contactList').findOneAndDelete({_id:id})
    .then(result=>res.send(result))
    .catch(er=>console.log(er))
})
    }
})







app.listen(4000,(er)=>{
    if (er)console.log(er)
    else console.log('server is connected on port 4000')
})
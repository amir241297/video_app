const express = require('express')
const cors = require('cors')
const app = express()
const jwt = require('jsonwebtoken');
app.use(cors())
app.use(express.json())

const arr=[]


app.get("/", (req, res) => {
    res.send("Home")
    console.log("Home")
})
app.post("/login",(req,res)=>{
    const {name,email}=req.body
    const result=  arr.find((ele)=>{
        return (ele.name== name && ele.email==email)
    })
//    res.send(result)
//    console.log(result.length)
    if(result){
        const token = jwt.sign({ course: 'backend' }, 'lecture')
        try {
            console.log({ "response msg": "Login Successfull!", "token": token })
            res.send({ "response msg": "Login Successfull!", "token": token })
        } catch (err) {
            res.send(err)
            console.log("error while getting token: ", err)
        }
    }
    res.send("Incorrect mail id or password")
    console.log("Incorrect mail id or password")
})
app.post("/createAccount", (req, res) => {
    arr.push(req.body)
    console.log(req.body)
    res.send(arr)
})

app.listen(8080, () => {
    console.log("app is running port 8080")
})
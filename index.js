const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const path = require('path')
const PORT = process.env.PORT || 5500
const app = express()
dotenv.config()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}))

app.use(express.static(path.join(__dirname,'/public')))

app.get('/',async(req,res,next)=>{
    res.sendFile(path.join(__dirname,'public','pages/problem-1.html'))
})

app.post('/addWithoutCarry',async(req,res,next)=>{
    const {number1,number2}= req.body
    let str1 = number1.toString()
    let str2 = number2.toString()
    const maxLenght = Math.max(str1.length,str2.length)
    str1 = str1.padStart(maxLenght,'0') 
    str2 = str2.padStart(maxLenght,'0')
    let result = ''
    for (let i = 0; i < maxLenght; i++) {
        const Num1 = parseInt(str1.charAt(i));
        const Num2 = parseInt(str2.charAt(i));
        const Sum = (Num1+Num2) % 10
        result += Sum.toString()        
    } 
   res.status(200).json({data:parseInt(result)})

})
app.post('/IdentifyQuates',async(req,res,next)=>{
    const {quote} = req.body
    const result = quote.includes('not') ? 'Real Fancy' : 'Regularly Fancy';
    res.status(200).json({data:result})
})

app.listen(PORT,()=>{
    console.log(`app is running on the ${PORT}`)
})
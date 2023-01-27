const express = require("express");
const app = express();
const {v4} = require("uuid")  /// npm install uuid  ==> bu identifktor yasab beradi , yani taxminiy unikal id 
const path = require("path"); // client papkadagi malumotlarni olib kelib beradi

const CONTACTS = [
    {id: v4(), name :"Marufjon" , value : "+998 90 117 61 01" , marked :false}
]

app.use(express.json())

// GET 
app.get("/api/contacts" , ( req , res )=>{
    setTimeout(() => {
     res.status(200).json(CONTACTS)
    }, 300);
})

// POST 
app.post("/api/contacts" , (req , res)=>{
    console.log(req.body);
    res.json({test : 3})
//   const contact = {...req.body , id : v4(), marked : false};
//   CONTACTS.push(contact);
//   res.status(200).json(contact);
})


app.use(express.static(path.resolve(__dirname  , "client"))) // clientni ichidagi js filelarni ishlatish uchun static holatga keltirish kerak

// app.get("/" , (req , res)=>{
//   // request bu so'rov 
//   // response bu serverdan keladigon javob
//   res.send("Hello worlds")
// })

app.get("*" ,(req , res)=>{   /// "*" - hohlagan xolatda indexni chiqarib beradi 
     res.sendFile(path.resolve(__dirname, "client" , "index.html"))
})

app.listen(5000 , ()=>{  // projectni 5000 chi portga qaram qildik
    console.log("Server has been started on port 5000");
})



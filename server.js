const express=require('express')
const apiRoute=require('./routes/route.js');

const app=express();
app.use(express.json())
app.use(express.urlencoded())
app.use('/api',apiRoute);

const PORT=5000;

app.listen(PORT,()=>{
  try{
    console.log(`server is running on http://localhost:${PORT}`)
  }catch(er){
    console.log(er);
  }
})
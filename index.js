const express = require('express');
const db = require('./database/connection')
const BlogPost = require('./database/models')
const app = express();


app.use(express.static('./templates'));
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/',(req,res)=>{
    res.render('index.html')
})

app.get('/blog',async (req,res)=>{
    try{
        const data = await BlogPost.find()
        const { title, content, author } = data[0];
        console.log(title, content, author);
        res.json(data)
    }
    catch(error){
        console.log(error)
    }
})

app.post('/blog/save',(req,res)=>{
    console.log(req.body)
    const blog = new BlogPost(req.body)
    try{
        blog.save();
        console.log('Data saved successfully');
    }
    catch(error){
        console.log(error)
    }
    res.redirect('/');
})

app.put('/blog/update/:id',(req,res)=>{
    
})

app.delete('/blog/delete/:id',(req,res)=>{

})

app.listen(3000,()=>{
    console.log("Listening on port 3000")
})


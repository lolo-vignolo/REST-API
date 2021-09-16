const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require ("body-parser");
const eje = require ("ejs");


const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true});

const articleSchema = {
  title: String,
  content: String,
};
const Article = mongoose.model ("Article", articleSchema);

app.get("/articles", (req, res) =>{
  Article.find((err,results) =>{
    if(!err){
      res.send(results);
    }else{
      res.send(err);
    }
  });
});


app.post("/articles", (req,res) =>{

  const newArticle = new Article({
    title:req.body.title,
    content:req.body.content,
  });
  newArticle.save((err)=>{
    if(!err){
      res.send("the information was saved sucessfully");
    }else{
      res.send(err);
    }
  });
});


app.delete ("/articles", (req, res)=>{
  Article.deleteMany((err,result)=>{
    if(!err){
      res.send("All articles were deleted sucessfully!");
    }else{
      res.send(err);
    }
  });
});


app.listen(3000, ()=>{
  console.log("server working on server 3000");
});

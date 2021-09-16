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


//////////////////////////////// REQUEST TARGETING ALL ARTICLES/////////////////////
app.route("/articles")

.get((req, res) =>{
  Article.find((err,results) =>{
    if(!err){
      res.send(results);
    }else{
      res.send(err);
    }
  });
})

.post((req,res) =>{

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
})

.delete((req, res)=>{
  Article.deleteMany((err,result)=>{
    if(!err){
      res.send("All articles were deleted sucessfully!");
    }else{
      res.send(err);
    }
  });
});


//////////////////////////////// REQUEST TARGETING A SPECIFIC ARTICLE/////////////////////
// ex: localhost:3000/articles/Jack-Bauer

app.route("/articles/:articleTitle")

// aqui si yo hago ----> req.oarams.articlesTitle => "Jack-Bauer"


.get((req,res)=>{

  Article.findOne({title:req.params.articleTitle}, (err, foundArticle)=>{
    if(foundArticle){
      res.send(foundArticle);
    }else{
      res.send("no article finded.")
    }
  });
})


// CHECK THE METHOD UPDATE BECAUSE IT IS DEPRECATED
.put((req,res)=>{
  Article.update(
    {title:req.params.articleTitle},
    {title:req.body.title, content: req.body.content},
    {overwrite:true},
    function(err){
      if(!err){
        res.send("sucessfully added!");
      }
    }
  );
})

.patch((req, res) =>{
  Article.updateOne(
    {title:req.params.articleTitle},
    {$set:req.body} ,
    (err)=>{
      if(!err){
        res.send("sucessfully updated.")
      }
    }
  );
})



.delete((req,res)=>{
Article.deleteOne(
    {title:req.params.articleTitle},
    (err)=>{
      if(!err){
        res.send("sucessfully delted.")
      }
    }
  );
});


app.listen(3000, ()=>{
  console.log("server working on server 3000");
});


// //
// // /* 1 */
// {
//     "_id" : ObjectId("614237a1ba559cbbb61f1617"),
//     "title" : "REST",
//     "content" : "Rest is short for REpresentation State Transfer, It is an architectural style for designing APIs"
// }
//
// /* 2 */
// {
//     "_id" : ObjectId("5c139771d79ac8eac11e754a"),
//     "title" : "API",
//     "content" : "API stands for Application Programming Interface. It is a set of subroutine definitions, communication protocols, and tools for building software. In general terms, it is a set of clearly defined methods of communication among various components. A good API makes it easier to develop a computer program by providing all the building blocks, which are then put together by the programmer."
// }
//
// /* 3 */
// {
//     "_id" : ObjectId("5c1398aad79ac8eac11e7561"),
//     "title" : "Bootstrap",
//     "content" : "This is a framework developed by Twitter that contains pre-made front-end templates for web design"
// }
//
// /* 4 */
// {
//     "_id" : ObjectId("5c1398ecd79ac8eac11e7567"),
//     "title" : "DOM",
//     "content" : "The Document Object Model is like an API for interacting with our HTML"
// }
//
// /* 5 */
// {
//     "_id" : ObjectId("61426197d4635f6220304ee0"),
//     "title" : "jack Bauer ",
//     "content" : "Peter Pan es un niño volador que, acompañado del hada Campanilla, invita a la niña Wendy y a sus dos hermanos a visitar volando la isla de Nunca Jamás y conocer a los Niños Perdidos que viven con él, con la intención de que Wendy sea la mamá de todos ellos. ",
//     "__v" : 0
// }

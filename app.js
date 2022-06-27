const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _=require("lodash");
const mongoose=require("mongoose");
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
let posts=[];
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb+srv://shinjini03:15JUly1969$@cluster0.skobf.mongodb.net/blogDB",{useNewUrlParser:true});
//Used mongoDB atlas to permanently store and save the documents to the database 
const postSchema={
  title:String,
  content:String
};
const Post=mongoose.model("Post",postSchema);
app.get('/',function(req,res){
  Post.find({},function(err,posts){
  res.render("home",{homeContent:homeStartingContent,aboutEjsContent:aboutContent,contactEjsContent:contactContent,posts:posts});
  });
});
app.get('/about',function(req,res){
  res.render("about",{homeContent:homeStartingContent,aboutEjsContent:aboutContent,contactEjsContent:contactContent});
})
app.get('/contact',function(req,res){
  res.render("contact",{homeContent:homeStartingContent,aboutEjsContent:aboutContent,contactEjsContent:contactContent});
})
app.get('/compose',function(req,res){
  res.render("compose");
})
app.post('/compose',function(req,res){
  const post=new Post ({
  title:req.body.postTitle,
  content:req.body.postPost
  });
 post.save(function(err){
   if(!err){
 res.redirect('/');
  }
 });
});

app.get('/posts/:postId',function(req,res){
  const requestedPostId = req.params.postId;
  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });
  // const topics=_.lowerCase(req.params.topic);
  // posts.forEach(function(post){
  //   const postTitle=_.lowerCase(post.title);
  //   // const postContent=post.content;
  //   // const truncContent=postContent.substring(0,3);
  //   if (topics ==postTitle){
  //     res.render("post",
  //     {title:post.title,
  //      content:post.content
    // });
  //  }
  // });
})
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function() {
  console.log("Server has started on port 3000");
});

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const lodash = require("lodash");
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
let post = [];
const homeStartingContent = "Node.js is an open-source and cross-platform runtime environment built on Chrome’s V8 JavaScript engine for executing JavaScript code outside of a browser. You need to recollect that NodeJS isn’t a framework, and it’s not a programing language. It provides an event-driven, non-blocking (asynchronous) I/O and cross-platform runtime environment for building highly scalable server-side applications using JavaScript.Most people are confused and understand it’s a framework or a programing language. We often use Node.js for building back-end services like APIs, Web App, or Mobile App. It’s utilized in production by large companies like Paypal, Uber, Netflix, Walmart, etc.";
const aboutContent = "Hi, this is Vikas Sharma. I have created this website for the bloggers who like to post the blog content. It can be a starter blogging website for the young and futuristic bloggers.";
const contactContent = "You can contact me on my various social media handles.";
app.get("/", function(req, res) {
  res.render("home", {
    StartingContent: homeStartingContent,
    posts: post
  })
});
app.get("/about", function(req, res) {
  res.render("about", {
    About: aboutContent
  });
});
app.get("/contact", function(req, res) {
  res.render("contact", {
    Contact: contactContent
  });
});
app.get("/compose", function(req, res) {
  res.render("compose");
});
app.get("/post", function(req, res) {});
app.post("/compose", function(req, res) {
  let postobj = {};
  postobj.title = req.body.title;
  postobj.post = req.body.Post
  post.push(postobj);
  res.redirect("/");
});
app.get("/post/:topic", function(req, res) {
  for (var i = 0; i < post.length; i++) {
    if (lodash.lowerCase(req.params.topic) === lodash.lowerCase(post[i].title)) {
      res.render("post", {
        title: lodash.upperFirst(post[i].title),
        post: lodash.upperFirst(post[i].post)
      });
      break;
    }
  }
});
app.listen(process.env.PORT || 3000, function() {
  console.log("The Server is running on port 3000");
});

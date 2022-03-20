const express = require("express");
var history = require("connect-history-api-fallback");
var path = require("path");
const app = express();
app.use(history());
// Register ejs as .html. If we did
// not call this, we would need to
// name our views foo.ejs instead
// of foo.html. The __express method
// is simply a function that engines
// use to hook into the Express view
// system by default, so if we want
// to change "foo.ejs" to "foo.html"
// we simply pass _any_ function, in this
// case `ejs.__express`.
app.engine(".html", require("ejs").__express);
// Optional since express defaults to CWD/views
app.set("views", path.join(__dirname, "dist"));
// Path to our public directory
app.use(express.static(path.join(__dirname, "dist")));
// Without this you would need to
// supply the extension to res.render()
// ex: res.render('users.html').
app.set("view engine", "html");

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/xiafeng", (req, res) => {
    res.send("欢迎使用微信云托管！");
});

// // 404 处理 所要未处理的请求路径都会在这里处理
// app.use(function (req, res) {
//     res.render("index");
// });

const port = process.env.PORT || 80;
app.listen(port, () => {
    console.log("服务启动成功，端口：", port);
});

const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  // Routing
  let path = "./views/";

  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;
    case "/about-us":
      path += "about.html";
      res.statusCode = 301;
      break;
    default:
      res.statusCode = 400;
      res.setHeader("Location", "/about");
      res.end();
      break;
  }

  // send an html file
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.end(data);
    }
  });
});

server.listen(3000, "localhost", () => {
  console.log("listening on request on port 3000");
});

import  http  from "http";

const app = http.createServer((req, res) => {
    if (req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Hello, World!");
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
    }
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});
/* Importing require modules
 http : used to create the server.
 fs   : used for file system operations like reading files.
 path : Helps manage file paths and extensions
 */
const http = require("http");
const fs = require("fs");
const path = require("path");

//setting the port : The server will listen on port 3000.
const port = 3000;

/*creating the server
 req       : The request object contains information about the client's request (e.g., URL).
 res       : The response object is used to send data back to the client.
 __dirname : Refers to the current directory where the script is running.
 req.url === "/" ? "index.html" : req.url: If the request URL is / (root), serve index.html. Otherwise, serve the file specified in the URL.
 path.join : Combines the directory path and file name to create the full file path.
*/
const server = http.createServer((req, res) => {
    const filepath = path.join(
        __dirname,
        req.url === "/" ? "index.html" : req.url
    );
    console.log(filepath);
    
    
    //Determining the file type

    const extName = String(path.extname(filepath)).toLowerCase();

    //Mapping the file extensions to to MIME Types

    const mimeTypes = {
        ".html" : "text/html",
        ".css" : "text/css",
        ".js" : "text/javascript",
        ".png" : "text/png",
    };

    const contentType = mimeTypes[extName] || "application/octet-stream";

    //Reading and serving the file

    fs.readFile(filepath, (err, content) => {
        if(err) {
            if(err.code === "ENOENT") {
                res.writeHead(404, { "content-Type" : "text/html"});
                res.end("404: File Not Found Bro");
            }
        }else {
            res.writeHead(200, {"Content-Type": contentType});
            res.end(content, "utf-8");
        }
    });

});

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

// import request and file system libraries
const request = require('request');
const fs = require('fs');
// declare vars with process.argv to hold the argurments from CL
const url = process.argv[2];
const filePath = process.argv[3];
// if url or filepath is not passed in CL return error message & boot user out of loop
if (!url || !filePath) {
  console.log("Please input URL then Local File Path!");
  process.exit(1);
}
// request connection to provided url
// once connected, 3 messages will be received
request(url, (error, response, body) => {
  // if error is received, return error message from url
  if (error) {
    console.log("Failed to download resource:", error);
    return;
  }
// if status code isn't "successful connection", return status code
  if (response.statusCode !== 200) {
    console.log("Failed to download resource. Status code:", response.statusCode);
    return;
  }
// else a body should be returned and printed with filesystem function
// called writeFile which takes the file path from CL argument then
// encodes with utf8 but if no data(body) is received then error is
// returned from server and client prints failed to write... with the
// error message of the server then returns;
  fs.writeFile(filePath, body, 'utf8', (err) => {
    if (err) {
      console.log("Failed to write the file:", err);
      return;
    }
// otherwise if no error is received, console returns successful download
// message and info on how large the file size was in bytes
    console.log(`Downloaded and saved ${body.length} bytes to ${filePath}`);
  });
});
const fs = require("fs");
const inquirer = require("inquirer");
let file = "";

inquirer
  .prompt([
    {
      type: "input",
      name: "Path",
      message: "Enter the file Path"
    }
  ])
  .then((answer) => {
    console.log(answer);
    file = answer.Path;
    fs.readFile(file, "utf-8", (err, data) => {
        if (err) {
          console.error("Error Reading  File", err);
        }
        console.log("File Content", data);
        
      });
  })



const inquirer = require("inquirer");



inquirer
  .prompt([
    {
      type: "input",
      name: "username",
      message: '"Enter the UserName',
    },
  ])
  .then((answer) => {
    let api = `https://api.github.com/users/${answer.username}/events`;
    fetch(api)
      .then((response) => {
        return response.json();
      })
      .then((events) => {
        events.forEach((event) => {
          switch (event.type) {
            case "PushEvent":
              console.log(
                `-Pushed ${event.payload.commits.length} commits to ${event.repo.name}`
              );
              break;
            case "WatchEvent":
              console.log(`-Starred ${event.repo.name}`);
              break;
          
            case "ForkEvent":
              console.log(`-Forked ${event.repo.name}`);
              break;
            case "CreateEvent":
              console.log(`-Created a ${event.payload.ref_type}`);
              break;

              default:
              console.log("Errors");
              break;
          }
        });
     
      })

      .catch((err) => {
        console.error("Enter a Valid User Name ", err).message;
      });
  });

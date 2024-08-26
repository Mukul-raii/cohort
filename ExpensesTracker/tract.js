const chalk = require('chalk');
const { Command } = require("commander");
const program = new Command();
const inquirer = require("inquirer");
const log= console.log;
0
program.name("track").description("A expense tracker").version("1.0.2");
let ExpensesObj = [];
program
  .command("add <amount>  <description>")
  .description("Greet a user by name")
  .option("-e , --enthusiastic", "add an exclamation mark ")
  .action((amount, description) => {
    const expense = {
      amount: amount,
      description: description,
    };

    ExpensesObj.push(expense);

  });

program.command("view all").action(() => {
  ExpensesObj.forEach((expense, index) => {
    log(chalk.black.bgWhiteBright.bold(`${index + 1}. ${expense.description}:- $${expense.amount}`));
  });
});

program
  .command("delete <indexdel>")
  .description("Delete a expense")
  .action((indexdel) => {
    const n = indexdel - 1;
    ExpensesObj.splice(n, 1);
  });

program
  .command("update <id> <amount> <description> ")
  .description("Updating the Entry")
  .action((id, amount, description) => {
    ExpensesObj[id - 1].amount = amount;
    ExpensesObj[id - 1].description = description;
    log(chalk.blackBright.bold("Entry Updated"));
  });

program
  .command("summary view ")
  .description("summary the Entry")
  .action(() => {
    let sum = 0;
    ExpensesObj.forEach((expense, index) => {
      sum = parseInt(expense.amount) + sum;
      return sum;
    });
    console.log("Total Expenses:", sum);
  });

async function mainloop() {
  while (true) {
    const anwer = await inquirer.prompt([
      {
        type: "input",
        name: "Cmd",
        message: chalk.red.bold("Enter a Command "),
        log:"asdg"
      },
    ]);
    const commandInput = anwer.Cmd.trim();

    if (!commandInput) {
      console.log("no  command entered");
      continue;
    }
    const argv = commandInput.split(" ");

    try {
      await program.parseAsync([...argv], { from: "user" });
    } catch (err) {
      console.error("error executing ", err.message);
    }
  }
}

mainloop();

const { Command } = require("commander");
const { log } = require("console");
const inquirer = require("inquirer");
const { default: Choices } = require("inquirer/lib/objects/choices");
const { type } = require("os");
const program = new Command();

program
  .name("GuessTheNumber")
  .description("Guess th number in given chances")
  .version("1.0");

async function Main(params) {
  console.log("Welcome To Number Guessing Game");
  console.log(
    "Rules:- \n      1.Chose Difficulty Level \n      2.Guess in the given chances"
  );

  const answer = await inquirer.prompt([
    {
      type: "list",
      name: "level",
      message: "Difficulty level",
      choices: ["easy", "medium", "difficult"],
    },
  ]);

  const level = answer.level;

  let chances = 0;
let defaultChances=0
  switch (level) {
    case "easy":
     defaultChances= chances = 10 ;
      break;

    case "medium":
    defaultChances=  chances = 5;
      break;
    case "difficult":
    defaultChances=  chances = 3;
      break;

    default:
      break;
  }
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const randomnumber = getRandomNumber(1, 100);

  console.log(
    `Great! You have selected the ${level} level\nLet's start the game!`
  );

  while (chances > 0) {
  
    const inputGuess = await inquirer.prompt([
      {
        type: "input",
        name: "guess",
        message: "Enter Your guess: ",
      },
    ]);
    const guess = parseInt(inputGuess.guess);
    console.log(guess);
    
    if (guess == randomnumber) {

      console.log(
        `Congratulation! You guessed the correct number in ${defaultChances-chances} attempt`
    );
    return;
    } 

    else {
      if (guess > randomnumber) {
        console.log(`Incorrect! The number is less than ${guess}`);
      } else{
        console.log(`Incorrect! The number is greater than ${guess}`);
      }

      chances--;
      console.log(`Chances left ${chances}`);
      

    }
  }
console.log(`Game over! The correct number was ${randomnumber}.`);

}
Main();

const fs = require('fs').promises
const inquirer = require('inquirer')
const generateMarkdown = require('./utils/generateMarkdown');
const validate = require('./utils/validationFunctions')

const questions = {
  title: "What is the title of your project?",
  // Description
    description: "What does your project do or what problem does it solve?",
  // License
    license: "What license do you want your project under?",
  // Installation
    installation: "What are the steps required to install your project?",
  // Usage
    usage: "How do you use your project?",
    screenshotCount: "How many screenshot do you want to include?",
    // Screenshot 1
      screenshotPath: "What is the path to your screenshot?",
  // Credits
    peopleCount: "How many people did you collaborate with?",
    // Person 1
      peopleName: "What is their name?",
      peopleLink: "What is the link to their github profile?",
    resourceCount: "How many resources did you use?",
    // Resource 1
      resourceName: "What is the name of this resource?",
      resourceLink: "What is the link to this resource?",
  // Tests
    tests: "How can someone test your project?",
  // Issues/Questions
    issues: "How can someone report an issue or ask a question?",
    github: "What is your github username?",
    email: "What is your email?",
  // Contributing
    contributing: "How can someone contribute to your project?",
};

const licenses = [
  'Apache License 2.0',
  'GNU General Public License v3.0',
  'MIT License',
  'BSD 2-Clause "Simplified" License',
  'BSD 3-Clause "New" or "Revised" License',
  'Boost Software License 1.0',
  'Create Commons Zero v1.0 Universal',
  'Eclipse Public License 2.0',
  'GNU Affero General Public License v3.0',
  'GNU General Public License v2.0',
  'GNU Lesser General Public License v2.1',
  'Mozilla Public License 2.0',
  'The Unlicense'
]

async function writeToFile(fileName, data) {
  try{
    await fs.writeFile(fileName, data)
  }catch(error){
    console.log("Error writing to file: " + error)
  }
}

async function askQuestion(question, answerName, validationFunction){
  return new Promise((resolve, reject) => {
    inquirer.prompt([
      {
        type: 'input',
        name: answerName,
        message: question,
        validate: validationFunction,
      }
    ])
    .then(answer => {resolve(answer)})
    .catch(error => {reject(error)})
  })
}

async function askListQuestion(question, list, answerName){
  return new Promise((resolve, reject) => {
    inquirer.prompt([
      {
        type: 'rawlist',
        name: answerName,
        message: question,
        choices: list
      }
    ])
    .then(answer => {resolve(answer)})
    .catch(error => {reject(error)})
  })
}

(async function init() {
  // Ask questions and put answerers in an answerers object
    let answers = {}
    let locationAnswer = await askQuestion("Where would you like your README.md file to be stored?", "location", validate.textInput)
    let location = locationAnswer.location
    if(location.charAt(location.length) !== "/"){
      location += "/"
    }

    answers = {...answers, ...await askQuestion(questions.title, "title", validate.textInput)}
    // Description
      answers = {...answers, ...await askQuestion(questions.description, "description", validate.textInput)}
    // License
      answers = {...answers, ...await askListQuestion(questions.license, licenses, "license")}
    // Installation
      answers = {...answers, ...await askQuestion(questions.installation, "installation", validate.textInput)}
    // Usage
      answers = {...answers, ...await askQuestion(questions.usage, "usage", validate.textInput)}
      answers = {...answers, ...await askQuestion(questions.screenshotCount, "screenshotCount", validate.intInput)}
      for(let i=0; i < parseInt(answers.screenshotCount); i++){
        console.log(`Screenshot ${i+1}:`)
        answers = {...answers, ...await askQuestion(questions.screenshotPath, `screenshotPath${i}`, validate.textInput)}
      }
    // Credits
      answers = {...answers, ...await askQuestion(questions.peopleCount, "peopleCount", validate.intInput)}
      for(let i=0; i < parseInt(answers.peopleCount); i++){
        console.log(`Person ${i+1}:`)
        answers = {...answers, ...await askQuestion(questions.peopleName, `peopleName${i}`, validate.textInput)}
        answers = {...answers, ...await askQuestion(questions.peopleLink, `peopleLink${i}`, validate.linkInput)}
      }
      answers = {...answers, ...await askQuestion(questions.resourceCount, "resourceCount", validate.intInput)}
      for(let i=0; i < parseInt(answers.resourceCount); i++){
        console.log(`Resource ${i+1}:`)
        answers = {...answers, ...await askQuestion(questions.resourceName, `resourceName${i}`, validate.textInput)}
        answers = {...answers, ...await askQuestion(questions.resourceLink, `resourceLink${i}`, validate.linkInput)}
      }
    // Tests
      answers = {...answers, ...await askQuestion(questions.tests, "tests", validate.textInput)}
    // Issues/Questions
      answers = {...answers, ...await askQuestion(questions.issues, "issues", validate.textInput)}
      answers = {...answers, ...await askQuestion(questions.github, "github", validate.textInput)}
      answers = {...answers, ...await askQuestion(questions.email, "email", validate.emailInput)}
    // Contributing
      answers = {...answers, ...await askQuestion(questions.contributing, "contributing", validate.textInput)}
  // Send answerers object to markdown generator
    const markdownReadme = generateMarkdown(answers)
  // Write markdown data to file
    await writeToFile(`${location}README.md`, markdownReadme)
})()
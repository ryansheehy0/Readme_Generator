//Todo: Input lists
//Todo: autocomplete filepaths

const fs = require('fs').promises
const inquirer = require('inquirer')
const {generateMarkdown} = require('./utils/generateMarkdown');
const validate = require('./utils/validationFunctions')

const questions = {
  title: "What is the title of your project?",
  // Description
    motivation: "What was your motivation for creating this project?",
    reasons: "What problem does your project solve and why did you build it?",
    learned: "What did you learn from this project?",
  // Installation
    installation: "What are the steps required to install your project?",
  // Usage
    usage: "How do you use your project?",
    screenshotCount: "How many screenshot do you want to include?",
    // Screenshot 1
      screenshotPath: "What is the path to your screenshot?",
  // Credits
    peopleCount: "How many people did you collaborated with?",
    // Person 1
      peopleName: "What is their name?",
      peopleLink: "What is the link to their github profile?",
    resourceCount: "How many resources did you use?",
    // Resource 1
      resourceName: "What is the name of this resource?",
      resourceLink: "What is the link to this resource?",
  // Issues
    issues: "How can you report an issue?",
  // Contributing
    contributing: "How can someone else contribute to this project?",
  // License
    license: "What license is your project under?"
};

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

(async function init() {
  // Ask questions and put answerers in an answerers object
    let answers = {}

    answers = {...answers, ...await askQuestion(questions.title, "title", validate.textInput)}
    // Description
      answers = {...answers, ...await askQuestion(questions.motivation, "motivation", validate.textInput)}
      answers = {...answers, ...await askQuestion(questions.reasons, "reasons", validate.textInput)}
      answers = {...answers, ...await askQuestion(questions.learned, "learned", validate.textInput)}
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
    // Issues
      answers = {...answers, ...await askQuestion(questions.issues, "issues", validate.textInput)}
    // Contributing
      answers = {...answers, ...await askQuestion(questions.contributing, "contributing", validate.textInput)}
    // License
      answers = {...answers, ...await askQuestion(questions.license, "license", validate.textInput)}

    console.log(answers)
  // Send answerers object to markdown generator
  // Write markdown data to file
})()
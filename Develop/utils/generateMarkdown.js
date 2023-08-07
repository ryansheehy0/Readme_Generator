// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
 if(license === ""){
    return ""
  }
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
 if(license === ""){
    return ""
  }
}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  if(license === ""){
    return ""
  }
}

function generateMarkdown(data){
  // Get markdown screenshots
  let screenshots = ""
  for(let i=0; i < parseInt(data.screenshotCount); i++){
    screenshots += `[screenshot ${i}](${data[`screenshotPath${i}`]})\n`
  }

  // Get markdown people references
  let people = ""
  for(let i=0; i < parseInt(data.peopleCount); i++){
    people += `- [${data[`peopleName${i}`]}](${data[`peopleLink${i}`]})\n`
  }

  // Get markdown resources references
  let resources = ""
  for(let i=0; i < parseInt(data.resourceCount); i++){
    resources += `- [${data[`resourceName${i}`]}](${data[`resourceLink${i}`]})\n`
  }

  return `# ${data.title}

## Description
  ${data.description}

## Installation
  ${data.installation}

## Usage
  ${data.usage}
  ${screenshots}

## Credits

### People
${people}

### Resources
${resources}

## Issues
  ${data.issues}

## Contributing
  ${data.contributing}

## License
  ${data.license}`}

module.exports = generateMarkdown;
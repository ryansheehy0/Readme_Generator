function renderLicenseBadge(license) {
  if(license === ""){return ""}
  // Convert string to array
  const licenseArray = [...license]
  // Replace spaces with underscores
  let noSpaceLicenseArray = licenseArray.map((letter) => {
    if(letter == " "){
      return "_"
    }
    return letter
  })
  // Convert array to string
  const noSpaceLicense = noSpaceLicenseArray.join('')
  // Return badge
  return `https://img.shields.io/badge/${noSpaceLicense}-blue`
}

function renderLicenseLink(license) {
  if(license === ""){return ""}
  switch (license) {
    case 'Apache License 2.0':
      return 'https://choosealicense.com/licenses/apache-2.0/'
    case 'GNU General Public License v3.0':
      return 'https://choosealicense.com/licenses/gpl-3.0/'
    case 'MIT License':
      return 'https://choosealicense.com/licenses/mit/'
    case 'BSD 2-Clause "Simplified" License':
      return 'https://choosealicense.com/licenses/bsd-2-clause/'
    case 'BSD 3-Clause "New" or "Revised" License':
      return 'https://choosealicense.com/licenses/bsd-3-clause/'
    case 'Boost Software License 1.0':
      return 'https://choosealicense.com/licenses/bsl-1.0/'
    case 'Create Commons Zero v1.0 Universal':
      return 'https://choosealicense.com/licenses/cc0-1.0/'
    case 'Eclipse Public License 2.0':
      return 'https://choosealicense.com/licenses/epl-2.0/'
    case 'GNU Affero General Public License v3.0':
      return 'https://choosealicense.com/licenses/agpl-3.0/'
    case 'GNU General Public License v2.0':
      return 'https://choosealicense.com/licenses/gpl-2.0/'
    case 'GNU Lesser General Public License v2.1':
      return 'https://choosealicense.com/licenses/lgpl-2.1/'
    case 'Mozilla Public License 2.0':
      return 'https://choosealicense.com/licenses/mpl-2.0/'
    case 'The Unlicense':
      return 'https://choosealicense.com/licenses/unlicense/'
  }
}

function renderLicenseSection(license) {
  if(license === ""){return ""}
  const badgeLink = renderLicenseBadge(license)
  const link = renderLicenseLink(license)
  return `[![${license}](${badgeLink})](${link})`
}

function generateMarkdown(data){
  const description = data.description === "" ? "" : `\n## Description\n${data.description}`
  const installation = data.installation === "" ? "" : `\n## Installation\n${data.installation}`
  const usage = data.usage === "" ? "" : `\n## Usage\n${data.usage}`
  // Get markdown screenshots
  let screenshots = ""
  for(let i=0; i < parseInt(data.screenshotCount); i++){
    screenshots += `\n[screenshot ${i}](${data[`screenshotPath${i}`]})`
  }

  // Should there be any credits?
  let credits = ""
    let people = ""
    let resources = ""
  const peopleCount = parseInt(data.peopleCount)
  const resourceCount = parseInt(data.resourceCount)
  if(peopleCount !== 0 || resourceCount !== 0){
    credits = "\n## Credits"
      people = "\n### People"
      resources = "\n### Resources"
  }

    // Get markdown people references
    for(let i=0; i < peopleCount; i++){
      people += `\n- [${data[`peopleName${i}`]}](${data[`peopleLink${i}`]})`
    }

    // Get markdown resources references
    for(let i=0; i < resourceCount; i++){
      resources += `\n- [${data[`resourceName${i}`]}](${data[`resourceLink${i}`]})`
    }

  const issues = data.issues === "" ? "" : `\n## Issues\n${data.issues}`
  const contributing = data.contributing === "" ? "" : `\n## Contributing\n${data.contributing}`
  const license = data.license === "" ? "" : `\n## License\n${renderLicenseSection(data.license)}`

  return `# ${data.title}${description}${installation}${usage}${screenshots}${credits}${people}${resources}${issues}${contributing}${license}`
}

module.exports = generateMarkdown;
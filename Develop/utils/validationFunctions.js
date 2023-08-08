// These files validate the user's inputs
module.exports = {
  textInput: textInput,
  intInput: intInput,
  linkInput: linkInput,
  emailInput: emailInput,
}

function textInput(input){
  return true
}

// This function makes sure the user inputted an integer
function intInput(input){
  const numberInput = parseInt(input)
  if(isNaN(numberInput) || !Number.isInteger(numberInput)){
    return "Please enter a valid integer."
  }
  return true
}

// This function makes sure the user inputted a valid link
function linkInput(input){
  const linkPattern = /^http.*:\/\/.+/gm
  if(!input.match(linkPattern)){
    return "Please enter a link starting with http(s)."
  }
  return true
}

// This function makes sure the user inputted a valid email
function emailInput(input){
  const emailPattern = /^.+@.+\..{2,}/gm
  if(!input.match(emailPattern)){
    return "Please enter a valid email address."
  }
  return true
}
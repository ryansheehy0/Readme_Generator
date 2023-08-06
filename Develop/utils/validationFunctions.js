module.exports = {
  textInput: textInput,
  intInput: intInput,
  linkInput: linkInput,
}

function textInput(input){
  return true
}

function intInput(input){
  const numberInput = parseInt(input)
  if(isNaN(numberInput) || !Number.isInteger(numberInput)){
    return "Please enter a valid integer."
  }
  return true
}

function linkInput(input){
  const linkPatter = /^http.*:\/\/.+/gm
  if(!input.match(linkPatter)){
    return "Please enter a link starting with http(s)."
  }
  return true
}
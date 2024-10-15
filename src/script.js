//app should generate random password when user clicks on generate button
//character length should vary if user changes length variable
//if user has not checked any option display error


//app should be able to determine passowrd stregth
const clipBoardIcon = document.querySelector('.icon');
const characterLengthContainer = document.querySelector('.Characters-length');
const passwordContainer = document.querySelector('.password');
const inputRange = document.querySelector('#input-range');
const checkBoxes = document.querySelectorAll('#checkBox');
const levelIndicators = document.querySelectorAll('.level');
const generateButton = document.querySelector('.generate-button');
let passwordLength = undefined;
let password = '';
let chosenCharacters = [];
// const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz'.split('');
// const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
// const numbers = '0123456789'.split('');
// const symbols = '!@#$%^&*()_+[]{}|;:,.<>?'.split('');
const passwordCharacters = {
  uppercase: 'abcdefghijklmnopqrstuvwxyz'.split(''),
  lowercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
  numbers: '0123456789'.split(''),
  symbols: '!@#$%^&*()_+[]{}|;:,.<>?'.split(''),
};
function detectPasswordLength() {
  characterLengthContainer.textContent = inputRange.value;
  passwordLength = Number(inputRange.value);
}
function getRandomCharacters(idx){
  const array = new Uint8Array(chosenCharacters.length);
  const randomValues = crypto.getRandomValues(array);
  const randomValue = randomValues[0] / 255;
  const passwordCharactersSet = chosenCharacters[idx];
  const randomIndex = Math.floor(randomValue * ((passwordCharactersSet.length-2) - 0 + 1) + 0);
  password += passwordCharactersSet[randomIndex];
}
function displayPassWord(){
  passwordContainer.textContent = password;
}
function copyText(){
  navigator.clipboard.writeText(passwordContainer.textContent);
}
function colorizeLevelIndicators(levels,color){
   for(let i = 0; i < levels; i++){
     levelIndicators[i].style.backgroundColor = color;
   }
}
function evaluateStrength(passwordStrength){
  console.log(passwordStrength)
  switch(passwordStrength){
    case 0:
      colorizeLevelIndicators(passwordStrength+1,'#F64A4A;');
      break;
    case 1:
      colorizeLevelIndicators(passwordStrength+1,'#FB7C58');
      break;
    case 2:
      colorizeLevelIndicators(passwordStrength+1,'#F8CD65');
      break;
    default:
      colorizeLevelIndicators(levelIndicators.length,'#A4FFAF');
  }
}
function generatePassword() {
  //generate initial password based on checkbox statuses
  //add random symbols till password reaches passwordLength
  //link checked checkboxed to sets defined in initial variables then construct central variable from which will be consturcted passwrod
  password = '';
  chosenCharacters = [];
  checkBoxes.forEach((checkBox) => {
    if (checkBox.checked)
      chosenCharacters.push(
        passwordCharacters[checkBox.dataset.checkboxtype]
      );
  });
  if (chosenCharacters.length === 0) {
    alert('Include at least one character set');
    return;
  }
  for (let i = 0; i < chosenCharacters.length; i++) {
    getRandomCharacters(i);
  }
  for (let i = password.length; i < passwordLength; i++) {
    const array = new Uint8Array(chosenCharacters.length);
    const randomValues = crypto.getRandomValues(array);
    const randomValue = randomValues[0] / 255;
    const randomIndex = Math.floor(randomValue * ((chosenCharacters.length-2) - 0 + 1) + 0);
    getRandomCharacters(randomIndex);
  }
  password = _.shuffle(password.split('')).join('');
  const passwordStrength = zxcvbn(password).score;
  evaluateStrength(passwordStrength);
  displayPassWord();
}
clipBoardIcon.addEventListener('click',copyText)
inputRange.addEventListener('change', detectPasswordLength);
generateButton.addEventListener('click', generatePassword);
detectPasswordLength();

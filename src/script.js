//app should generate random password when user clicks on generate button
//character length should vary if user changes length variable
//if user has not checked any option display error

//app should be able to determine passowrd stregth
const clipBoardIcon = document.querySelector('.icon');
const characterLengthContainer = document.querySelector('.Characters-length');
const inputRange = document.querySelector('#input-range');
const checkBoxes = document.querySelectorAll('#checkBox');
const levelIndicators = document.querySelectorAll('.level');
const generateButton = document.querySelector('.generate-button');
let passwordLength = undefined;
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

function generatePassword() {
  //generate initial password based on checkbox statuses
  //add random symbols till password reaches passwordLength
  //link checked checkboxed to sets defined in initial variables then construct central variable from which will be consturcted passwrod
 
  let password = '';
  const chosenCharacters = [];
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
    const array = new Uint8Array(chosenCharacters.length);
    const randomValues = crypto.getRandomValues(array);
    const randomValue = randomValues[0] / 255;
    const randomCharacterIndex = Math.floor(randomValue * ((chosenCharacters.length-1) - 0 + 1) + 0);
    const passwordCharactersSet = chosenCharacters[randomCharacterIndex];
    console.log(randomCharacterIndex)

    const randomIndex = Math.floor(randomValue * ((passwordCharactersSet.length-1) - 0 + 1) + 0);
    password += passwordCharactersSet[randomIndex];
  }
  console.log(password)
  return password;
}
inputRange.addEventListener('change', detectPasswordLength);
generateButton.addEventListener('click', generatePassword);
detectPasswordLength();

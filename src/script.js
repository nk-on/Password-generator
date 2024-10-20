import evaluateStrength from './levelindicators.js';
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
function generateRandomValue(num) {
  const array = new Uint8Array(num);
  const randomValues = crypto.getRandomValues(array);
  const randomValue = randomValues[0] / 255;
  return randomValue;
}
function getRandomCharacters(idx) {
  const randomValue = generateRandomValue(chosenCharacters.length);
  const passwordCharactersSet = chosenCharacters[idx];
  const randomIndex = Math.floor(
    randomValue * (passwordCharactersSet.length - 2 - 0 + 1) + 0
  );
  password += passwordCharactersSet[randomIndex];
}
function displayPassWord() {
  passwordContainer.textContent = password;
}
function copyText() {
  navigator.clipboard.writeText(passwordContainer.textContent);
}
function generatePassword() {
  password = '';
  chosenCharacters = [];
  checkBoxes.forEach((checkBox) => {
    if (checkBox.checked)
      chosenCharacters.push(passwordCharacters[checkBox.dataset.checkboxtype]);
  });
  if (chosenCharacters.length === 0) {
    alert('Include at least one character set');
    return;
  }
  for (let i = 0; i < chosenCharacters.length; i++) {
    getRandomCharacters(i);
  }
  for (let i = password.length; i < passwordLength; i++) {
    const randomValue = generateRandomValue(chosenCharacters.length);
    const randomIndex = Math.floor(
      randomValue * (chosenCharacters.length - 2 - 0 + 1) + 0
    );
    getRandomCharacters(randomIndex);
  }
  password = _.shuffle(password.split('')).join('');
  const passwordStrength = zxcvbn(password).score;
  evaluateStrength(passwordStrength);
  displayPassWord();
}
clipBoardIcon.addEventListener('click', copyText);
inputRange.addEventListener('change', detectPasswordLength);
generateButton.addEventListener('click', generatePassword);
detectPasswordLength();
export default levelIndicators;

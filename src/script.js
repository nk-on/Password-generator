//app should generate random password when user clicks on generate button
//character length should vary if user changes length variable
//if user has not checked any option display error
//app should be able to determine passowrd stregth
const clipBoardIcon = document.querySelector('.icon');
const characterLengthContainer = document.querySelector('.Characters-length');
const inputRange = document.querySelector('#input-range')
const checkBoxes = document.querySelectorAll('#checkBox');
const levelIndicators = document.querySelectorAll('.level');
const generateButton = document.querySelector('.generate-button');
function detectPasswordLength(){
    characterLengthContainer.textContent = inputRange.value;
};
inputRange.addEventListener('change',detectPasswordLength);
detectPasswordLength();
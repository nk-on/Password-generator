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
let passwordLength = undefined;
// const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz'.split('');
// const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
// const numbers = '0123456789'.split('');
// const symbols = '!@#$%^&*()_+[]{}|;:,.<>?'.split('');
const passwordMaterials = {
    uppercase:'abcdefghijklmnopqrstuvwxyz'.split(''),
    lowercase:'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
    numbers:'0123456789'.split(''),
    symbols:'!@#$%^&*()_+[]{}|;:,.<>?'.split(''),
}
function detectPasswordLength(){
    characterLengthContainer.textContent = inputRange.value;
    passwordLength = Number(inputRange.value);
};

function generatePassword(){
    //generate initial password based on checkbox statuses 
    //add random symbols till password reaches passwordLength
    //link checked checkboxed to sets defined in initial variables then construct central variable from which will be consturcted passwrod
    let password = '';
    const chosenPasswordMaterials = []
    checkBoxes.forEach((checkBox)=>{
        if(checkBox.checked) chosenPasswordMaterials.push(passwordMaterials[checkBox.dataset.checkboxtype]);
    });
    console.log(chosenPasswordMaterials)
    for(let i = 0; i < chosenPasswordMaterials.length; i++){
        const array = new Uint8Array(chosenPasswordMaterials.length);  
        const randomValues = crypto.getRandomValues(array);
        const randomValue = randomValues[0] / 255;
        const randomIndex =  Math.floor(randomValue * (passwordLength - 1 + 1) + 1);
        const passwordMaterialSet = chosenPasswordMaterials[i];
        password+=passwordMaterialSet[randomIndex]
    }
    console.log(password)
    return password
}
inputRange.addEventListener('change',detectPasswordLength);
generateButton.addEventListener('click',generatePassword)
detectPasswordLength();
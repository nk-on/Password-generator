import levelIndicators from "./script.js";
const levelContainer = document.querySelector('.level-container');
function displayLevel(color,level){
  levelContainer.textContent = level;
  levelContainer.style.color = color;
}
function colorizeLevelIndicators(levels,color,level){
    for(let i = 0; i < levels; i++){
      levelIndicators[i].style.backgroundColor = color;
    }
    for(let i = levels; i < levelIndicators.length; i++){
     levelIndicators[i].style.backgroundColor = ' #08070B';
    }
    displayLevel(color,level);
 }
 function evaluateStrength(passwordStrength){
   switch(passwordStrength){
     case 0:
       colorizeLevelIndicators(passwordStrength+1,'#F64A4A','Too weak');
       break;
     case 1:
       colorizeLevelIndicators(passwordStrength+1,'#FB7C58','Weak');
       break;
     case 2:
       colorizeLevelIndicators(passwordStrength+1,'#F8CD65','Medium');
       break;
     default:
       colorizeLevelIndicators(levelIndicators.length,'#A4FFAF','Strong');
   }
 }
 export default evaluateStrength
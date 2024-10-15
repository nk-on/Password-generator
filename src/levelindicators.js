import levelIndicators from "./script.js";
function colorizeLevelIndicators(levels,color){
    for(let i = 0; i < levels; i++){
      levelIndicators[i].style.backgroundColor = color;
    }
    for(let i = levels; i < levelIndicators.length; i++){
     levelIndicators[i].style.backgroundColor = ' #08070B';
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
 export default evaluateStrength
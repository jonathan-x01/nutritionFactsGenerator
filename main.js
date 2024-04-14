const Nutrients = {
  added_sugars : {
    id : "ADDED_SUGARS",
    default : true,
    value : 50,
    unit : "g"
  },
  biotin : {
    value : 30,
    unit : "mcg"
  },
  calcium : {
    id : "CALCIUM",
    default : true,
    value : 1300,
    unit : "mg"
  },
  chloride : {
    value : 2300,
    unit : "mg"
  },
  choline : {
    value : 550,
    unit : "mg"
  },
  cholesterol : {
    id : "CHOLESTEROL",
    default : true,
    value : 300,
    unit : "mg"
  },
  chromium : {
    value : 35,
    unit : "mcg"
  },
  copper : {
    value : 0.9,
    unit : "mg"
  },
  dietary_fiber : {
    id : "DIETARY_FIBER",
    default : true,
    value : 28,
    unit : "g"
  },
  fat : {
    id : "TOTAL_FAT",
    default : true,
    calories : 9,
    value : 78,
    unit : "g"
  },
  folate_folic_Acid : {
    value : 400,
    unit : "mcg"
  },
  iodine : {
    value : 150,
    unit : "mcg"
  },
  iron : {
    id : "IRON",
    default : true,
    value : 18,
    unit : "mg"
  },
  magnesium : {
    value : 420,
    unit : "mg"
  },
  manganese : {
    value : 2.3,
    unit : "mg"
  },
  molybdenum : {
    value : 45,
    unit : "mcg"
  },
  niacin : {
    value : 16,
    unit : "mg"
  },
  pantothenic_acid : {
    value : 5,
    unit : "mg"
  },
  phosphorus : {
    value : 1250,
    unit : "mg"
  },
  potassium : {
    id : "POTASSIUM",
    default : true,
    value : 4700,
    unit : "mg"
  },
  protein : {
    id : "PROTEIN",
    default : true,
    calories : 4,
    value : 50,
    unit : "g"
  },
  riboflavin : {
    value : 1.3,
    unit : "mg"
  },
  saturated_fat : {
    id : "SATURATED_FAT",
    default : true,
    value : 20,
    unit : "g"
  },
  selenium : {
    value : 55,
    unit : "mcg"
  },
  sodium : {
    id : "SODIUM",
    default : true,
    value : 2300,
    unit : "mg"
  },
  thiamin : {
    value : 1.2,
    unit : "mg"
  },
  total_carbohydrate : {
    id : "TOTAL_CARBS",
    default : true,
    calories : 4,
    value : 275,
    unit : "g"
  },
  vitamin_a : {
    value : 900,
    unit : "mcg"
  },
  vitamin_b6 : {
    value : 1.7,
    unit : "mg"
  },
  vitamin_b12 : {
    value : 2.4,
    unit : "mcg"
  },
  vitamin_c : {
    value : 90,
    unit : "mg"
  },
  vitamin_d : {
    id : "VITAMIN_D",
    default : true,
    value : 20,
    unit : "mcg"
  },
  vitamin_e : {
    value : 15,
    unit : "mg"
  },
  vitamin_k : {
    value : 120,
    unit : "mcg"
  },
  zinc : {
    value : 11,
    unit : "mg"
  }
}

function percentageOfDailyValue(value, dailyValue){
  return Math.round(value / dailyValue * 100);
}

function calculateCalories(){
  const addedCals = Number.parseInt(document.querySelector("[name=added-calories]").value);
  const calories = document.getElementById("NUM_CALORIES");
  let output = 0;
  for (a in getNutrientsWithCalories()){
    const nutrient = getNutrientsWithCalories()[a];
    const label = document.getElementById(nutrient.id);
    if (label){
      const labelValue = label.getAttribute("value");
      if (labelValue){
        output += labelValue * nutrient.calories;
      }
    }
  }
  calories.innerHTML = output + addedCals;
}

function calculateParentVitamin(vitamin){
  const parent = `.${vitamin}-parent`;
  const calc = `.${vitamin}-calc`;
  const nutrient = Nutrients[vitamin];
  const calcAll = document.querySelectorAll(calc);
  const vitaminValue = document.querySelector(parent).querySelector(".vitamin-value");
  let output = 0;
  for (let i = 0; i < calcAll.length; i++){
    const calcs = calcAll[i];
    output += Number.parseInt(calcs.value);
  }
  changeNutritionValue(output,vitamin,vitamin);
  calculateCalories();
}

function getNutrientsWithCalories(){
  let output = new Object();
  for (i in Nutrients){
    nutrient = Nutrients[i];
    if (nutrient.calories){
      output[i] = nutrient;
    }
  }
  return output;
}

// If status is true, it will return all default nutrients,
// if not then it will return all optional nutrients
function getDefaultNutrients(status){
  let output = new Object();
  for (i in Nutrients){
    nutrient = Nutrients[i];
    if (nutrient.default && status){
      output[i] = nutrient;
    } else if (!nutrient.default && !status){
      output[i] = nutrient;
    }
  }
  return output;
}

function getNutritionValue(nutrient){
  const label = document.getElementById(Nutrients[nutrient]);
  return label.getAttribute("value");
}

function changeNutritionValue(element, nutrient, id){
  let value;
  if (typeof element === "object"){
    value = Number.parseInt(element.value);
  } else {
    value = element;
  }
  const nutr = Nutrients[nutrient];
  let label, percentage;
  if (nutr){
    label = document.getElementById(nutr.id);
    percentage = label.querySelector(".percentage");
  } else {
    label = document.getElementById(id)
  }

  const vitVal = label.querySelector(".vitamin-value");

  label.setAttribute("value",value);
  if (nutr){
    if (percentage){
      percentage.innerHTML = `${percentageOfDailyValue(value, nutr.value)}%`;
    }
    vitVal.innerHTML = `${value}${nutr.unit}`;
  } else {
    vitVal.innerHTML = value.toString() + "g";
  }
}

function changeValue(element, id){
  document.getElementById(id).innerHTML = Number.parseInt(element.value);
}

var inputs = document.getElementsByTagName("input");

let shiftKey = false;
let ctrlKey = false;

function setKeys(e){
  shiftKey = e.shiftKey;
  ctrlKey = e.ctrlKey;
}

// Checks to see if the shift key or ctrl key was pressed down
window.addEventListener("keydown",(e) => {
  setKeys(e);
})

window.addEventListener("keyup",(e) => {
  setKeys(e);
})

// Draggable Number Changer
// Loops through all the input fields
for (let i = 0; i < inputs.length; i++){
  // Converts
  let input = inputs[i];
  // Is the input currently selected.
  let inputSelected = false;
  // The position of the cursor X when first dragged.
  let cursorStart;
  let cursorCurrent;
  let cursorPrevious;

  // Checks to see if the user clicks their mouse on an input.
  input.addEventListener("mousedown",(e) => {
    // Changes body style of cursor to the resize.
    document.body.style.cursor = "e-resize";
    // Sets the cursor start.
    cursorStart = e.clientX;
    // Sets the input selected to true.
    inputSelected = true;
  });

  // Checks to see if the user starts moving the mouse.
  document.body.addEventListener("mousemove",(e) => {
    // Checks to see if the user has the input selected.
    if (inputSelected){
      // Sets the current cursor.
      cursorCurrent = e.clientX;

      // Current < previous = Cursor going left.
      // Current >= previous = Cursor going right.
      let distance;
      let distanceStart = 1;
      if (ctrlKey){
        distanceStart *= 4;
      }

      if (cursorCurrent >= cursorPrevious){
        distance = Math.round(distanceStart);
      } else {
        distance = Math.round(-distanceStart);
      }
      input.value = Number.parseInt(input.value) + distance;
      eval(input.getAttribute("oninput").replaceAll(/this/g,`document.getElementsByTagName('input')[${i}]`));
      cursorPrevious = e.clientX;
    }
  });

  document.body.addEventListener("mouseup",(e) => {
    if (inputSelected){
      document.body.style.cursor = "";
      inputSelected = false;
    }
  });
}

// Still in a work of progress
/*panZoomInstance.on('transform',() => {
  localStorage.setItem("table-transform",table.getAttribute("style"));
})

table.setAttribute("style",localStorage.getItem("table-transform"));*/

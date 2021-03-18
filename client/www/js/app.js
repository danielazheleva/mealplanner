
window.onload = function() {
  generateTable();
  createInputBox();
};

// DRAG DROP CARDS IN TABLE

function onDragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
}

function onDragOver(event) {
  event.preventDefault();
}

function onDrop(event) {
  const id = event.dataTransfer.getData("text");
  const draggableElement = document.getElementById(id);

  const dropzone = event.target;        
  const day = event.target.id.split("-")[0]; 

  const proteinFromRecipe = document.getElementById(id+"-protein");
  const carbsFromRecipe = document.getElementById(id+"-carbs");
  const fatFromRecipe = document.getElementById(id+"-fat");
  const kcalFromRecipe = document.getElementById(id+"-kcal");
  dropzone.appendChild(draggableElement);

  combineMacros(day, proteinFromRecipe, carbsFromRecipe, fatFromRecipe, kcalFromRecipe);
  event.dataTransfer.clearData();
}

async function combineMacros(day, prt, crb, fat, kcal) {
  const proteinDestination = document.getElementById(day + "-prt");
  const carbsDestination = document.getElementById(day + "-crb");
  const fatDestination = document.getElementById(day + "-fat");
  const kcalDestination = document.getElementById(day + "-cal");

  const proteinCurrentValue = proteinDestination.innerText;
  const carbCurrentValue = carbsDestination.innerText;
  const fatCurrentValue = fatDestination.innerText;
  const kcalCurrentValue = kcalDestination.innerText;

  proteinCurrentValue === "" ? proteinDestination.innerText = prt.innerText : proteinDestination.innerText = parseInt(proteinCurrentValue) + parseInt(prt.innerText);
  carbCurrentValue === "" ? carbsDestination.innerText = crb.innerText : carbsDestination.innerText = parseInt(carbCurrentValue) + parseInt(crb.innerText);
  fatCurrentValue === "" ? fatDestination.innerText = fat.innerText : fatDestination.innerText = parseInt(fatCurrentValue) + parseInt(fat.innerText);
  kcalCurrentValue === "" ? kcalDestination.innerText = kcal.innerText : kcalDestination.innerText = parseInt(kcalCurrentValue) + parseInt(kcal.innerText);

}

// Display shopping list in UI
function showShoppingList(ingredients) {
  const shopListUl = getShoppingListBox();

  ingredients.forEach((ing) => {
    const ingredientLi = document.createElement("li");
    ingredientLi.classList.add("ingredient-item")
    ing.unit == undefined
      ? (ingredientLi.innerText = ing.value + " " + ing.key)
      : (ingredientLi.innerText =
          ing.value + " " + ing.unit + " " + ing.key);
    shopListUl.append(ingredientLi);
  });
}

function displayRecipes(recipes) {
  const allRecipes = document.getElementById("allRecipes");

  recipes.forEach((recipe) => {
    for (let i = 0; i < recipe.servings; i++) {
      const id = Math.random();

      const col=document.createElement("div");
      col.classList.add("col-sm-6");

      const card = newEl("div", { class: "card" });
      const title = newEl("h5", { innerText: recipe.recipeName });
      title.classList.add("card-title");
      card.appendChild(title);
    
      const table = newEl("table", { class: "table" });
      table.classList.add("table-light");
      table.classList.add("table-sm");
      const tableHead = newEl("thead", { class: "table-head" });
      const tableBody = newEl("tbody", { class: "table-body" });
      const tableHeadRow = newEl("tr", { class: "table-body" });
      const tableBodyRow = newEl("tr", { class: "table-body" });

      recipe.formattedMacros.forEach((macro) => {
        const macroName = newEl("th", { innerText: macro.key });
        const macroValue = newEl("td", { innerText: macro.value });
        macroValue.id = id + "-" + macro.key;
        tableHeadRow.appendChild(macroName);
        tableBodyRow.appendChild(macroValue);
      });

      tableHead.appendChild(tableHeadRow);
      tableBody.appendChild(tableBodyRow);
      table.appendChild(tableHead);
      table.appendChild(tableBody);

      card.appendChild(table);
      card.id = id;
      card.classList.add("meal-option");
      card.setAttribute("draggable", "true");
      card.setAttribute("ondragstart", "onDragStart(event)");
      
      col.appendChild(card);
      allRecipes.appendChild(col);
    }
  });
}

function clearExistingDetails() {
  const shoppingListBox = getShoppingListBox();
  const recipeOutputBox = document.getElementById("allRecipes");
  const tableCells = document.getElementsByClassName("tablecell");

  for(let i=0; i < tableCells.length; i++){
    tableCells[i].innerHTML = '';
  }

  recipeOutputBox.innerHTML = '';
  shoppingListBox.innerHTML = '';
}

function showLoader(){
  const spinner = document.getElementById("spinner");
  spinner.style.display = 'block';
}

async function submitMeals() {
  // show loader
  document.getElementById("spinner").style.display = 'block';

  // clear existing details
  clearExistingDetails();

  let urls = [];
  
  const recipeInputs = document.getElementsByClassName("recipe-input")

  for(let recipe of recipeInputs) {
      urls.push({ url: recipe.value })
  };

  // Get scraped recipe data from recipe using server api
  jsonS = fetch("http://localhost:3000/api/recipe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ urls }),
  })
    .then((response) => response.json())
    .then((response) => {
      displayRecipes(response.recipes);
      showShoppingList(response.ingredients);
      document.getElementById("spinner").style.display = 'none';
    });
}


// HELPER FUNCTIONS
function newEl(type, attrs = {}) {
  const el = document.createElement(type);
  for (let attr in attrs) {
    const value = attrs[attr];
    if (attr == "innerText") {
      el.innerText = value;
      el.id = Math.random();
    } else el.setAttribute(attr, value);
  }
  return el;
}


function getShoppingListBox(){
  return document.getElementById("shoppingList");;
}

function getAllRecipesBox(){
  return document.getElementById("allRecipes");
}

function test() {
  console.log("change in row");
}

function generateTable() {  
  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  const tableBody = document.getElementById("table-body");

  days.forEach((day) => {
    // generate a row (td)
    const dayRow = newEl("tr", { class: "table-row" });
    const dayTd = newEl("td", { innerText: day.toString() });
    dayRow.appendChild(dayTd);
    // generate columns
    const el1 = document.createElement("td");
    const el2 = document.createElement("td");
    const el3 = document.createElement("td");
    const el4 = document.createElement("td");
    const el5 = document.createElement("td");
    const el6 = document.createElement("td");
    const el7 = document.createElement("td");
    const el8 = document.createElement("td");

    const rowElements = [el1, el2, el3, el4, el5, el6, el7, el8];
    const columnElements = ["breakfast", "lunch", "dinner","snack", "prt", "crb", "fat", "cal"];

    for (let i = 0; i < rowElements.length ; i++) {
      const element = rowElements[i];
      
      element.classList.add("tablecell");
      element.id = day + "-" + columnElements[i];

      if (i <= 3) {
        // create a new instance of 'MutationObserver' named 'observer', 
        // passing it a callback function
        observer = new MutationObserver(function(mutationsList, observer) {
          console.log("something changed")
          console.log(mutationsList);
        });
        // call 'observe' on that MutationObserver instance, 
        // passing it the element to observe, and the options object    
        observer.observe(element, {characterData: false, childList: true, attributes: false});

        element.setAttribute("ondragover", "onDragOver(event)");
        element.setAttribute("ondrop", "onDrop(event)");
      }
      // append coulmns to row
      dayRow.appendChild(element);
    }
    tableBody.appendChild(dayRow);
  });
}

function createInputBox(){
    const inputsClass = document.getElementsByClassName("recipe-inputs");
    const inputsId = document.getElementById("recipe-inputs");
    const nextInputValue = inputsClass[0].children.length +1;
    const row = document.createElement("div")
    row.classList.add("row");
    const input = document.createElement("input")
    input.classList.add("recipe-input");
    input.id="recipe"+nextInputValue;
    input.setAttribute("type","text");
    input.setAttribute("placeholder","Input BBC GoodFood Recipe");

    row.appendChild(input);
    inputsId.appendChild(row);
}
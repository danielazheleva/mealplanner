
window.onload = function () {
  generateTable();
  createInputBox();
};

async function submitMeals() {
  // show loader
  document.getElementById("spinner").style.display = 'block';

  // clear existing details
  clearExistingDetails();

  let urls = [];

  const recipeInputs = document.getElementsByClassName("recipe-input")

  for (let recipe of recipeInputs) {
    urls.push({ url: recipe.value })
  };

  // Get scraped recipe data from recipe using server api
  jsonS = fetch("/api/recipe", {
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
  dropzone.appendChild(draggableElement);
  event.dataTransfer.clearData();
}

// DISPLAY IN UI
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

      const col = document.createElement("div");
      col.classList.add("col-sm-3");

      const card = newEl("div", { class: "card" });
      const title = newEl("p", { innerText: recipe.recipeName });
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

function showLoader() {
  const spinner = document.getElementById("spinner");
  spinner.style.display = 'block';
}

// TABLE OBSERVER
// create a new instance of 'MutationObserver' named 'observer', passing it a callback function
observer = new MutationObserver(function (mutationsList, observer) {
  console.log(mutationsList);
  mutationsList.forEach((mutation) => {
    const changedRowDay = mutation.target.parentElement.id;
    console.log("Change detected in row for: " + changedRowDay);
    row = document.getElementById(changedRowDay);
    let finalProteinValueOfRow = 0;
    let finalCarbValueOfRow = 0;
    let finalFatValueOfRow = 0;
    let finalKcalValueOfRow = 0;

    // loop over breakfast, lunch, dinner and snack cells
    for (let i = 1; i <= 4; i++) {
      // console.log(row.childNodes[i]);
      // if they have innerHTML objects, then loop over them
      if (row.childNodes[i].innerHTML) {
        row.childNodes[i].childNodes.forEach((card) => {
          const id = card.id;
          const proteinValue = document.getElementById(id + "-protein");
          const carbValue = document.getElementById(id + "-carbs");
          const fatValue = document.getElementById(id + "-fat");
          const kcalValue = document.getElementById(id + "-kcal");

          finalProteinValueOfRow += parseInt(proteinValue.innerText);
          finalCarbValueOfRow += parseInt(carbValue.innerText);
          finalFatValueOfRow += parseInt(fatValue.innerText);
          finalKcalValueOfRow += parseInt(kcalValue.innerText);
        })
      }
    }
    const proteinDestination = document.getElementById(changedRowDay + "-prt");
    const carbsDestination = document.getElementById(changedRowDay + "-crb");
    const fatDestination = document.getElementById(changedRowDay + "-fat");
    const kcalDestination = document.getElementById(changedRowDay + "-cal");

    proteinDestination.innerText = finalProteinValueOfRow;
    carbsDestination.innerText = finalCarbValueOfRow;
    fatDestination.innerText = finalFatValueOfRow;
    kcalDestination.innerText = finalKcalValueOfRow;
  })
});

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

function getShoppingListBox() {
  return document.getElementById("shoppingList");;
}

function getAllRecipesBox() {
  return document.getElementById("allRecipes");
}

function generateTable() {
  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  const tableBody = document.getElementById("table-body");

  days.forEach((day) => {
    // generate a row (td)
    const dayRow = newEl("tr", { class: "table-row" })
    dayRow.id = day;
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
    const columnElements = ["breakfast", "lunch", "dinner", "snack", "prt", "crb", "fat", "cal"];

    for (let i = 0; i < rowElements.length; i++) {
      const element = rowElements[i];

      element.classList.add("tablecell");
      element.id = day + "-" + columnElements[i];

      if (i <= 3) {
        // call 'observe' on that MutationObserver instance, 
        // passing it the element to observe, and the options object    
        observer.observe(element, { characterData: false, childList: true, attributes: false });

        element.setAttribute("ondragover", "onDragOver(event)");
        element.setAttribute("ondrop", "onDrop(event)");
      }
      // append coulmns to row
      dayRow.appendChild(element);
    }
    tableBody.appendChild(dayRow);
  });
}

function createInputBox() {
  const inputsClass = document.getElementsByClassName("recipe-inputs");
  const inputsId = document.getElementById("recipe-inputs");
  const nextInputValue = inputsClass[0].children.length + 1;
  const row = document.createElement("div")
  row.classList.add("row");
  const input = document.createElement("input")
  input.classList.add("recipe-input");
  input.id = "recipe" + nextInputValue;
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", "Input BBC GoodFood Recipe");

  row.appendChild(input);
  inputsId.appendChild(row);
}

function clearExistingDetails() {
  const shoppingListBox = getShoppingListBox();
  const recipeOutputBox = document.getElementById("allRecipes");
  const tableCells = document.getElementsByClassName("tablecell");

  for (let i = 0; i < tableCells.length; i++) {
    tableCells[i].innerHTML = '';
  }

  recipeOutputBox.innerHTML = '';
  shoppingListBox.innerHTML = '';
}
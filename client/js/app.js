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

window.onload = function() {
  generateTable();
};

function onDragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
}

function onDragOver(event) {
  event.preventDefault();
}

async function combineMacros(day, prt, crb, fat, kcal) {

  const proteinDestination = document.getElementById(day + "-prt");
  const carbsDestination = document.getElementById(day + "-crb");
  const fatDestination = document.getElementById(day + "-fat");
  const kcalDestination = document.getElementById(day + "-cal");

  const proteinCurrentValue = proteinDestination.innerText;
  console.log(proteinCurrentValue);

  if (proteinCurrentValue === "") {
    proteinDestination.innerText = prt.innerText;
  } else {
    console.log(
      "adding " + proteinCurrentValue + " with " + prt.innerText
    );
    proteinDestination.innerText =
      parseInt(proteinCurrentValue) + parseInt(prt.innerText);
  }
}

function onDrop(event) {
  event.currentTarget.style.backgroundColor = "white";
  const id = event.dataTransfer.getData("text");
  const draggableElement = document.getElementById(id);

  const dropzone = event.target;        
  const day = event.target.id.split("-")[0]; 

  console.log("id is: " + id);

  const title = draggableElement.getElementsByTagName("h5")[0];
  const proteinFromRecipe = document.getElementById(id+"-protein");
  const carbsFromRecipe = document.getElementById(id+"-carbs");
  const fatFromRecipe = document.getElementById(id+"-fat");
  const kcalFromRecipe = document.getElementById(id+"-kcal");
  dropzone.appendChild(title);

  combineMacros(day, proteinFromRecipe, carbsFromRecipe, fatFromRecipe, kcalFromRecipe);
  event.dataTransfer.clearData();
}

// Display shopping list in UI
function showShoppingList(ingredients) {
  const shopListUl = document.getElementById("shoppingList");

  ingredients.forEach((ing) => {
    const ingredientLi = document.createElement("li");
    ing.unit == undefined
      ? (ingredientLi.innerText = ing.value + " " + ing.key)
      : (ingredientLi.innerText =
          ing.value + " " + ing.unit + " " + ing.key);
    shopListUl.append(ingredientLi);
  });
}

function generateTable() {
  console.log("generate table called");
  
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

    const mealElements = [el1, el2, el3, el4, el5, el6, el7, el8];
    const meals = ["breakfast", "lunch", "dinner","snack", "prt", "crb", "fat", "cal"];

    for (let i = 0; i < mealElements.length ; i++) {
      const element = mealElements[i];
      element.id = day + "-" + meals[i];

      if (i <= 3) {
        element.setAttribute("ondragover", "onDragOver(event)");
        element.setAttribute("ondrop", "onDrop(event)");
      }
      // append coulmns to row
      dayRow.appendChild(element);
    }
    tableBody.appendChild(dayRow);
  });
}

function showAllOptions(recipes) {
  const allRecipes = document.getElementById("allRecipes");

  recipes.forEach((recipe) => {
    console.log(recipe);

    for (let i = 0; i < recipe.servings; i++) {
      const id = Math.random();

      console.log(recipe.recipeName);
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
      card.classList.add("col-sm-6");
      card.setAttribute("draggable", "true");
      card.setAttribute("ondragstart", "onDragStart(event)");

      allRecipes.appendChild(card);
    }
  });
}

async function submitMeals() {
  let urls = [];
  const url1 = { url: document.querySelector(".recipe1").value };
  const url2 = { url: document.querySelector(".recipe2").value };
  const url3 = { url: document.querySelector(".recipe3").value };
  const url4 = { url: document.querySelector(".recipe4").value };
  const url5 = { url: document.querySelector(".recipe5").value };

  urls.push(url1, url2, url3, url4, url5);

  // Get scraped recipe data from recipe using server api
  jsonS = fetch("http://localhost:3000/recipe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ urls }),
  })
    .then((response) => response.json())
    .then((response) => {
      showAllOptions(response.recipes);
      showShoppingList(response.ingredients);
    });
}
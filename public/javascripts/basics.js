let nameToSearch = document.getElementById('food-name');
let nameToAdd = document.getElementById('name-text');

let ingredientInput = document.getElementById('ingredients-text');
let instructionInput = document.getElementById('instructions-text');

let searchButton = document.getElementById('search');
let addButton = document.getElementById('submit');
let addIngredient = document.getElementById('add-ingredient');
let addInstruction = document.getElementById('add-instruction');

let instructionList = [];
let ingredientList = [];

searchButton.addEventListener('click', ()=>{
    const name = nameToSearch.value; 
    fetch("/recipe/" + name)
    .then(response => {
        return response.json();  
    })
    // or simply .then(response => response.json())
    .then(data => {
        createElements(data);
    })
    .catch(error => {
        console.log(error)
    });
});

function createElements(data){
    console.log(data);
    let displayDiv = document.getElementById('displayDiv');
    displayDiv.innerHTML = '';
    let h1 = document.createElement('h1');
    //h1.textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    h1.textContent = data.name;
    displayDiv.appendChild(h1);
    let h2_1 = document.createElement('h2');
    h2_1.textContent = "Ingredients";
    displayDiv.appendChild(h2_1);
    data.ingredients.forEach(element => {
        let p = document.createElement('p');
        p.textContent = element;
        displayDiv.appendChild(p);
    });
    let h2_2 = document.createElement('h2');
    h2_2.textContent = "Instructions";
    displayDiv.appendChild(h2_2);
    data.instructions.forEach(element => {
        let p = document.createElement('p');
        p.textContent = element;
        displayDiv.appendChild(p);
    });
}

addIngredient.addEventListener('click', ()=>{
    let ingredient = ingredientInput.value;
    ingredientList.push(ingredient);
    console.log(ingredientList);
});

addInstruction.addEventListener('click', ()=>{
    let instruction = instructionInput.value;
    instructionList.push(instruction);
    console.log(instructionList);
});


addButton.addEventListener('click', ()=>{
    let name = nameToAdd.value;
    let recipe = {
        name: name,
        ingredients: ingredientList,
        instructions: instructionList
    };
    try {
    fetch("/recipe/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(recipe)
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        createElements(data);
        console.log(data);
        instructionList = [];
        ingredientList = [];
    })}
    catch (error) {
        console.log('error');
    }
});

/*
Code  11-26 can be written using async:
  try {
    const response = await fetch("/recipe/" + name);
    if (!response.ok) {
      throw new Error("Food not found");
    }
    const data = await response.json();
    createElements(data);
  } catch (error) {
    console.error(error.message); // This will log only your custom error message
  }
});

in this way i wont see the 404 error in the console!
*/
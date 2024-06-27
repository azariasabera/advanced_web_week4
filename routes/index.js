var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// My code

// Since I had no source for the recipes, I manually added some.
let recipes = {
  Pizza: {
    name: "Pizza",
    instructions: ["Preheat oven to 475°F", "Spread the dough", "Add toppings", "Bake for 10-15 minutes"],
    ingredients: ["dough", "sauce", "cheese", "toppings"]
  },
  Pasta: {
    name: "Pasta",
    instructions: ["Boil water", "Add pasta", "Cook for 8-10 minutes", "Drain and serve"],
    ingredients: ["pasta", "water", "salt"]
  }
};

router.get("/recipe/:food", (req, res)=>{
  let name = req.params.food;
  let food = recipes[name];
  // if recipes was array of objects, I would use food = recipes.find(recipe => recipe.name === name);
  if(food){
    res.json(food);
  }
  else{
    res.status(404).json({msg: "Food not found"});
  }
})

module.exports = router;

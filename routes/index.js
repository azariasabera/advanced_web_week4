var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// My code

let recipes = [];

router.get("/recipe/:food", (req, res)=>{
  let name = req.params.food;
  let food = recipes[name];
  
});

router.post("/recipe/", (req, res)=>{
  try {
    let name = req.body.name;
    let instructions = req.body.instructions;
    let ingredients = req.body.ingredients;

    let recipe = {
      name: name,
      instructions: instructions,
      ingredients: ingredients
    };

    recipes.push(recipe);
    res.json(recipe);
    
  } catch (error) {
    res.status(400).json({
      msg: "Invalid request"
    });
}
});

router.post("/images", (req, res) => {
  res.json({msg: "Image uploaded"});
});

module.exports = router;

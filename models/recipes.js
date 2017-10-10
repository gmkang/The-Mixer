const axios = require('axios');
const db 		= require('../db/config');

const Recipe = {};


function numericParam(reqParams, parameterName) {
    if (typeof parameterName !== 'string') {
         throw new Error('parameterName must be a string!')
     }
     const paramString = reqParams[parameterName];
     if (paramString === undefined) {
        throw new Error(parameterName + ' is undefined!');
     }
     const param = Number(paramString);
     if (isNaN(param)) {
         throw new Error('param is not a number! paramString: ' + paramString);
     }
     return param;
 }


Recipe.randomBeverage = (req, res, next) => {
	axios({
		url: 'http://www.thecocktaildb.com/api/json/v1/1/random.php',
		method: 'GET'
	}).then(beverage => {
		res.locals.beverage = beverage
		console.log(res.locals.beverage.data.drinks)
		next();
	}).catch(err => {
		console.log(`Error obtaining random beverage: ${err}`)
	})
}

Recipe.findAll = (req, res, next) => {
	db.manyOrNone(`SELECT * FROM savedRecipes`)
	.then(savedAll => {
		res.locals.savedAll = savedAll;
		console.log(res.locals.savedAll);
	})
	.catch(err => {
		console.log(`Error obtaining all saved: ${err}`);
	})
}

Recipe.findById = (req, res, next) => {
	const { id } = req.params;
	db.oneOrNone(`SELECT * FROM savedRecipes WHERE id=$1`, [id])
	.then(saved => {
		res.locals.saved = saved;
		next();
	})
	.catch(err => {
		console.log('ERROR getting single drink')
	})
}

Recipe.create = (req, res, next) => {
  const {name, measurements, ingredients, instructions, image, beverageType} = req.body;
  console.log(req.body);
  db.one(`INSERT INTO savedRecipes (name, measurements, ingredients, instructions, image, beverageType, user_id) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [name, measurements, ingredients, instructions, image, beverageType, req.user.id])
    .then(created => {
      res.locals.created = created;
      console.log(res.locals.created);
      next();
    })
    .catch(err => {
    	console.log(`ERROR creating NEW: ${err}`)
	})
}

Recipe.update = (req, res, next)  => {
	const { name, measurements, ingredients, instructions, image, beverageType } = req.body;
  const { id } = req.params;
  console.log(req.body);
  console.log(req.params);
 	db.oneOrNone(`UPDATE savedRecipes SET 
 		name = $1, measurements = $2, ingredients = $3, instructions = $4, image = $5, beverageType =$6 
 		WHERE id = $7 RETURNING *`,
 		[name, measurements, ingredients, instructions, image, beverageType, id])
 	.then(edit => {
 		res.locals.edit = edit;
 		next();
 	})
 	.catch(err => {
 		console.log(`ERROR with UPDATE: ${err}`)
 	})
}

Recipe.save = (req, res, next) => {
	const {name, measurements, ingredients, instructions, image, beverageType} = req.body;
	const { id } = req.body;
	console.log(req.body)
	db.one('INSERT INTO savedRecipes (name, measurements, ingredients, instructions, image, beverageType, user_id) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [name, measurements, ingredients, instructions, image, beverageType, req.user.id])')
	.then(save => {
		res.locals.save = save;
		next();
	})
		.catch(err => {
			console.log('ERROR saving recipe')
		})
}

Recipe.complete = (req, res, next) => {
  const {complete} = req.body;
  const {id} = req.params;
  db.oneOrNone(`UPDATE savedRecipes SET complete = $1 WHERE id = $2`, [complete, id])
    .then(()=> next())
    .catch(err => console.log(err));
}

Recipe.destroy = (req, res, next) => {
	const { id } = req.params;
	db.none('DELETE FROM savedRecipes WHERE id = $1', [id])
	.then(() => next())
		.catch(err => console.log(err));
	}


module.exports = Recipe;
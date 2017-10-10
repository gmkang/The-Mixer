const router 	 = require('express').Router();
const passport = require('passport');
const User		 = require('../models/users');

const auth		 = require('../services/auth');


router.get('/new', (req,res) => {
	res.render('users/new');
});

router.post('/',
	passport.authenticate(
		'local-signup', {
			failureRedirect: '/users/new',
			successRedirect: '/recipes'
		}
	)
);


router.post('/login', passport.authenticate(
	'local-login', {
		failureRedirect: '/',
		successRedirect: '/recipes'
		}
	)
);

router.get('/logout', (req,res) => {
	req.logout();
	res.redirect('/');
})



module.exports = router;
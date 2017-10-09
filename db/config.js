const path = require('path');
const pgp = require('pg-promise')();

const db = pgp({
	host: 'localhost',
	port: 5432,
	database: 'cookin_culture',
	user: 'matthewkim',
	password: 'pw'
});

// Helper for linking to external query files:
function sql(file) {
	const fullPath = path.join(__dirname, file);
	return new pgp.QueryFile(fullPath, { minify: true });
}

const sqlStatements = sql('./schema.sql');
db.query(sqlStatements)
	.then(user => {
		console.log(user);
	})
	.catch(error => {
		throw error;
	})


module.exports = db;

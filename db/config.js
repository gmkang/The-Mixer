const path = require('path');
const pgp = require('pg-promise')();

const db = pgp({
	host: 'localhost',
	port: 5432,
	database: 'the_mixer',
	user: 'matthewkim',
	password: 'pw'
});

// Helper for linking to external query files:
function sql(file) {
	const fullPath = path.join(__dirname, file);
	return new pgp.QueryFile(fullPath, { minify: true });
}

// Globally creating a QueryFile, once per file:
const sqlFindUser = sql('./schema.sql');
db.query(sqlFindUser)
	.then(user => {
		console.log(user);
	})
	.catch(error => {
		if (error instanceof pgp.errors.QueryFileError) {
			// => error is related to the QueryFile
		}
	});

module.exports = db;

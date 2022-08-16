const { DataSource } = require('typeorm');

const database = new DataSource({
	type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
})

database.initialize()
.then(() => {
    console.log("Data Source has been initialized!");
})
.catch((err) => {
    console.error("Error during Data Source initialization", err);
    database.destroy()
});

module.exports = {
    database
}
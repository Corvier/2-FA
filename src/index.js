const express = require('express');
const routes = require('../src/routes/routes.js');
const path = require("path");

const app = express();

// Settings
app.set('port', process.env.PORT || 3000);
console.log("\n");
console.log("DIRNAME");
console.log(__dirname);
console.log(path.join(__dirname, 'views'));
console.log("\n");
console.log("\n");
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");


// Middleware
app.use(express.json());
app.use(routes);


// Starting the server
app.listen(app.get("port"), () => { console.clear(); console.log(`Server is Running on port http://localhost:${app.get("port")}`); });
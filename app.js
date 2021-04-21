require("dotenv").config({path: './config/dev.env'});
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.urlencoded({extended: true}))

app.use(express.json());

app.use((req, res, next) => {
	//if you want to allow acces to only specific servers, you can put them in the second argument and separate them by a comma
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"OPTIONS, GET, POST, PUT, PATCH, DELETE"
	);
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
	next();
});

app.use([authRoutes, notesRoutes]);

app.use((error, req, res, next) => {
	console.log(error);
	const status = error.status || 500;
	const message = error.message;
	res.status(status).json({ message});
});

mongoose
	.connect(process.env.DB_CONECTION, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((result) => {
		app.listen(port, () => {
			console.log("Connected");
		});
	})
	.catch((err) => console.log(err));

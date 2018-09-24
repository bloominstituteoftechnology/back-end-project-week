const express = require("express");
const cors = require("cors");
const knex = require("knex");

//==============Data Table===============//
const dataConfig = require("./knexfile");
const db = knex(dataConfig.development);
//==============Data Table===============//

const server = express();

server.use(express.json());
server.use(cors());

//=================GET ENDPOINT===============//
server.get("/note/get/all", (req, res) => {

});
//=================GET ENDPOINT===============//

//=================GET ENDPOINT===============//
server.get("/note/get/:id", (req, res) => {

});
//=================GET ENDPOINT===============//

//=================POST ENDPOINT===============//
server.post("/note/create", (req, res) => {

});
//=================POST ENDPOINT===============//

//=================PUT ENDPOINT===============//
server.put("/note/edit/:id", (req, res) => {

});
//=================PUT ENDPOINT===============//

//=================DELETE ENDPOINT===============//
server.delete("/note/delete/:id", (req, res) => {

});
//=================DELETE ENDPOINT===============//
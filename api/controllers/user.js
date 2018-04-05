const bcrypt = require('bcrypt');
const express = require('express');
const mongoose = require('mongoose');

const STATUS_USER_ERROR = 422;
const STATUS_SUCCESS = 200;
const STATUS_SERVER_ERROR = 500;

const getuserError = (error, res) => {
	res.status(STATUS_SERVER)ERROR);
	if(error && error.message) {
		res.json({ message: error.message, stack: error.stack });
	} else {
		 res.json({ error: error });
		}
 };

const createUser = (req, res) => {
	const { username, password } = req.body;

	if (!username || !password) {
		res.status(STATUS_USER_ERROR).json('User accounts need both a username and password');
	} else {
		const newlycreatedUser = new username({ username, password: password});
		newlycreatedUser.save((error, newlysavedUser) => {
				if (error) {
           return getuserError(error, res);
				} else {
				   res.status(STATUS_SUCCESS).json(newlysavedUser);
					}
			 });
		 }
	 };

module.exports = {
	createUser
};

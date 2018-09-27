const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const helpers = require("./db/helpers");
const restrictedRoutes = require("./routes/restrictedRoutes");
const authRoutes = require("./routes/authRoutes");

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan());

passport.use(
	new JWTStrategy(
		{
			jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.SECRET || "secret",
		},
		function(jwtPayload, cb) {
			helpers
				.getUser(jwtPayload.id)
				.first()
				.then(user => {
					if (!user) {
						return cb(null, false);
					}
					cb(null, user);
				})
				.catch(err => cb(err, false));
		},
	),
);

function authenticate(req, res, next) {
	let authFunc = passport.authenticate("jwt", function(err, user, info) {
		if (err) return res.json({ error: "Bad creds buddy boy" });
		if (!user) return res.json({ error: "Bad token boyo" });
		next();
	});
	authFunc(req, res, next);
}

server.use("/notes", authenticate, restrictedRoutes);
server.use("/auth", authRoutes);

const port = process.env.PORT || 8000;

server.listen(port, function() {
	console.log(
		`\n === Server Be Sailin on http://localhost:${port}. Yarrrnnn`,
	);
});

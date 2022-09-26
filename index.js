const pronote = require("@dorian-eydoux/pronote-api");
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});

app.get("/", (req, res) => res.send("Server is working !!!"));

app.post("/verifyEnt", (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	pronote
		.login(
			"https://0910625k.index-education.net/pronote/",
			username,
			password,
			"iledefrance"
		)
		.then((session) => {
			const userIdentity = session.user.name;
			const userClass = session.user.studentClass;
			session.logout();
			data = {
				user: userIdentity,
				class: userClass,
			};
			res.status(200).json(data);
		})
		.catch((err) => {
			if (err.code == pronote.errors.WRONG_CREDENTIALS.code) {
				data = {
					error: true,
					message: "Identifiants ENT invalides, veuillez réessayer.",
				};
				return res.status(501).json(data);
			} else if (err.code == pronote.errors.BANNED.code) {
				data = {
					error: true,
					message:
						"Nous n'avons pas réussi à vérifier votre compte, car votre IP est provisoirement bannie de pronote. Veuillez réessayer dans 30 minutes.",
				};
				return res.status(501).json(data);
			} else if (err.code == pronote.errors.CLOSED.code) {
				data = {
					error: true,
					message:
						"Le Pronote de votre établissement scolaire est provisoirement fermé. Veuillez réessayer lorsque ce dernier sera rouvert.",
				};
				return res.status(501).json(data);
			} else if (err.code == pronote.errors.PRONOTE.code) {
				data = {
					error: true,
					message:
						"Une erreur générique s'est produite du côté du serveur de Pronote. Veuillez réessayer.",
				};
				return res.status(501).json(data);
			} else if (err.code == pronote.errors.RATE_LIMITED.code) {
				data = {
					error: true,
					message:
						"Nous n'avons pas réussi à vérifier votre compte, car votre IP est provisoirement bannie de pronote. Veuillez réessayer dans 30 minutes.",
				};
				return res.status(501).json(data);
			} else if (err.code == pronote.errors.UNKNOWN_ACCOUNT.code) {
				data = {
					error: true,
					message:
						"Une erreur s'est produite durant la vérification de votre compte. Veuillez réessayer.",
				};
				return res.status(501).json(data);
			} else if (err.code == pronote.errors.UNKNOWN_CAS.code) {
				data = {
					error: true,
					message:
						"Une erreur s'est produite durant la connexion à votre compte ENT. Veuillez réessayer.",
				};
				return res.status(501).json(data);
			}
		});
});

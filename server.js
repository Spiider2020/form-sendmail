require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const app = express();
const PORT = parseInt(process.env.API_PORT);

const getLogStamp = () => {
	let date_ob = new Date();
	let day = ('0' + date_ob.getDate()).slice(-2);
	let month = ('0' + (date_ob.getMonth() + 1)).slice(-2);
	let year = date_ob.getFullYear();
	let hours = ('0' + date_ob.getHours()).slice(-2);
	let minutes = ('0' + date_ob.getMinutes()).slice(-2);
	let seconds = ('0' + date_ob.getSeconds()).slice(-2);
	let timeStamp = day + '/' + month + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds;
	let logStamp = 'form-sendmail (' + timeStamp + ') :';
	return logStamp;
};

const transporter = nodemailer.createTransport({
	host: process.env.MAIL_HOST,
	port: parseInt(process.env.MAIL_SMTP_PORT),
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASSWORD,
	},
});

transporter.verify(function (error, success) {
	if (error) {
		console.log(getLogStamp(), error);
	} else {
		console.log(getLogStamp(), 'Server is ready to take our messages');
	}
});

app.use(bodyParser.json());
app.use(cors());
// Routes
app.post('/send', async function (req, res) {
	const { name, email, phone, company, message } = req.body;
	console.log(getLogStamp() + 'Form submitted');
	console.log(req.body);
	const mail_obj = {
		from: process.env.MAIL_FROM,
		to: process.env.MAIL_TO,
		subject: 'Site Form - ' + name,
		text: `Nume client: ${name} \nEmail: ${email} \nTelefon: ${phone} \nCompany: ${company}\nV-a scris urmatorul mesaj:\n  ${message}`,
	};
	await transporter.sendMail(mail_obj, function (err, info) {
		if (err) {
			console.log(err);
			res.json('error could not send data');
		} else {
			console.log(getLogStamp(), 'Form data sent!');
			res.json('success');
		}
	});
});

//Listen to port

app.listen(PORT, function (err) {
	if (err) console.log(getLogStamp(), 'Error in server setup');
	console.log(getLogStamp(), 'Server listening on Port', PORT);
});

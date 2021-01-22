const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const app = express();

const transporter = nodemailer.createTransport({
	host: 'in-v3.mailjet.com',
	port: 465,
	auth: {
		user: 'c023d17652ffe6bc30ccb5d9373b3044',
		pass: '257817dd9947e01ff63f3427a21e5551',
	},
});

transporter.verify(function (error, success) {
	if (error) {
		console.log(error);
	} else {
		console.log('Server is ready to take our messages');
	}
});

app.use(bodyParser.json());
app.use(cors());
// Routes
app.post('/send', async function (req, res) {
	const { name, email, phone, company, message } = req.body;
	console.log(req.body);
	const mail_obj = {
		from: '"mailer DreamOnIT"<acc.dreamonit@gmail.com>',
		to: 'recno_recno@yahoo.com',
		subject: name,
		text: `Nume client: ${name} \n email: ${email} \n telefon: ${phone} \n company: ${company}\n V-a scris urmatorul mesaj :\n ${message}`,
	};
	await transporter.sendMail(mail_obj, function (err, info) {
		if (err) {
			console.log(err);
			res.json('error could not send data');
		} else {
			console.log('Form data sent!');
			res.json('success');
		}
	});
});

//Listen to port

app.listen(3005);


# Form send email

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Usage](#usage)

## General info
This project is little API I used a while back to receive contact form data from the front-end and send it using nodemailer to a specified email.
This is useful when you dont want to spin up a whole database for the contact form on your website.

## Technologies
Project is created with:
* Node.js
* Express
* Nodemailer
* dotenv

## Setup
Clone the repository and run:
```
npm install
```

Create a .env file in the root directory.
Set the following variables: 
```
API_PORT=''
MAIL_HOST=''
MAIL_SMTP_PORT=''
MAIL_USER=''
MAIL_PASSWORD=''
MAIL_FROM=''
MAIL_TO=''
```
__API_PORT__ - is the port your API is going to be running.  
__MAIL_HOST__ - is your SMTP host (you can find Nodemailer documentation [here](https://nodemailer.com/about/)).   
__MAIL_SMTP_PORT__ - is your SMTP port.   
__MAIL_USER__ - is the email you are going to use to send emails.   
__MAIL_PASSWORD__ - the password for the email.   
__MAIL_FROM__ - is the header from email ( ex. MAIL_FROM='"no-reply" \<youremail@<span></span>email.com\>' ).   
__MAIL_TO__ - email(s) that will receive the form data ( ex. MAIL_TO='youremail@<span></span>email.com, someemail@<span></span>email.com' ).   

## Usage   
This receives post requests with a json body that has 5 fiels, but you can modify it as needed.

```json
{
    "name":"test name",
    "email":"test@gmail.com",
    "phone":"0700000000",
    "company":"some company",
    "message":"Some message"
}
```
From your front-end create a /post request to the /send route of the api ( ex. https<span></span>://yourapidomain.com/send ).  

**Some email providers will not allow the connection. You can use SMTP relays as a workaround.**

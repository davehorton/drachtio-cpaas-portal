# react-loopback

A project using React/Redux + SemanticUS (front-end) and ExpressJS + loopback + mysql

## Database
You should install mysql server.
After Installation, import cpaas_db_schema.sql to mysql server

## Back-end
At first, you must install loopback cli for loopback server

install loopback-cli
command
### `npm install -g loopback-cli`

Configure Google account for SMTP in server/datasources.json
        "auth": {
          "user": "YOUR_GMAIL",
          "pass": "YOUR_GMAIL_PWD"
        }

run loopback server
command
### `npm i`
### `node .`

## Front-End

In this part, you can run react project (client) :

install react cli
### `npm install -g create-react-app`

After installing go to the client source folder

### `cd client_react`

Here you should change port of react to 3001.
Because loopback server uses port 3000.
Open package.json file.

Here

Change 
"scripts": {
    "start": "react-scripts start",
to
"scripts": {
    "start": "PORT=3001 react-scripts start",
If your platform is Windows or linux
change to "set PORT=3001 react-scripts start"

To run react-client:

### `npm i`
### `npm start`
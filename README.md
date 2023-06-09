# cms-style-blog
by Daniella Ferrufino ![Github licence](http://img.shields.io/badge/license-MIT-yellowgreen.svg)

## Description
This application follows the MVC paradigm in it's structure and uses Handlebars.js as the templating language, Sequelize as the ORM, and the express-session npm package for authentication. This application is a CMS-style blog where developers can publish their blog posts and comment on other developers post.

## Installation
* Clone repository from Github, open cloned repository in any source code editor, then open the integrated terminal for the document. You will need execute install to download the required dependencies: [express-handlars](https://www.npmjs.com/package/express-handlebars), [Sequelize](https://www.npmjs.com/package/sequelize), [MySQL2](https://www.npmjs.com/package/mysql2), [dotenv package](https://www.npmjs.com/package/dotenv), [bcrypt package](https://www.npmjs.com/package/bcrypt),[express-session](https://www.npmjs.com/package/express-session), and [connection-session-sequelize](https://www.npmjs.com/package/connect-session-sequelize). Then run 'npm i to run all modules. To connect to the database run 'mysql -u root -p' and enter password from .env file. Then source the schema.sql. To connect to the server run npm start.
* If using the Heroku deployed application click on the following link to be redirected to the page: [Click Here](https://cms-style-blog-app.herokuapp.com/)

## Usage
This application allows user to sign up if they are not a member, once they are loged in they are able to view their dashboard of posts to view, add, edit, and delete blog posts and comment on other developers post.
<img src="/public/images/loginpage.PNG">
<img src="/public/images/createpostpg.PNG">

## License
This application is licensed under the MIT license.

## Tests
The tests in this application verifies data formatting using Jest.

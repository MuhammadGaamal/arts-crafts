# store-master
An online store with Angular 8, Node.js,Express JS, PostgreSQL 
Amazon look-a-like with Node 10, and Angular 8 with server-side rendering

Requirements
You need to have Node 10 or higher and PostgreSQL 9.5 or higher installed.

Setup
Install dependencies

yarn install
Config is in: config/amazon.json. Make changes there as you see fit (database host, user + password, port, OAUTH etc)

Initialize the database: yarn init:db. This creates the database (default is node_amazon_dev), and initializes the tables with the seed data.

We can now run the development server: yarn start

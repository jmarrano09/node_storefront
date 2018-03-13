# Node Storefront

## Overview
This application is an Amazon-like terminal-based "storefront."" It utilizes Node.js &amp; a MySQL database to show inventory availability, pricing information, and department profitability, all from within the terminal.

### Technologies Used
- [Node.js and npm](https://nodejs.org/en/download/ "Download Node.js and npm"). First, this application relies on both Node.js and npm to download Node packages and to run the application. Users can download the latest versions of both using the link to the left.
- [MySQL](https://www.mysql.com/ "MySQL") - This application assumes users have both MySQL installed, and the [MySQL npm Package](https://www.npmjs.com/package/mysql "MySQL npm Package") installed as well. 
- [inquirer](http://numbersapi.com/ "inquirer - npm") - Inquirer is required for this application.  If it is not included in the original npm package, then you can download it using
```
npm install inquirer 
```
- in the terminal.  Inquirer provides the prompts so that the user can respond to the application. 
- [MySQL Workbench](https://dev.mysql.com/downloads/workbench/ "Download MySQL Workbench") (optional) - A handy visual database design tool that can be useful for creating and mantaining databases. The [Workbench Manual](https://dev.mysql.com/doc/workbench/en/wb-mysql-connections-new.html "To Manual") provides helpful steps for making the initial configuration to use MySQL on your local machine.

### Downloading This Application
To use this application:

1. Install Node.js, npm, and MySQL. For instructions, see the Technologies Used section below.
- Next, clone this repo to your local machine:
```
git clone git@github.com:jmarrano09/node_storefront.git
```
2. Open the repo and execute in the bash terminal. Doing so should install the npm, inquirer, and MySQL npm packages:
```
npm i
```
3. Using SQL management tools such as [MySQL Workbench](https://dev.mysql.com/downloads/workbench/ "Download MySQL Workbench"), create the database by running the schema.sql and seed.sql commands to populate your database.

4. Run one of the features listed below.

### Features Overview

#### Customer View Only
This feature can be accessed from the terminal with:
```
node bamazonCustomer.js
```

This is the customer-facing UI for Bamazon. Users can view available items, and submit orders for products (and specify quantity). If the store holds a sufficient quantity of a requested item, the purchase is processed, and the user is shown how much the transacation cost.


#### Manager View Only
This feature can be accessed from the terminal with:
```
node bamazonManager.js
```

The Manager feature allows users to adjust intentory by reviewing the product line, adding new products, or updating the quantity of a product. [(See bamazonManager.js in action)]



#### Supervisor
This feature can be accessed from the terminal with:
```
node bamazonSupervisor.js
```
The Supervisor feature allows a user to view sales activity by department, compare it to expected to revenue targets, and add new departments. 

#### Entire App View
This feature can be accessed from the terminal with:
```
node bamazonApp.js
```


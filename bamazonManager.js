const sql = require('mysql');
const inquirer = require("inquirer");


var con = sql.createConnection({
    host: "localhost",
    user: "root",
    port: 3306,
    database: "bamazon"
});

// connect to the mysql server and sql database
con.connect(function(err) {
    if (err) throw err;
});


// Main menu options
function promptManagerAction() {

    inquirer.prompt([
        {
            type: 'list',
            name: 'option',
            message: 'Please select an option:',
            choices: ['View Products for Sale', 'View Low Inventory', 'View High Inventory', 'Add to Inventory', 'Add New Product'],
            filter: function (val) {
                if (val === 'View Products for Sale') {
                    return 'sale';
                } else if (val === 'View Low Inventory') {
                    return 'lowInventory';
                } else if (val === 'View High Inventory') {
                    return 'highInventory';
                } else if (val === 'Add to Inventory') {
                    return 'addInventory';
                } else if (val === 'Add New Product') {
                    return 'newProduct';
                } else {
                    console.log('ERROR: Unsupported operation!');
                    exit(1);
                }
            }
        }
    ]).then(function(input) {

        if (input.option ==='sale') {
            displayInventory();
        } else if (input.option === 'lowInventory') {
            displayLowInventory();
        } else if (input.option === 'highInventory') {
            displayHighInventory();
        } else if (input.option === 'addInventory') {
            addInventory();
        } else if (input.option === 'newProduct') {
            createNewProduct();
        } else {
            
            console.log('ERROR: Unsupported operation!');
            exit(1);
        }
    })
}

// shows current inventory from the database 
function displayInventory() {
    
    queryStr = 'SELECT * FROM products';

    con.query(queryStr, function(err, data) {
        if (err) throw err;

        console.log('Existing Inventory: ');
        console.log('...................\n');

        var tableData = '';
        for (var i = 0; i < data.length; i++) {
            tableData = '';
            tableData += 'Item ID: ' + data[i].item_id + '  //  ';
            tableData += 'Product Name: ' + data[i].product_name + '  //  ';
            tableData += 'Department: ' + data[i].department_name + '  //  ';
            tableData += 'Price: $' + data[i].price + '  //  ';
            tableData += 'Quantity in stock: ' + data[i].stock_quantity + '\n';

            console.log(tableData);
        }

        console.log("---------------------------------------------------------------------\n");

        con.end();
    })
}

// will display a list of products BELOW 50
function displayLowInventory() {

    queryStr = 'SELECT * FROM products WHERE stock_quantity < 50';

    con.query(queryStr, function(err, data) {
        if (err) throw err;

        console.log('Low Inventory Items (below 100): ');
        console.log('................................\n');

        var tableData = '';
        for (var i = 0; i < data.length; i++) {
            tableData = '';
            tableData += 'Item ID: ' + data[i].item_id + '  //  ';
            tableData += 'Product Name: ' + data[i].product_name + '  //  ';
            tableData += 'Department: ' + data[i].department_name + '  //  ';
            tableData += 'Price: $' + data[i].price + '  //  ';
            tableData += 'Quantity: ' + data[i].stock_quantity + '\n';

            console.log(tableData);
        }

        console.log("---------------------------------------------------------------------\n");

        con.end();
    })
}

// will display a list of products ABOVE 50
function displayHighInventory() {

    queryStr = 'SELECT * FROM products WHERE stock_quantity > 50';

    con.query(queryStr, function(err, data) {
        if (err) throw err;

        console.log('High Inventory Items (above 50): ');
        console.log('................................\n');

        var tableData = '';
        for (var i = 0; i < data.length; i++) {
            tableData = '';
            tableData += 'Item ID: ' + data[i].item_id + '  //  ';
            tableData += 'Product Name: ' + data[i].product_name + '  //  ';
            tableData += 'Department: ' + data[i].department_name + '  //  ';
            tableData += 'Price: $' + data[i].price + '  //  ';
            tableData += 'Quantity: ' + data[i].stock_quantity + '\n';

            console.log(tableData);
        }

        console.log("---------------------------------------------------------------------\n");

        con.end();
    })
}

// makes sure that the user is supplying only positive integers for their inputs
function validateInteger(value) {
    var integer = Number.isInteger(parseFloat(value));
    var sign = Math.sign(value);

    if (integer && (sign === 1)) {
        return true;
    } else {
        return 'Please enter a whole non-zero number.';
    }
}

// makes sure that the user is supplying only positive numbers for their inputs
function validateNumeric(value) {
    // Value must be a positive number
    var number = (typeof parseFloat(value)) === 'number';
    var positive = parseFloat(value) > 0;

    if (number && positive) {
        return true;
    } else {
        return 'Please enter a positive number for the unit price.'
    }
}

// adds additional quantity to an EXISTING item 
function addInventory() {

    // Prompt the user to select an item
    inquirer.prompt([
        {
            type: 'input',
            name: 'item_id',
            message: 'Please enter the Item ID for a current item to update stock quantity.',
            validate: validateInteger,
            filter: Number
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'How many would you like to add?',
            validate: validateInteger,
            filter: Number
        }
    ]).then(function(input) {
        // console.log('Manager has selected: \n    item_id = '  + input.item_id + '\n    additional quantity = ' + input.quantity);

        var item = input.item_id;
        var addQuantity = input.quantity;

        // Query db to confirm that the given item ID exists and to determine the current stock_count
        var queryStr = 'SELECT * FROM products WHERE ?';

        con.query(queryStr, {item_id: item}, function(err, data) {
            if (err) throw err;

            // If the user has selected an invalid item ID, data attay will be empty
            // console.log('data = ' + JSON.stringify(data));

            if (data.length === 0) {
                console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
                addInventory();

            } else {
                var productData = data[0];

                console.log('Updating Inventory...');

                // Construct the updating query string
                var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity + addQuantity) + ' WHERE item_id = ' + item;

                // Update the inventory
                con.query(updateQueryStr, function(err, data) {
                    if (err) throw err;

                    console.log('Stock count for Item ID ' + item + ' has been updated to ' + (productData.stock_quantity + addQuantity) + '.');
                    console.log("\n---------------------------------------------------------------------\n");

                    con.end();
                })
            }
        })
    })
}

//  adds a NEW product to the inventory
function createNewProduct() {
    
    inquirer.prompt([
        {
            type: 'input',
            name: 'product_name',
            message: 'Please enter the new product name.',
        },
        {
            type: 'input',
            name: 'department_name',
            message: 'Which department does the new product belong to?',
        },
        {
            type: 'input',
            name: 'price',
            message: 'What is the price per unit?',
            validate: validateNumeric
        },
        {
            type: 'input',
            name: 'stock_quantity',
            message: 'How many items are in stock?',
            validate: validateInteger
        }
    ]).then(function(input) {
        // console.log('input: ' + JSON.stringify(input));

        console.log('Adding New Item: \n    product_name = ' + input.product_name + '\n' +  
                                       '    department_name = ' + input.department_name + '\n' +  
                                       '    price = ' + input.price + '\n' +  
                                       '    stock_quantity = ' + input.stock_quantity);

        // Create the insertion query string
        var queryStr = 'INSERT INTO products SET ?';

        // Add new product to the db
        con.query(queryStr, input, function (error, results, fields) {
            if (error) throw error;

            console.log('New product has been added to the inventory under Item ID ' + results.insertId + '.');
            console.log("\n---------------------------------------------------------------------\n");

            // End the database connection
            con.end();
        });
    })
}

// runBamazon will execute the main application logic
function runBamazon() {
    // console.log('___ENTER runBamazon___');

    // Prompt manager for input
    promptManagerAction();
}

// Run the application logic
runBamazon();
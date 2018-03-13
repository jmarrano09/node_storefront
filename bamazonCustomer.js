const sql = require('mysql');
const inquirer = require("inquirer");


var con = sql.createConnection({
    host: "local2",
    user: "root",
    port: 3306,
    database: "bamazon"
});

// connect to the mysql server and sql database
con.connect(function(err) {
    if (err) throw err;
});


// makes sure that the user is supplying only positive integers for their inputs
function validateInput(value) {
    var integer = Number.isInteger(parseFloat(value));
    var sign = Math.sign(value);

    if (integer && (sign === 1)) {
        return true;
    } else {
        return 'Please enter a whole non-zero number.';
    }
}

// will prompt the user for the item/quantity they would like to purchase
function promptUserPurchase() {

    // Prompt the user to select an item
    inquirer.prompt([
        {
            type: 'input',
            name: 'item_id',
            message: 'Please enter the Item ID which you would like to purchase.',
            validate: validateInput,
            filter: Number
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'How many do you need?',
            validate: validateInput,
            filter: Number
        }
    ]).then(function(input) {
        var item = input.item_id;
        var quantity = input.quantity;

        var queryStr = 'SELECT * FROM products WHERE ?';

        con.query(queryStr, {item_id: item}, function(err, data) {
            if (err) throw err;

            if (data.length === 0) {
                console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
                displayInventory();

            } else {
                var productData = data[0];

                // If the quantity requested by the user is in stock
                if (quantity <= productData.stock_quantity) {
                    console.log('Congratulations, the product you requested is in stock! Placing order!');

                    // Construct the updating query string
                    var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;

                    // Update the inventory
                    con.query(updateQueryStr, function(err, data) {
                        if (err) throw err;

                        console.log('Your order has been placed! Your total is $' + productData.price * quantity);
                        console.log('Thank you for shopping with us!');
                        console.log("\n---------------------------------------------------------------------\n");

                        // End the database connection
                        con.end();
                    })
                } else {
                    console.log('Insufficient quantity!');
                    console.log('Please modify your order.');
                    console.log("\n---------------------------------------------------------------------\n");

                    displayInventory();
                }
            }
        })
    })
}

// will retrieve the current inventory from the database and output it to the console
function displayInventory() {
    
    queryStr = 'SELECT * FROM products';

    // Make the db query
    con.query(queryStr, function(err, data) {
        if (err) throw err;

        // gives a visual table
        console.log('Existing Inventory: ');
        console.log('...................\n');

        // gives a visual table
        var tableData = '';
        for (var i = 0; i < data.length; i++) {
            tableData = '';
            tableData += 'Item ID: ' + data[i].item_id + '  //  ';
            tableData += 'Product Name: ' + data[i].product_name + '  //  ';
            tableData += 'Department: ' + data[i].department_name + '  //  ';
            tableData += 'Price: $' + data[i].price + '\n';
            tableData += 'Quantity in stock: ' + data[i].stock_quantity + '\n';

            console.log(tableData);
        }

        console.log("---------------------------------------------------------------------\n");

        promptUserPurchase();
    })
}

// execute the main application logic
function runBamazon() {

    // Display the available inventory
    displayInventory();
}

// Run the app
runBamazon();

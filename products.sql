drop database if exists bamazon;
create database bamazon;

use bamazon;

CREATE TABLE products (
    item_id INT not null,
    product_name VARCHAR (45) not null,
    department_name VARCHAR (45) not null, 
    price DECIMAL (10,2) not null,
    stock_quantity INT (10) not null,
    primary key (item_id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1, "c-stand", "grip", 60, 100);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (2, "2K Fresnel", "light", 200, 0);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (3, "sony fs7", "camera", 8000,10);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (4, "LED", "light", 100, 30);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (5, "gobo arm", "grip", 70, 100);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (6, "open faced blondie", "light", 300, 20);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (7, "zeise", "lens", 2000, 5);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (8, "tungsten", "light", 150, 30);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (9, "7d canon", "camera", 3100, 2);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (10, "slate", "accessory", 8, 10);
USE demo;
CREATE TABLE employee(
	emp_id INT PRIMARY KEY AUTO_INCREMENT,
	emp_name VARCHAR(50) NOT NULL,
	emp_email VARCHAR(100) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP()
);

SELECT * FROM employee;

INSERT INTO employee(emp_name, emp_email) VALUES
('vishwas','vishwas@example.com'),
('johndoe','johndoe@example.com'),
('alice','alice@example.com'),
('roy', 'roy@example.com');

CREATE DATABASE Northwind;

USE Northwind;

SHOW TABLES;

DESCRIBE Customers;

SELECT * FROM Customers;
SELECT CustomerName, City FROM Customers;
SELECT CustomerName, City FROM Customers 
WHERE
City = 'Berlin';
SELECT CustomerName FROM Customers WHERE 
CustomerName LIKE 'A%';
SELECT CustomerName FROM Customers WHERE 
CustomerName LIKE 'A%' and City = 'Berlin';

SELECT * FROM Products;
SELECT * FROM Categories;

-- Products and Category they belong to
SELECT p.ProductID, p.ProductName, p.CategoryID, c.CategoryName
FROM Products p
INNER JOIN Categories c 
ON p.CategoryID = c.CategoryID ;
-- get all the customers and their order even if there is no order
SELECT COUNT(*) FROM Customers c ;
SELECT COUNT(DISTINCT CustomerID) FROM Orders o ;

WITH CustomerOrders AS (SELECT c.CustomerID AS cid, c.CustomerName AS cname, 
o.OrderID AS oid FROM
Customers c
LEFT JOIN Orders o 
ON c.CustomerID = o.CustomerID 
ORDER BY o.OrderID ASC) 
SELECT cid,cname,oid FROM CustomerOrders WHERE oid IS NULL;

INSERT INTO department (name)
VALUES ("Sales"),
("Finance"),
("Engineering"),
("Marketing");

INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 10000, 1),
("Associate Manager", 8000, 1),
("Sales Representative", 5000, 1),
("Financial Analyst", 7000, 2),
("Financial Manager", 10000, 2),
("Software Engineer", 9000, 3),
("DevOps Engineer", 8000, 3),
("Marketing Manager", 10000, 4),
("Marketing Assistant", 6000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
("John", "Doe", 1, NULL),
("Jane", "Doe", 2, 1),
("Mark", "Smith", 3, 2),
("Mary", "Johnson", 4, NULL),
("Alex", "Brown", 5, 4),
("David", "Lee", 6, 5),
("Emily", "Jones", 7, 6),
("Kevin", "Davis", 8, 6),
("Sarah", "Miller", 9, NULL),
("Michael", "Wilson", 9, 9);
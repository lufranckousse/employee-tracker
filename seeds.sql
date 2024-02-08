-- Insert departments
INSERT INTO department (name) VALUES
    ('Engineering'),
    ('Sales'),
    ('Marketing');

-- Insert roles
INSERT INTO role (title, salary, department_id) VALUES
    ('Software Engineer', 80000, 1),
    ('Sales Manager', 90000, 2),
    ('Marketing Coordinator', 60000, 3);

-- Insert employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ('John', 'Doe', 1, NULL), -- Assuming John Doe is a Software Engineer without a manager
    ('Jane', 'Smith', 2, NULL), -- Assuming Jane Smith is a Sales Manager without a manager
    ('Alice', 'Johnson', 3, 2); -- Assuming Alice Johnson is a Marketing Coordinator with Jane Smith as her manager

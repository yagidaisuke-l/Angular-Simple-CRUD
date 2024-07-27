CREATE DATABASE IF NOT EXISTS blog_db_local;

USE blog_db_local;

CREATE TABLE blog_title (
    id INT PRIMARY KEY,
    title VARCHAR(255)
);

INSERT INTO blog_title (id, title) VALUES (1, 'Title 1');
INSERT INTO blog_title (id, title) VALUES (2, 'Title 2');
INSERT INTO blog_title (id, title) VALUES (3, 'Title 3');
INSERT INTO blog_title (id, title) VALUES (4, 'Title 4');
INSERT INTO blog_title (id, title) VALUES (5, 'Title 5');
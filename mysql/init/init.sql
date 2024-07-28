CREATE DATABASE IF NOT EXISTS blog_app_local;

GRANT ALL PRIVILEGES ON blog_app_local.* TO 'user'@'%';
FLUSH PRIVILEGES;

USE blog_app_local;

CREATE TABLE blog_title (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255)
);

INSERT INTO blog_title (id, title) VALUES (1, 'Title 1');
INSERT INTO blog_title (id, title) VALUES (2, 'Title 2');
INSERT INTO blog_title (id, title) VALUES (3, 'Title 3');
INSERT INTO blog_title (id, title) VALUES (4, 'Title 4');
INSERT INTO blog_title (id, title) VALUES (5, 'Title 5');

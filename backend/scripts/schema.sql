DROP TABLE IF EXISTS dev_tools;

CREATE TABLE dev_tools (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    price VARCHAR(50),
    description TEXT,
    category VARCHAR(100),
    url TEXT,
    environment VARCHAR(100)
);
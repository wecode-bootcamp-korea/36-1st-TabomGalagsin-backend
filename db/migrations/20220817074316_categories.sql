-- migrate:up
CREATE TABLE `categories` (
    `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `categories` varchar(100) NOT NULL
)

-- migrate:down


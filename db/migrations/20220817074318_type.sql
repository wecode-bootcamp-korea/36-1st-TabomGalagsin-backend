-- migrate:up
CREATE TABLE `type` (
    `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `type` varchar(100) NOT NULL,
    `categories_id` int NOT NULL,
    FOREIGN KEY (`categories_id`) REFERENCES `categories` (`id`)
)

-- migrate:down


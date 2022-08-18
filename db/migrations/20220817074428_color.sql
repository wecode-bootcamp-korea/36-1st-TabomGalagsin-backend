-- migrate:up
CREATE TABLE `color` (
    `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `color_name` varchar(100) NOT NULL,
    `categories_id` int NOT NULL,
    FOREIGN KEY (`categories_id`) REFERENCES `categories` (`id`)
)

-- migrate:down


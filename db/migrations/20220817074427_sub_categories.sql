-- migrate:up
CREATE TABLE `sub_categories` (
    `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `sub_categories` varchar(100) NOT NULL,
    `main_categories_id` int NOT NULL,
    FOREIGN KEY (`main_categories_id`) REFERENCES `main_categories` (`id`)
)

-- migrate:down


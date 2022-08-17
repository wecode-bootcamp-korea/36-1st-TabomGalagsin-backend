-- migrate:up
CREATE TABLE `color` (
    `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `color_name` varchar(100) NOT NULL,
    `sub_categories_id` int NOT NULL,
    FOREIGN KEY (`sub_categories_id`) REFERENCES `sub_categories` (`id`)
)

-- migrate:down


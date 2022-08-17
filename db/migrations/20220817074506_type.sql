-- migrate:up
CREATE TABLE `type` (
    `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `type` varchar(100) NOT NULL,
    `product_id` int NOT NULL,
    `sub_categories_id` int NOT NULL,
    FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
    FOREIGN KEY (`sub_categories_id`) REFERENCES `sub_categories` (`id`)
)

-- migrate:down


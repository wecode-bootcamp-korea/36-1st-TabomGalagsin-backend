-- migrate:up
CREATE TABLE `color_table` (
    `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `product_id` int NOT NULL,
    `color_id` int NOT NULL,
    FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
    FOREIGN KEY (`color_id`) REFERENCES `color` (`id`)
)

-- migrate:down


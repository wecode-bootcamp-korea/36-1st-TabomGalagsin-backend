-- migrate:up
CREATE TABLE `order_items` (
    `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `product_id` int NOT NULL,
    `order_id` int NOT NULL,
    `order_status_id` int NOT NULL,
    `quantity` int NOT NULL,
    `total_price` decimal(9, 2) NOT NULL,
    FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
    FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
    FOREIGN KEY (`order_status_id`) REFERENCES `order_status` (`id`)
)

-- migrate:down


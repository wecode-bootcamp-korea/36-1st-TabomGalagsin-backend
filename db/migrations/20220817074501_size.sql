-- migrate:up
CREATE TABLE `size` (
    `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `size` varchar(100) NOT NULL,
    `product_id` int NOT NULL,
    FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
)

-- migrate:down


-- migrate:up
CREATE TABLE `product_image` (
    `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `image_url` varchar(200) NOT NULL,
    `is_main` boolean DEFAULT 0,
    `product_id` int NOT NULL,
    `color_id` int NOT NULL,
    FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
    FOREIGN KEY (`color_id`) REFERENCES `color` (`id`)
)

-- migrate:down


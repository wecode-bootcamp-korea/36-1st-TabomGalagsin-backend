-- migrate:up
CREATE TABLE `products` (
    `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` varchar(50) NOT NULL,
    `price` decimal(9, 2) NOT NULL,
    `is_new` boolean DEFAULT 0,
    `stock` int NOT NULL,
    `desc` text NOT NULL,
    `type_id` int NOT NULL,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`type_id`) REFERENCES `type` (`id`)
)

-- migrate:down


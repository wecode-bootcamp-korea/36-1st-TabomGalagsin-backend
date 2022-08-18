-- migrate:up
CREATE TABLE `order_status` (
    `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `order_status` varchar(50) NOT NULL
)

-- migrate:down


-- migrate:up
CREATE TABLE `users` (
    `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `first_name` varchar(50) NOT NULL,
    `last_name` varchar(50) NOT NULL,
    `nick_name` varchar(50) NOT NULL,
    `email` varchar(200) NOT NULL ,
    `password` varchar(200) NOT NULL,
    `address` varchar(1000) NOT NULL,
    `point` decimal(9, 2) NOT NULL DEFAULT 1000000,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE (email)
)


-- migrate:down


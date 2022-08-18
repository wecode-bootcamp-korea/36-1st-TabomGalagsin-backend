-- migrate:up
ALTER TABLE `products` CHANGE `desc` `description` text NOT NULL

-- migrate:down


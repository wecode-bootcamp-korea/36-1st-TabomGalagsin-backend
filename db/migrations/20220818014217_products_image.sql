-- migrate:up
ALTER TABLE `product_image` CHANGE `is_main` `is_thumbnail` boolean DEFAULT 0

-- migrate:down


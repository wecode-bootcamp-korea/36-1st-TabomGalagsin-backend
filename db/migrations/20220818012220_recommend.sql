-- migrate:up
ALTER TABLE `recommend` CHANGE `product_id` `color_table_id` int NOT NULL
-- migrate:down


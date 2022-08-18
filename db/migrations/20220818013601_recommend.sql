-- migrate:up
ALTER TABLE recommend add FOREIGN KEY (`color_table_id`) REFERENCES `colors_products` (`id`)
-- migrate:down


CREATE TABLE `categorias` (
   `id` int NOT NULL AUTO_INCREMENT,
   `name` varchar(45) NOT NULL,
   PRIMARY KEY (`id`)
 ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3

 CREATE TABLE `productos` (
   `id` int NOT NULL AUTO_INCREMENT,
   `name` varchar(45) NOT NULL,
   `description` varchar(100) DEFAULT NULL,
   `price` float NOT NULL,
   `Categorias_id` int NOT NULL,
   PRIMARY KEY (`id`,`Categorias_id`),
   KEY `fk_Productos_Categorías_idx` (`Categorias_id`),
   CONSTRAINT `fk_Productos_Categorías` FOREIGN KEY (`Categorias_id`) REFERENCES `categorias` (`id`)
 ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3
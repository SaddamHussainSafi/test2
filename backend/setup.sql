-- Create the database
CREATE DATABASE IF NOT EXISTS furandfeathers CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE furandfeathers;

-- Drop tables if they exist
DROP TABLE IF EXISTS activity_log;
DROP TABLE IF EXISTS favorites;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS adoption_applications;
DROP TABLE IF EXISTS pets;
DROP TABLE IF EXISTS users;

-- Create the users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(120) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('SUPER_ADMIN', 'ADMIN', 'SHELTER', 'ADOPTER') DEFAULT 'ADOPTER',
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the pets table
CREATE TABLE pets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  age INT,
  breed VARCHAR(100),
  description TEXT,
  image_url VARCHAR(255),
  status ENUM('AVAILABLE', 'PENDING', 'ADOPTED') DEFAULT 'AVAILABLE',
  shelter_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (shelter_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create the adoption_applications table
CREATE TABLE adoption_applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  adopter_id INT NOT NULL,
  pet_id INT NOT NULL,
  status ENUM('PENDING', 'APPROVED', 'REJECTED') DEFAULT 'PENDING',
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (adopter_id) REFERENCES users(id),
  FOREIGN KEY (pet_id) REFERENCES pets(id)
);

-- Create the messages table
CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sender_id INT NOT NULL,
  receiver_id INT NOT NULL,
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sender_id) REFERENCES users(id),
  FOREIGN KEY (receiver_id) REFERENCES users(id)
);

-- Create the favorites table
CREATE TABLE favorites (
  id INT AUTO_INCREMENT PRIMARY KEY,
  adopter_id INT,
  pet_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (adopter_id) REFERENCES users(id),
  FOREIGN KEY (pet_id) REFERENCES pets(id)
);

-- Create the activity_log table
CREATE TABLE activity_log (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  action VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Insert the Super Admin
INSERT INTO users (id, name, email, password, role, verified)
VALUES (
  1,
  'Super Admin',
  'superadmin@furandfeathers.com',
  '$2a$10$h7r5sZbK9mAqx3uJ3bO1MuAErhLp3Jg6p7S21vfrF5o6T0Wb08TfS',
  'SUPER_ADMIN',
  true
)
ON DUPLICATE KEY UPDATE id = id;

-- Add indices
CREATE INDEX idx_pets_shelter_id ON pets(shelter_id);
CREATE INDEX idx_applications_adopter_id ON adoption_applications(adopter_id);
CREATE INDEX idx_applications_pet_id ON adoption_applications(pet_id);
CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_messages_receiver_id ON messages(receiver_id);

-- Create views
DROP VIEW IF EXISTS shelter_stats;
DROP VIEW IF EXISTS admin_overview;
DROP VIEW IF EXISTS admin_dashboard_view;
DROP VIEW IF EXISTS shelter_dashboard_view;

CREATE VIEW shelter_stats AS
SELECT u.id AS shelter_id,
       COUNT(p.id) AS total_pets,
       SUM(p.status = 'ADOPTED') AS adopted_pets,
       SUM(p.status = 'AVAILABLE') AS available_pets
FROM users u
LEFT JOIN pets p ON u.id = p.shelter_id
WHERE u.role = 'SHELTER'
GROUP BY u.id;

CREATE VIEW admin_overview AS
SELECT
  (SELECT COUNT(*) FROM users) AS total_users,
  (SELECT COUNT(*) FROM pets) AS total_pets,
  (SELECT COUNT(*) FROM adoption_applications WHERE status='APPROVED') AS adoptions_completed;

-- Create trigger to prevent super admin delete
DROP TRIGGER IF EXISTS prevent_super_admin_delete;

DELIMITER $$
CREATE TRIGGER prevent_super_admin_delete
BEFORE DELETE ON users
FOR EACH ROW
BEGIN
    IF OLD.id = 1 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Super Admin cannot be deleted.';
    END IF;
END$$
DELIMITER ;

-- Optional seed data
INSERT INTO users (id, name, email, password, role, verified)
VALUES
(5, 'Test Shelter', 'test@shelter.com', '$2a$10$dummyhash', 'SHELTER', true)
ON DUPLICATE KEY UPDATE id = id;

INSERT INTO users (id, name, email, password, role, verified)
VALUES
(2, 'Happy Paws Shelter', 'happy@shelter.com', '$2a$10$dummyhash', 'SHELTER', true)
ON DUPLICATE KEY UPDATE id = id;

INSERT INTO users (name, email, password, role, verified)
VALUES
('John Doe', 'john@adopter.com', '$2a$10$dummyhash', 'ADOPTER', true);

INSERT INTO pets (name, breed, age, status, shelter_id, image_url)
VALUES
('Bella', 'Golden Retriever', 2, 'AVAILABLE', 2, 'http://localhost:8080/uploads/pets_1.png'),
('Max', 'Bulldog', 3, 'ADOPTED', 2, 'http://localhost:8080/uploads/pets_2.png'),
('Cat 1', 'Mixed', 2, 'AVAILABLE', 5, 'http://localhost:8080/uploads/pets_3.jpg'),
('Cat 2', 'Mixed', 1, 'AVAILABLE', 5, 'http://localhost:8080/uploads/pets_4.jpg'),
('Cat 3', 'Mixed', 3, 'AVAILABLE', 5, 'http://localhost:8080/uploads/pets_5.jpg'),
('Cat 4', 'Mixed', 2, 'AVAILABLE', 5, 'http://localhost:8080/uploads/pets_6.jpg'),
('Cat 5', 'Mixed', 1, 'AVAILABLE', 5, 'http://localhost:8080/uploads/pets_7.jpg'),
('Cat 6', 'Mixed', 4, 'AVAILABLE', 5, 'http://localhost:8080/uploads/pets_8.jpg'),
('Cat 7', 'Mixed', 2, 'AVAILABLE', 5, 'http://localhost:8080/uploads/pets_9.jpg'),
('Cat 8', 'Mixed', 3, 'AVAILABLE', 5, 'http://localhost:8080/uploads/pets_10.jpg'),
('Cat 9', 'Mixed', 1, 'AVAILABLE', 5, 'http://localhost:8080/uploads/pets_11.jpg'),
('Cat 10', 'Mixed', 2, 'AVAILABLE', 5, 'http://localhost:8080/uploads/pets_12.jpg'),
('Cat 11', 'Mixed', 3, 'AVAILABLE', 5, 'http://localhost:8080/uploads/pets_13.jpg'),
('Cat 12', 'Mixed', 1, 'AVAILABLE', 5, 'http://localhost:8080/uploads/pets_14.jpg'),
('Cat 13', 'Mixed', 2, 'AVAILABLE', 5, 'http://localhost:8080/uploads/pets_15.jpg'),
('Cat 14', 'Mixed', 4, 'AVAILABLE', 5, 'http://localhost:8080/uploads/pets_16.jpg'),
('Cat 15', 'Mixed', 3, 'AVAILABLE', 5, 'http://localhost:8080/uploads/pets_17.jpg'),
('Dog 1', 'Mixed', 2, 'AVAILABLE', 5, 'http://localhost:8080/uploads/pets_18.jpg'),
('Dog 2', 'Mixed', 1, 'AVAILABLE', 5, 'http://localhost:8080/uploads/pets_19.jpg'),
('Dog 3', 'Mixed', 3, 'AVAILABLE', 5, 'http://localhost:8080/uploads/pets_20.jpg'),
('Dog 4', 'Mixed', 2, 'AVAILABLE', 5, 'http://localhost:8080/uploads/pets_21.jpg'),
('Dog 5', 'Mixed', 1, 'AVAILABLE', 5, 'http://localhost:8080/uploads/pets_22.jpg'),
('Dog 6', 'Mixed', 4, 'AVAILABLE', 5, 'http://localhost:8080/uploads/pets_23.jpg'),
('Dog 7', 'Mixed', 2, 'AVAILABLE', 5, 'http://localhost:8080/uploads/pets_24.jpg'),
('Dog 8', 'Mixed', 3, 'AVAILABLE', 5, 'http://localhost:8080/uploads/pets_25.jpg'),
('Dog 9', 'Mixed', 1, 'AVAILABLE', 5, 'http://localhost:8080/uploads/pets_26.jpg'),
('Dog 10', 'Mixed', 2, 'AVAILABLE', 5, 'http://localhost:8080/uploads/pets_27.jpg'),
('Dog 11', 'Mixed', 3, 'AVAILABLE', 5, 'http://localhost:8080/uploads/pets_28.jpg'),
('Dog 12', 'Mixed', 1, 'AVAILABLE', 5, 'http://localhost:8080/uploads/pets_29.jpg'),
('Dog 13', 'Mixed', 2, 'AVAILABLE', 5, 'http://localhost:8080/uploads/pets_30.jpg');
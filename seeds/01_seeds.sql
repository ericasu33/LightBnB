INSERT INTO users (name, email, password) 
  VALUES ('Tora Su', 'torasu@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Leon Su', 'leonsu@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Yuki Su', 'yukisu@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');



INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_space, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code)
  VALUES (1, 'Su Residence', 'description', '123@photo.com', '111@photo.com', 20, 1, 1, 2, 'Canada', '111 Thomson Street', 'Burnaby', 'BC', 'V11 22W'),
  (1, 'John Residence', 'description', '223@photo.com', '222@photo.com', 15, 2, 0, 3, 'Canada', '59 Cross Road', 'Vancouver', 'BC', 'W00 5X7'),
  (1, 'Smith Residence', 'description', '333@photo.com', '555@photo.com', 100, 3, 5, 3, 'Canada', '223 Burren Avenue', 'Surrey', 'BC', 'V00 X2P');


INSERT INTO reservations (start_date, end_date, property_id, guest_id)
  VALUES ('2020-12-21', '2021-01-01', 1, 2),
  ('2020-10-21', '2020-11-01', 1, 1),
  ('2020-12-10', '2021-01-01', 2, 3);


INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
  VALUES (1, 1, 2, 3, 'message'),
  (2, 1, 1, 4, 'message'),
  (3, 2, 3, 1, 'message');


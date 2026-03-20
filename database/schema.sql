-- Table of schools
CREATE TABLE schools (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    latitude NUMERIC(9,6) NOT NULL,
    longitude NUMERIC(9,6) NOT NULL,
    photo_url TEXT
);

-- Table of promised improvements
CREATE TABLE promises (
    id SERIAL PRIMARY KEY,
    school_id INTEGER REFERENCES schools(id) ON DELETE CASCADE,
    description TEXT,
    status VARCHAR(20) DEFAULT 'Pending'
);

-- Table of citizen reports
CREATE TABLE reports (
    id SERIAL PRIMARY KEY,
    school_id INTEGER REFERENCES schools(id) ON DELETE CASCADE,
    status VARCHAR(20) NOT NULL,
    comment TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Table of report photos
CREATE TABLE report_photos (
    id SERIAL PRIMARY KEY,
    report_id INTEGER REFERENCES reports(id) ON DELETE CASCADE,
    photo_url TEXT NOT NULL
);


INSERT INTO schools (id, name, latitude, longitude, photo_url) VALUES
(1, 'School', 41.300000, 69.200000, 'https://example.com/school.jpg'),
(2, 'Tennis court', 41.300000, 69.300000, 'https://example.com/tennis_court.jpg'),
(3, 'Park', 41.350000, 69.250000, 'https://example.com/park.jpg'),
(4, 'Hospital', 41.330000, 69.280000, 'https://example.com/hospital.jpg');

INSERT INTO promises (id, school_id, description, status) VALUES
(1, 1, 'Toilet renovation', 'Completed'),
(2, 1, 'Soap dispensers', 'Problem'),
(3, 2, 'New desks', 'Completed'),
(4, 2, 'Library update', 'Problem'),
(5, 3, 'Playground upgrade', 'Problem');
(6, 4, 'Install new library computers', 'Completed'),
(7, 4, 'Repair playground equipment', 'Completed');

INSERT INTO reports (id, school_id, status, comment, created_at) VALUES
(1, 1, 'Completed', 'Renovation finished successfully', '2026-03-13 10:16:07'),
(2, 1, 'Problem', 'Soap dispensers missing', '2026-03-13 10:16:07'),
(3, 2, 'Completed', 'New desks installed', '2026-03-13 10:16:07'),
(4, 2, 'Problem', 'Library still empty', '2026-03-13 10:16:07'),
(5, 3, 'Problem', 'Playground not touched', '2026-03-13 10:16:07');

INSERT INTO report_photos (id, report_id, photo_url) VALUES
(1, 1, 'https://example.com/photos/school/toilet1.jpg'),
(2, 2, 'https://example.com/photos/school/soap1.jpg'),
(3, 4, 'https://example.com/photos/tennis_court/library1.jpg'),
(4, 5, 'https://example.com/photos/park/playground1.jpg');
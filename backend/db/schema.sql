CREATE DATABASE PinkPays;

\c PinkPays

-- Users table to store basic user information
CREATE TABLE PinkPays_users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE NOT NULL,
    password_digest TEXT NOT NULL,
    wallet_info TEXT
);

-- Transactions table to track who owes whom and the status of the debt
CREATE TABLE PinkPays_transactions (
    id SERIAL PRIMARY KEY,
    payer_id INT REFERENCES PinkPays_users(id) ON DELETE CASCADE,  -- The user who owes money
    payee_id INT REFERENCES PinkPays_users(id) ON DELETE CASCADE,  -- The user owed money
    amount NUMERIC(10, 2) NOT NULL,                               -- Amount owed
    status TEXT NOT NULL CHECK (status IN ('paid', 'unpaid')),    -- Status of the payment
    description TEXT,                                             -- Optional description of the debt
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP                -- Timestamp of transaction creation
);

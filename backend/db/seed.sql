INSERT INTO PinkPays_users (email, username, password_digest, wallet_info)
VALUES
    ('john@example.com', 'JohnDoe', 'hashed_password_1', 'wallet_1'),
    ('jane@example.com', 'JaneDoe', 'hashed_password_2', 'wallet_2');

INSERT INTO PinkPays_transactions (payer_id, payee_id, amount, status, description)
VALUES
    (1, 2, 50.00, 'unpaid', 'Dinner split');

const db = require('../db');

// Create a new user
function createUser(email, username, hash) {
    let sql = `
        INSERT INTO pinkpays_users
        (email, username, password_digest)
        VALUES ($1, $2, $3)
        RETURNING *
    `;
    return db.query(sql, [email, username, hash])
        .then(res => res.rows);
}

// Update user details (email, username, password)
function updateUser({ email, username = null, hash = null }) {
    let sql = `UPDATE pinkpays_users SET `;
    const params = [];
    let paramIndex = 1;

    if (email !== null) {
        sql += `email = $${paramIndex}, `;
        params.push(email);
        paramIndex++;
    }
    if (username !== null) {
        sql += `username = $${paramIndex}, `;
        params.push(username);
        paramIndex++;
    }
    if (hash !== null) {
        sql += `password_digest = $${paramIndex}, `;
        params.push(hash);
        paramIndex++;
    }

    sql = sql.replace(/, $/, '');
    sql += ` WHERE email = $${paramIndex}`;

    return db.query(sql, [...params, email])
        .then(res => res.rows);
}

// Delete a user by ID
function deleteUser(id) {
    let sql = `
        DELETE FROM pinkpays_users WHERE id = $1;
    `;
    return db.query(sql, [id])
        .then(res => res.rows);
}

// Find a user by email
function findByEmail(email) {
    let sql = `
    SELECT * FROM pinkpays_users WHERE email = $1;
    `;
    return db.query(sql, [email])
        .then(result => {
            if (result.rowCount === 0) {
                let err = new Error('resource not found');
                err.status = 400;
                throw err;
            }
            return result.rows[0];
        });
}

// Find a user by username
function findByUsername(username) {
    let sql = `
    SELECT * FROM pinkpays_users WHERE username = $1;
    `;
    return db.query(sql, [username])
        .then(result => {
            if (result.rowCount === 0) {
                let err = new Error('resource not found');
                err.status = 400;
                throw err;
            }
            return result.rows[0];
        });
}

// Create a debt transaction (payer, payee, amount)
function createTransaction(payerId, payeeId, amount) {
    let sql = `
        INSERT INTO pinkpays_transactions
        (payer_id, payee_id, amount, status)
        VALUES ($1, $2, $3, 'unpaid')
        RETURNING *
    `;
    return db.query(sql, [payerId, payeeId, amount])
        .then(res => res.rows);
}

// Update the status of a transaction (mark as paid)
function updateTransactionStatus(transactionId, status) {
    let sql = `
        UPDATE pinkpays_transactions
        SET status = $1
        WHERE id = $2
        RETURNING *
    `;
    return db.query(sql, [status, transactionId])
        .then(res => res.rows);
}

// Delete a transaction by ID
function deleteTransaction(transactionId) {
    let sql = `
        DELETE FROM pinkpays_transactions WHERE id = $1;
    `;
    return db.query(sql, [transactionId])
        .then(res => res.rows);
}

// Find all debts for a user (as a payer)
function findDebtsForUser(payerId) {
    let sql = `
        SELECT * FROM pinkpays_transactions
        WHERE payer_id = $1 AND status = 'unpaid';
    `;
    return db.query(sql, [payerId])
        .then(res => res.rows);
}

// Find all debts a user is owed (as a payee)
function findOwedByUser(payeeId) {
    let sql = `
        SELECT * FROM pinkpays_transactions
        WHERE payee_id = $1 AND status = 'unpaid';
    `;
    return db.query(sql, [payeeId])
        .then(res => res.rows);
}

// Get total amount owed by a user
function getTotalDebt(payerId) {
    let sql = `
        SELECT SUM(amount) AS total_owed
        FROM pinkpays_transactions
        WHERE payer_id = $1 AND status = 'unpaid';
    `;
    return db.query(sql, [payerId])
        .then(res => res.rows[0]);
}

const User = {
    createUser,
    updateUser,
    deleteUser,
    findByEmail,
    findByUsername,
    createTransaction,
    updateTransactionStatus,
    deleteTransaction,
    findDebtsForUser,
    findOwedByUser,
    getTotalDebt
};

module.exports = User;

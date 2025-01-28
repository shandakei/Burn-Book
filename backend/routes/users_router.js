const express = require('express');
const router = express.Router();
const User = require('../models/Users');

// Route to get user by email
router.get('/pinkpays/user/:email', (req, res) => {
    return User.findByEmail(req.params.email)
        .then(user => res.json(user))
        .catch(err => res.status(500).json({ message: 'User not found', error: err }));
});

// Route to create a debt transaction (payer, payee, amount)
router.post('/pinkpays/transaction', (req, res) => {
    const { payerId, payeeId, amount } = req.body;
    return User.createTransaction(payerId, payeeId, amount)
        .then(transaction => res.status(201).json(transaction))
        .catch(err => res.status(500).json({ message: 'Transaction could not be created', error: err }));
});

// Route to update the status of a transaction (mark as paid)
router.put('/pinkpays/transaction/:transactionId', (req, res) => {
    const { transactionId } = req.params;
    const { status } = req.body;
    return User.updateTransactionStatus(transactionId, status)
        .then(transaction => res.json(transaction))
        .catch(err => res.status(500).json({ message: 'Transaction status update failed', error: err }));
});

// Route to delete a transaction by ID
router.delete('/pinkpays/transaction/:transactionId', (req, res) => {
    const { transactionId } = req.params;
    return User.deleteTransaction(transactionId)
        .then(transaction => res.json(transaction))
        .catch(err => res.status(500).json({ message: 'Transaction could not be deleted', error: err }));
});

// Route to get total debt owed by a user
router.get('/pinkpays/user/:userId/debt', (req, res) => {
    const { userId } = req.params;
    return User.getTotalDebt(userId)
        .then(debt => res.json(debt))
        .catch(err => res.status(500).json({ message: 'Could not fetch total debt', error: err }));
});

// Route to get all debts for a user (as a payer)
router.get('/pinkpays/user/:userId/debts', (req, res) => {
    const { userId } = req.params;
    return User.findDebtsForUser(userId)
        .then(debts => res.json(debts))
        .catch(err => res.status(500).json({ message: 'Could not fetch debts', error: err }));
});

// Route to get all debts a user is owed (as a payee)
router.get('/pinkpays/user/:userId/owed', (req, res) => {
    const { userId } = req.params;
    return User.findOwedByUser(userId)
        .then(owed => res.json(owed))
        .catch(err => res.status(500).json({ message: 'Could not fetch owed debts', error: err }));
});

// Route to delete a user by ID
router.delete('/pinkpays/user/delete/:user_id', (req, res) => {
    const { user_id } = req.params;
    return User.deleteUser(user_id)
        .then(user => res.json(user))
        .catch(err => res.status(500).json({ message: 'User could not be deleted', error: err }));
});


module.exports = router;

const Expense = require('../models/expenseModel');

// Create a new expense
exports.createExpense = async (req, res) => {
    try {
        const newExpense = await Expense.create(req.body);
        res.status(201).json({
            status: 'success',
            data: newExpense
        });
    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: err.message
        });
    }
};


exports.getExpensesByUser = async (req, res) => {
    try {
   
        const { id, date } = req.body;

        // Parse the month parameter to get the start and end dates
        const startDate = new Date(date);
        const endDate = new Date(new Date(date).setMonth(startDate.getMonth() + 1));

        // Find expenses for the user within the specified month
        const expenses = await Expense.find({
            user: id,
            date: {
                $gte: startDate,
                $lt: endDate
            }
        });

        res.status(200).json({
            status: 'success',
            data: expenses
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
};


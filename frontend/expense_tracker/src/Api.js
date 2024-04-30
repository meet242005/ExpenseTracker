// const SERVER_URL = 'https://expensetracker-2ru5.onrender.com/api/';

const SERVER_URL = 'http://localhost:5001/api/';
const fetchWithPost = async (url, body) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw new Error(error.message);
    }
};

export const createUser = async (userData) => {
    return await fetchWithPost(`${SERVER_URL}createUser`, userData);
};

export const loadUser = async (userId) => {
    return await fetchWithPost(`${SERVER_URL}loadUser`, { id: userId });
};

export const updateBudget = async (userId, monthlyBudget, categoryBudgets) => {
    return await fetchWithPost(`${SERVER_URL}updateBudget`, { id: userId, monthlyBudget, categoryBudgets });
};

export const loadStats = async (userId) => {
    return await fetchWithPost(`${SERVER_URL}loadStats`, { id: userId });
};

export const createExpense = async (expenseData) => {
    return await fetchWithPost(`${SERVER_URL}createExpense`, expenseData);
};

export const getExpensesByUser = async (userId, date) => {
    return await fetchWithPost(`${SERVER_URL}getExpensesByUser`, { id: userId, date });
};

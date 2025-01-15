const db = require('../database/db');

exports.getProducts = (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) {
        return res.status(500).json({ message: 'Erro ao buscar produtos.' });
        }
        res.status(200).json(results);
    });
    }

exports.addProduct = (req, res) => {
    const { name, price, quantity } = req.body;

    db.query(
    'INSERT INTO products (name, price, quantity) VALUES (?, ?, ?)',
    [name, price, quantity],
    (err) => {
        if (err) {
        return res.status(500).json({ message: 'Erro ao cadastrar produto.' });
        }
        res.status(201).json({ message: 'Produto cadastrado com sucesso!' });
    }
    );
    }
    
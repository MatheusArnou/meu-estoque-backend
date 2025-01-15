const bcrypt = require('bcryptjs');
const db = require('../database/db');

exports.registerUser = (req, res) => {
    const { name, email, password } = req.body;
  
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
  
    db.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword],
      (err) => {
        if (err) {
          return res.status(500).json({ message: 'Erro ao cadastrar usuário.' });
        }
        res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
      }
    );
  };
  
  exports.loginUser = (req, res) => {
    const { email, password } = req.body;
  
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
      if (err || results.length === 0) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }
  
      const user = results[0];
      const isPasswordValid = bcrypt.compareSync(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Senha inválida.' });
      }
  
      res.status(200).json({ message: 'Login bem-sucedido!' });
    });
  };
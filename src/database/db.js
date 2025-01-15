const mysql = require ('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'estoque'
    });

    db.connect((err) => {
        if(err){
            console.error('Erro ao conectar ao banco de dados:', err)
        }else{
            console.log('Conexão com o banco de dados bem-sucedida!');;
        }
    })

    module.exports = db;
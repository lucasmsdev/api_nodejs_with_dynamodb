const express = require('express');
const app = express();
const port = 8080;
const host = '0.0.0.0';
const http = require('http');

const bodyParser = require('body-parser');

const getPublicIPv4 = () => {
    return new Promise((resolve, reject) => {
        const options = {
            host: 'checkip.amazonaws.com',
            port: 80,
            path: '/'
        };

        http.get(options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                resolve(data.trim());
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
};

const createServer = async () => {
    app.use(bodyParser.json());

    // routes
    require(`./src/modules/routes/api`)(app);

    // Obter o endereço IP público da instância e, em seguida, iniciar o servidor
    try {
        const publicIPv4 = await getPublicIPv4();
        app.listen(port, host, () => {
            console.log(`Servidor iniciado em http://${publicIPv4}:${port}`);
        });
    } catch (error) {
        console.error('Erro ao obter endereço IP público da instância:', error.message);
    }
};

module.exports = {
    createServer,
};

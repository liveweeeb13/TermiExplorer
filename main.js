const PORT = 1010

const express = require('express');
const path = require('path');
const fs = require('fs');
const { networkInterfaces } = require('os');
const nets = networkInterfaces();
const app = express();

console.clear();

// IP
function getLocalIP() {
    for (const interfaceName in nets) {
        for (const net of nets[interfaceName]) {
            if (net.family === 'IPv4' && !net.internal) {
                return net.address;
            }
        }
    }
    return 'localhost'; 
}
const localIP = getLocalIP();

app.get('/*', (req, res) => {
    const requestedPath = req.params[0] || '';  
    const dir = path.resolve('/', requestedPath);

    fs.stat(dir, (err, stats) => {
        if (err) {
            return res.status(500).send(`Erreur lors de l'accès au fichier ou dossier : ${err.message}`);
        }

        if (stats.isFile()) {
            const userIP = req.ip || 'Inconnu'; 
            const fileName = path.basename(dir);
            const computerName = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            console.log(`POSTE : ${computerName} IP: ${userIP} a téléchargé ${dir}`);

            return res.download(dir, err => {
                if (err) {
                    return res.status(500).send(`Erreur lors du téléchargement : ${err.message}`);
                }
            });
        }

        fs.readdir(dir, { withFileTypes: true }, (err, files) => {
            if (err) {
                return res.status(500).send(`Erreur lors de la lecture du dossier: ${err.message}`);
            }

            let fileList = files.map(file => {
                const filePath = path.join(requestedPath, file.name);
                const displayName = file.isDirectory() ? `📁 ${file.name}` : `📄 ${file.name}`;
                return `<li class="file-item" data-name="${file.name.toLowerCase()}">
                            <a href="/${filePath}">${displayName}</a>
                        </li>`;
            }).join('');

            const parentDir = path.dirname(requestedPath);
            const backLink = requestedPath ? `<li><a href="/${parentDir}">⬅️ Retour</a></li>` : '';

            res.send(`
                <html>
                    <head>
                        <title>Termi Explorer</title>
                        <link rel="icon" type="image/png" href="https://termi-hub-app.github.io/assets/logo.png">
                        <style>
                            body { 
                                font-family: Arial, sans-serif; 
                                background-color: #2e2e2e; 
                                color: #e0e0e0;
                                display: flex;
                                justify-content: center; 
                                margin: 0;
                            }
                            .container {
                                width: 100%;
                                max-width: 600px;
                                padding: 20px;
                                box-sizing: border-box;
                            }
                            ul { 
                                list-style: none; 
                                padding: 0;  
                            }
                            li { 
                                margin: 5px 0; 
                                border-bottom: 1px solid white; 
                                padding: 5px 0;
                            }
                            a { 
                                text-decoration: none; 
                                color: #4CAF50; 
                            }
                            a:hover { 
                                text-decoration: underline; 
                            }
                            h1 { 
                                color: #ffffff; 
                                text-align: center;
                                font-size: 2rem;
                            }
                            input[type="text"] {
                                width: 100%;
                                padding: 10px;
                                margin: 20px 0;
                                border: 1px solid #4CAF50;
                                border-radius: 5px;
                                background-color: #3e3e3e;
                                color: #e0e0e0;
                                box-sizing: border-box;
                            }
                            @media (max-width: 768px) {
                                h1 { font-size: 1.5rem; }
                                .container { padding: 10px; }
                            }
                            @media (max-width: 480px) {
                                h1 { font-size: 1.2rem; }
                                .container { padding: 10px; }
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <h1>Termi Explorer</h1>
                             <ul>
                                ${backLink}
                                ${fileList}
                            </ul>
                        </div>
                    </body>
                </html>
            `);
        });
    });
});

app.listen(PORT, () => {
    console.log(`Termi Explorer sur http://${localIP}:${PORT}`);
});

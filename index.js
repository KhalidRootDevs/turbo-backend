const express = require('express');
const expressApp = require('./app.js');

const PORT = process.env.PORT || 6000;

const startServer = () => {
    const app = express();

    expressApp(app)
        .then(() => {
            app.listen(PORT, () => {
                console.log(`Server started on port ${PORT}`);
            });
        })
        .catch((error) => {
            console.error('Error setting up the Express app:', error);
            process.exit(1);
        });
};

startServer();

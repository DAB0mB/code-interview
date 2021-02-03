const express = require('express');
const config = require('config');
// const mongoose = require('mongoose');
// const path = require('path')

const app = express();

app.use(express.json({ extended: true }));

app.use('/api/provider', require('./routes/provider.routes'));
app.use('/appointments', require('./routes/appointments.routes'));
app.get('/', (req, res) => {
    res.send('<h1>Please, use /api format to receive any data</h1>')
});

const PORT = config.get('port') || 3500;

async function start() {
    try {
        // await mongoose.connect(config.get('mongoUri'), {
        //     useNewUrlParser: true,
        //     useFindAndModify: false,
        //     useUnifiedTopology: true,
        // })
        app.listen(PORT, () => {
            console.log('DB connected and server has been started on the port:', PORT);
        });

    } catch (e) {
        console.log('Server error', e.message);
        process.exit(1);
    }
}

start().catch(e => console.log(e.message));

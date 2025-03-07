//require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true

        });
        console.log('MongoDB connecté')
    } catch(error) {
        console.error('Erreur de connexion à MongoDB :', error);
        process.exit(1); // Arrête le processus en cas d'erreur
    }
};

module.exports = connectDB;
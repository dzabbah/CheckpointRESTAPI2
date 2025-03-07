require('dotenv').config();
const express = require('express');
const connectDB = require('./config/restapi2db');
const User = require('./models/user');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000; 

// Middleware pour Parser le JSON
app.use(express.json());

// Connexion à MongoDB Atlas
//connectDB();

mongoose.connect('MONGO_URI', {
    useNewUrlParser: true,
    useUnifieldTopology: true
}).then(() => console.log('MongoDB Atlas connecté'))
  .catch(err => console.error('Erreur de connexion à MongoDB :', err));


// Route pour test pour ajouter un utilisateur

// POST : Ajouter un nouvel utilisateur
app.post('/users', async (req, res)=> {
    try {
        const {name, email, password} = req.body;
        const newUser = new User({name, email, password});
        await newUser.save();
        res.status(201).json(newUser);
    } catch(error) {
        res.status(500);json({ error: 'Erreur lors de la création de l’utilisateur'});
    }
});

// PUT : Éditer un utilisateur par ID
app.put('/users/:id', async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) return res.status(404).json({ error: 'Utilisateur non trouvé' });
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ error: 'Erreur lors de la mise à jour' });
    }
});

// DELETE : Supprimer un utilisateur par ID
app.delete('/users/:id', async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ error: 'Utilisateur non trouvé' });
        res.json({ message: 'Utilisateur supprimé' });
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la suppression' });
    }
});




// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur http://localhost:${PORT}`);
});
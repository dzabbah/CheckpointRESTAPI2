const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true 
    },
    email: {
        type: String, 
        reuired:true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8, // Définir une longueur minimale
        maxlength: 32, // Définir une longueur maximale
        validate: {
            validator: function(value) {
                return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,32}$/.test(value);
            },
            message: "Le mot de passe doit contenir au moins une lettre, un chiffre et un caractère spécial."
        }
    }
} , { timestamps: true });
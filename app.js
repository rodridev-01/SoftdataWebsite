import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors'; // Importa cors

dotenv.config();

const app = express();

// Configura CORS
app.use(cors());
// Conexión a la base de datos MongoDB Atlas
mongoose.connect('mongodb+srv://tenientelangley:c6LlVaD0h272w1WD@dva.qzfi311.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('CONEXIÓN EXITOSA'))
.catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(path.resolve(), 'public')));

// Definición del esquema de usuario
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// Ruta para registrar nuevos usuarios
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send('Todos los campos son obligatorios');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.status(201).send('Usuario registrado con éxito');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al registrar el usuario');
  }
});

const PORT = process.env.PORT || 3002; // Cambia 3001 al puerto que desees
app.listen(PORT, () => {
  console.log(`Servidor en el puerto ${PORT}`);
});

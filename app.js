import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';

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

// Ruta para iniciar sesión
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Buscar al usuario en la base de datos por nombre de usuario
    const user = await User.findOne({ username });

    // Si el usuario no existe, responder con un mensaje de error
    if (!user) {
      return res.status(401).send('Invalid username or password');
    }

    // Verificar si la contraseña proporcionada coincide con la contraseña almacenada en la base de datos
    const passwordMatch = await bcrypt.compare(password, user.password);

    // Si las contraseñas no coinciden, responder con un mensaje de error
    if (!passwordMatch) {
      return res.status(401).send('Invalid username or password');
    }

    // Si las credenciales son válidas, responder con un mensaje de éxito
    res.status(200).send('Login successful');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error during login');
  }
});

const PORT = process.env.PORT || 3009;
app.listen(PORT, () => {
  console.log(`Servidor en el puerto ${PORT}`);
});

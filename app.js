import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';

// Reemplaza esta URI con tu propia información de MongoDB Atlas
const uri = 'mongodb+srv://tenientelangley:c6LlVaD0h272w1WD@dva.qzfi311.mongodb.net/loginDB?retryWrites=true&w=majority';

// Crear un cliente MongoClient
const client = new MongoClient(uri);

async function run() {
    try {
        // Conectar el cliente al servidor
        await client.connect();
        console.log("Conectado a MongoDB Atlas");

        // Seleccionar la base de datos
        const database = client.db('loginDB');

        // Seleccionar la colección
        const usersCollection = database.collection('users');

        // Obtener el formulario
        const form = document.getElementById('registration-form');

        // Agregar un evento de envío al formulario
        form.addEventListener('submit', async (event) => {
            event.preventDefault(); // Evitar que el formulario se envíe automáticamente
            
            // Obtener los valores del formulario
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Insertar el usuario en la base de datos
            const hashedPassword = await bcrypt.hash(password, 10);
            const result = await usersCollection.insertOne({
                username: username,
                email: email,
                password: hashedPassword
            });

            console.log(`Usuario registrado con el _id: ${result.insertedId}`);
        });
    } catch (error) {
        console.error("Error:", error);
    } finally {
        // Asegúrate de que el cliente se cerrará cuando termines/error
        await client.close();
    }
}

run().catch(console.dir);

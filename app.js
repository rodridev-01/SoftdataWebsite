import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';

const uri = 'mongodb+srv://tenientelangley:c6LlVaD0h272w1WD@dva.qzfi311.mongodb.net/?retryWrites=true&w=majority&appName=dva';

const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Conectado a MongoDB Atlas");
  } catch (error) {
    console.error("Error al conectar a MongoDB Atlas:", error);
    throw error;
  }
}

async function createUser(email, password) {
  const database = client.db('loginDB');
  const usersCollection = database.collection('users');

  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await usersCollection.insertOne({
    email: email,
    password: hashedPassword
  });

  console.log(`Documento insertado con el _id: ${result.insertedId}`);
}

async function verifyUser(email, password) {
  const database = client.db('loginDB');
  const usersCollection = database.collection('users');

  const user = await usersCollection.findOne({ email: email });
  if (user && await bcrypt.compare(password, user.password)) {
    console.log('Login successful');
  } else {
    console.log('Invalid email or password');
  }
}

async function closeConnection() {
  try {
    await client.close();
    console.log("Conexión cerrada");
  } catch (error) {
    console.error("Error al cerrar la conexión:", error);
    throw error;
  }
}

async function run() {
  await connectToDatabase();
  await createUser('admin@example.com', 'admin123');
  await verifyUser('admin@example.com', 'admin123');
  await closeConnection();
}

run().catch(console.error);

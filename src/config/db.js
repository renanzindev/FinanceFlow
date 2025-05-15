import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Substitua <YOUR_MONGODB_URI> pela sua string de conexão do MongoDB
    // Exemplo local: 'mongodb://localhost:27017/financeflow'
    // Exemplo Atlas: 'mongodb+srv://<username>:<password>@<cluster-url>/financeflow?retryWrites=true&w=majority'
    const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/financeflow';
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Conectado com Sucesso!');
  } catch (err) {
    console.error('Erro ao conectar com o MongoDB:', err.message);
    // Encerra o processo com falha
    process.exit(1);
  }
};

export default connectDB;

const mongoose = require('mongoose');
const planets = require('../data/planets');
const Planet = require('../models/Planet');
require('dotenv').config();

async function populatePlanets() {
  try {
    // Conectar ao MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('Conectado ao MongoDB');

    // Verificar se já existem planetas no banco
    const existingPlanets = await Planet.countDocuments();
    
    if (existingPlanets === 0) {
      // Inserir os planetas
      await Planet.insertMany(planets);
      console.log('Planetas do sistema solar inseridos com sucesso!');
    } else {
      console.log('O banco de dados já contém planetas. Nenhuma inserção foi realizada.');
    }

    // Fechar a conexão
    await mongoose.connection.close();
    console.log('Conexão com o MongoDB fechada');
  } catch (error) {
    console.error('Erro ao popular o banco de dados:', error);
    process.exit(1);
  }
}

populatePlanets(); 
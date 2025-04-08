const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Planet = require('../models/Planet');

// Middleware de autenticação para todas as rotas
router.use(authMiddleware);

// Listar todos os planetas
router.get('/', async (req, res) => {
  try {
    const planets = await Planet.find();
    res.json(planets);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar planetas', error: error.message });
  }
});

// Buscar planeta por ID
router.get('/:id', async (req, res) => {
  try {
    const planet = await Planet.findById(req.params.id);
    if (!planet) {
      return res.status(404).json({ message: 'Planeta não encontrado' });
    }
    res.json(planet);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar planeta', error: error.message });
  }
});

// Criar novo planeta
router.post('/', async (req, res) => {
  try {
    const {
      name,
      description,
      diameter,
      distanceFromSun,
      numberOfMoons,
      surfaceTemperature,
      image,
      hasRings,
      rotationPeriod
    } = req.body;

    const planet = new Planet({
      name,
      description,
      diameter,
      distanceFromSun,
      numberOfMoons,
      surfaceTemperature,
      image,
      hasRings,
      rotationPeriod,
      isCustom: true,
      createdBy: req.user.userId
    });

    await planet.save();
    res.status(201).json(planet);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar planeta', error: error.message });
  }
});

module.exports = router; 
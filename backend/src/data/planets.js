const planets = [
  {
    name: "Mercúrio",
    description: "O menor e mais interno planeta do Sistema Solar, orbitando o Sol a cada 88 dias terrestres.",
    diameter: 4879,
    distanceFromSun: 57910000,
    numberOfMoons: 0,
    surfaceTemperature: 167,
    rotationPeriod: 1407.6,
    image: "https://upload.wikimedia.org/wikipedia/commons/3/30/Mercury_in_color_-_Prockter07_centered.jpg",
    hasRings: false,
    isCustom: false
  },
  {
    name: "Vênus",
    description: "O segundo planeta do Sistema Solar em ordem de distância a partir do Sol, orbitando-o a cada 224,7 dias.",
    diameter: 12104,
    distanceFromSun: 108200000,
    numberOfMoons: 0,
    surfaceTemperature: 464,
    rotationPeriod: -5832.5,
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Venus-real_color.jpg",
    hasRings: false,
    isCustom: false
  },
  {
    name: "Terra",
    description: "O terceiro planeta mais próximo do Sol, o mais denso e o quinto maior dos oito planetas do Sistema Solar.",
    diameter: 12756,
    distanceFromSun: 149600000,
    numberOfMoons: 1,
    surfaceTemperature: 15,
    rotationPeriod: 24,
    image: "https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg",
    hasRings: false,
    isCustom: false
  },
  {
    name: "Marte",
    description: "O quarto planeta a partir do Sol, o segundo menor do Sistema Solar. Batizado em homenagem ao deus romano da guerra.",
    diameter: 6792,
    distanceFromSun: 227900000,
    numberOfMoons: 2,
    surfaceTemperature: -63,
    rotationPeriod: 24.6,
    image: "https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg",
    hasRings: false,
    isCustom: false
  },
  {
    name: "Júpiter",
    description: "O maior planeta do Sistema Solar, tanto em diâmetro quanto em massa, e o quinto mais próximo do Sol.",
    diameter: 142984,
    distanceFromSun: 778500000,
    numberOfMoons: 79,
    surfaceTemperature: -110,
    rotationPeriod: 9.9,
    image: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg",
    hasRings: true,
    isCustom: false
  },
  {
    name: "Saturno",
    description: "O sexto planeta a partir do Sol e o segundo maior do Sistema Solar atrás de Júpiter.",
    diameter: 120536,
    distanceFromSun: 1434000000,
    numberOfMoons: 82,
    surfaceTemperature: -140,
    rotationPeriod: 10.7,
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox.jpg",
    hasRings: true,
    isCustom: false
  },
  {
    name: "Urano",
    description: "O sétimo planeta a partir do Sol, o terceiro maior e o quarto mais massivo dos oito planetas do Sistema Solar.",
    diameter: 51118,
    distanceFromSun: 2871000000,
    numberOfMoons: 27,
    surfaceTemperature: -195,
    rotationPeriod: -17.2,
    image: "https://upload.wikimedia.org/wikipedia/commons/3/39/UranusVoyager2.jpg",
    hasRings: true,
    isCustom: false
  },
  {
    name: "Netuno",
    description: "O oitavo planeta do Sistema Solar, o último a partir do Sol desde a reclassificação de Plutão para a categoria de planeta anão.",
    diameter: 49528,
    distanceFromSun: 4498000000,
    numberOfMoons: 14,
    surfaceTemperature: -200,
    rotationPeriod: 16.1,
    image: "https://upload.wikimedia.org/wikipedia/commons/6/63/Neptune_-_Voyager_2_%2829347980845%29_flatten_crop.jpg",
    hasRings: true,
    isCustom: false
  }
];

module.exports = planets; 
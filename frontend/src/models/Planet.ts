
export interface Planet {
  id: string;
  name: string;
  diameter: number; // in kilometers
  rotationPeriod: number; // in Earth days
  distanceFromSun: number; // in million kilometers
  hasRings: boolean;
  image: string;
  description?: string;
  createdBy?: string; // User ID for custom planets
}

export const defaultPlanets: Planet[] = [
  {
    id: "mercury",
    name: "Mercury",
    diameter: 4879,
    rotationPeriod: 58.6,
    distanceFromSun: 57.9,
    hasRings: false,
    image: "/mercury.jpg",
    description: "Mercury is the smallest planet in our Solar System and the closest to the Sun. Its surface is heavily cratered and similar in appearance to the Moon."
  },
  {
    id: "venus",
    name: "Venus",
    diameter: 12104,
    rotationPeriod: -243, // Negative value indicates retrograde rotation
    distanceFromSun: 108.2,
    hasRings: false,
    image: "https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2024/04/Venus.jpg?w=1024",
    description: "Venus is the second planet from the Sun and is Earth's closest planetary neighbor. It's the hottest planet in our solar system, even though Mercury is closer to the Sun."
  },
  {
    id: "earth",
    name: "Earth",
    diameter: 12742,
    rotationPeriod: 1,
    distanceFromSun: 149.6,
    hasRings: false,
    image: "/earth.jpg",
    description: "Earth is the third planet from the Sun and the only astronomical object known to harbor life. About 29.2% of Earth's surface is land consisting of continents and islands."
  },
  {
    id: "mars",
    name: "Mars",
    diameter: 6779,
    rotationPeriod: 1.03,
    distanceFromSun: 227.9,
    hasRings: false,
    image: "/mars.jpg",
    description: "Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System, being larger than only Mercury. Mars is often called the 'Red Planet'."
  },
  {
    id: "jupiter",
    name: "Jupiter",
    diameter: 139820,
    rotationPeriod: 0.41,
    distanceFromSun: 778.5,
    hasRings: true,
    image: "/jupiter.jpg",
    description: "Jupiter is the largest planet in the Solar System. It is a gas giant with a mass more than two and a half times that of all the other planets in the Solar System combined."
  },
  {
    id: "saturn",
    name: "Saturn",
    diameter: 116460,
    rotationPeriod: 0.45,
    distanceFromSun: 1434,
    hasRings: true,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Saturn_during_Equinox.jpg/1200px-Saturn_during_Equinox.jpg",
    description: "Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter. It is a gas giant with an average radius of about nine and a half times that of Earth."
  },
  {
    id: "uranus",
    name: "Uranus",
    diameter: 50724,
    rotationPeriod: -0.72, // Negative value indicates retrograde rotation
    distanceFromSun: 2871,
    hasRings: true,
    image: "/uranus.jpg",
    description: "Uranus is the seventh planet from the Sun. Its name is a reference to the Greek god of the sky, Uranus, who, according to Greek mythology, was the grandfather of Zeus."
  },
  {
    id: "neptune",
    name: "Neptune",
    diameter: 49244,
    rotationPeriod: 0.67,
    distanceFromSun: 4495,
    hasRings: true,
    image: "/neptune.jpg",
    description: "Neptune is the eighth and farthest known Solar planet from the Sun. In the Solar System, it is the fourth-largest planet by diameter, the third-most-massive planet, and the densest giant planet."
  }
];

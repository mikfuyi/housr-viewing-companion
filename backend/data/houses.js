// Simple in-memory list of houses for now.
// Later you can replace this with a real database.


// backend/data/houses.js

// In-memory store for now. When the server restarts, data is lost.
// That's OK for a prototype. Later you can replace this with SQL.

const houses = [
  {
    id: "1",
    code: "111111", // example code
    title: "Modern Student Flat",
    address: "123 Uni Road, City",
    avgBills: 120,
    landlordRating: 4.5,
    areaPros: "Very close to campus, lots of cafes and bus routes.",
    areaCons: "Can be noisy at night on weekends.",
    noiseLevel: "High",
    safetyRating: "Medium",
    nearestHotspots: "Campus library, Student Union, City Gym",
    description:
      "Modern student flat close to campus. Great for students who want nightlife and convenience.",
  },
  {
    id: "2",
    code: "222222", // example code
    title: "Quiet Suburban House",
    address: "45 Green Lane, Suburbia",
    avgBills: 90,
    landlordRating: 4.8,
    areaPros: "Quiet and safe, good for families or couples.",
    areaCons: "Further from nightlife and campus.",
    noiseLevel: "Low",
    safetyRating: "High",
    nearestHotspots: "Local park, supermarket, GP clinic",
    description:
      "Calm suburban house, good for quieter tenants or families.",
  },
];

// Generate a unique 6-digit code like "583920"
function generateUniqueCode() {
  let code;
  do {
    code = Math.floor(100000 + Math.random() * 900000).toString();
  } while (houses.some((h) => h.code === code));
  return code;
}

// Create a new house from landlord free-text description
function addHouseFromDescription(description) {
  const id = (houses.length + 1).toString();
  const code = generateUniqueCode();

  const newHouse = {
    id,
    code,
    description,
    // Optional: you can try to parse more info from description later
    title: "Landlord property " + id,
  };

  houses.push(newHouse);
  return newHouse;
}

function findHouseById(id) {
  return houses.find((h) => h.id === id);
}

function findHouseByCode(code) {
  return houses.find((h) => h.code === code);
}

module.exports = {
  houses,
  addHouseFromDescription,
  findHouseById,
  findHouseByCode,
};

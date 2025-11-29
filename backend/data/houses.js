// Simple in-memory list of houses for now.
// Later you can replace this with a real database.


const houses = [
  {
    id: "1",
    title: "Modern Student Flat",
    address: "123 Uni Road, City",
    avgBills: 120,
    landlordRating: 4.5,
    areaPros: "Very close to campus, lots of cafes and bus routes.",
    areaCons: "Can be noisy at night on weekends.",
    noiseLevel: "High",
    safetyRating: "Medium",
    nearestHotspots: "Campus library, Student Union, City Gym",
  },
  {
    id: "2",
    title: "Quiet Suburban House",
    address: "45 Green Lane, Suburbia",
    avgBills: 90,
    landlordRating: 4.8,
    areaPros: "Quiet and safe, good for families or couples.",
    areaCons: "Further from nightlife and campus.",
    noiseLevel: "Low",
    safetyRating: "High",
    nearestHotspots: "Local park, supermarket, GP clinic",
  },
];


module.exports = { houses };

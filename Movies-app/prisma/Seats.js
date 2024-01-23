const seats = {
  A: Array.from({ length: 12 }, (_, i) => `A${(i + 1).toString().padStart(2, "0")}`),
  B: Array.from({ length: 12 }, (_, i) => `B${(i + 1).toString().padStart(2, "0")}`),
  C: Array.from({ length: 12 }, (_, i) => `C${(i + 1).toString().padStart(2, "0")}`),
  D: Array.from({ length: 12 }, (_, i) => `D${(i + 1).toString().padStart(2, "0")}`),
  E: Array.from({ length: 12 }, (_, i) => `E${(i + 1).toString().padStart(2, "0")}`),
  F: Array.from({ length: 12 }, (_, i) => `F${(i + 1).toString().padStart(2, "0")}`),
};

const seatsObject = {};

for (const key in seats) {
  seats[key].forEach((seat) => {
    seatsObject[seat] = false;
  });
}

export default seatsObject;

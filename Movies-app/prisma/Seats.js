const seats = {
  A: Array.from({ length: 12 }, (_, i) => `A${i + 1}`),
  B: Array.from({ length: 12 }, (_, i) => `B${i + 1}`),
  C: Array.from({ length: 12 }, (_, i) => `C${i + 1}`),
  D: Array.from({ length: 12 }, (_, i) => `D${i + 1}`),
  E: Array.from({ length: 12 }, (_, i) => `E${i + 1}`),
  F: Array.from({ length: 12 }, (_, i) => `F${i + 1}`),
};

const seatsObject = {};

for (const key in seats) {
  seats[key].forEach((seat) => {
    seatsObject[seat] = false;
  });
}

export default seatsObject;

const FAKE_LOCATION = [
  {
    coords: {
      latitude: 21.32471,
      longitude: 68.89954,
    },
  },
  {
    coords: {
      latitude: 58.99211,
      longitude: -32.72119,
    },
  },
  {
    coords: {
      latitude: 70.15629,
      longitude: 132.14552,
    },
  },
  {
    coords: {
      latitude: 54.99811,
      longitude: 49.78917,
    },
  },
  {
    coords: {
      latitude: 44.85618,
      longitude: -76.67448,
    },
  },
  {
    coords: {
      latitude: -26.22929,
      longitude: 118.32402,
    },
  },
  {
    coords: {
      latitude: 17.7294,
      longitude: 13.12479,
    },
  },
];

export const getFakeLocation = () => {
  return FAKE_LOCATION[Math.floor(Math.random() * FAKE_LOCATION.length)];
};

// Prices and hire rules for every boat - the ONE place to change them.
// The booking wizard and the "From £x" prices on the boat pages both read from here.
// minimumHire: "2h" means a boat can't be hired for a single hour (leave it out for 1 hour).
export const PRICING = {
  "plymouth-pilot": {
  hourly: {
    "1h": 88,
    "2h": 127,
    half: 175,
    full: 228
  },

  multiDay: {
    2: 456,
    3: 597,
    4: 697,
    5: 752,
    6: 782,
    7: 798
  },

  extraDay: 114
},

  "bass-boat": {
    hourly: {
    "1h": 66,
    "2h": 86,
    half: 128,
    full: 166
  },
    multiDay: {
    2: 332,
    3: 435,
    4: 508,
    5: 548,
    6: 569,
    7: 581
    },

  extraDay: 83  
  },

  "drascombe": {
  minimumHire: "2h",
  hourly: {
    "1h": 88,
    "2h": 127,
    half: 175,
    full: 228
  },

  multiDay: {
    2: 456,
    3: 597,
    4: 697,
    5: 752,
    6: 782,
    7: 798
  },

  extraDay: 114
},

  "wayfarer": {
    minimumHire: "2h",
    hourly: {
    "1h": 66,
    "2h": 86,
    half: 128,
    full: 166
  },
    multiDay: {
    2: 332,
    3: 435,
    4: 508,
    5: 548,
    6: 569,
    7: 581
    },

  extraDay: 83  
  },


    "topaz": {
      hourly: {
      "1h": 31,
      "2h": 54,
      half: 69,
      full: 95
      },
    multiDay: {
    2: 191,
    3: 250,
    4: 292,
    5: 315,
    6: 322,
    7: 329
    },

  extraDay: 47  
  },
  
    "pico": {
      hourly: {
      "1h": 31,
      "2h": 54,
      half: 69,
      full: 95
      },
    multiDay: {
    2: 191,
    3: 250,
    4: 292,
    5: 315,
    6: 322,
    7: 329
    },

  extraDay: 47  
  },
  
    "topper": {
      hourly: {
      "1h": 31,
      "2h": 54,
      half: 69,
      full: 95
      },
    multiDay: {
    2: 191,
    3: 250,
    4: 292,
    5: 315,
    6: 322,
    7: 329
    },

  extraDay: 47  
  },
  
  "anarth": {
    hourly: {
    "1h": 26,
    "2h": 38,
    half: 55,
    full: 73,
  },
    multiDay: {
    2: 145,
    3: 190,
    4: 222,
    5: 240,
    6: 247,
    7: 247
    },

  extraDay: 36  
  },
  
  "double-kayak": {
    hourly: {
      "1h": 25,
      "2h": 37,
      half: 53,
      full: 69,
  },
      multiDay: {
    2: 139,
    3: 182,
    4: 212,
    5: 229,
    6: 233,
    7: 238
    },

  extraDay: 34  
  },

    "single-kayak": {
    hourly: {
      "1h": 23,
      "2h": 30,
      half: 46,
      full: 60,
  },
   multiDay: {
    2: 119,
    3: 156,
    4: 183,
    5: 197,
    6: 206,
    7: 210
    },

  extraDay: 30  
  },

  "paddleboard": {
    hourly: {
      "1h": 23,
      "2h": 30,
      half: 46,
      full: 60,
  },
   multiDay: {
    2: 119,
    3: 156,
    4: 183,
    5: 197,
    6: 206,
    7: 210
    },

  extraDay: 30  
  },
  // Delivery charge for multi-day hire, by place ("St Anthony" = collect from the boatyard).
  // The wizard's list of places and its charges come from here.
  locations: {
  "St Anthony": 0,
  "Helford Village": 36,
  "Gillan": 0,
  "Durgan": 36,
  "Helford Passage": 36,
  "Port Navas": 36,
  "Flushing": 0,
  "Calamansac": 36,
  "Lorelei": 36
}
};

export const serialisedHotel1Mock = {
  id: "OBMNG1",
  name: "DBM Hotel 1",
  address1: "Cajarc Blue Hotel",
  address2: "51 Bedford St",
  images: [
    {
      url: "https://uk2-roomlynx.eu.guestline.net/picturemanager/images/OBMNG1/282214329.jpeg",
    },
    {
      url: "https://uk2-roomlynx.eu.guestline.net/picturemanager/images/OBMNG1/london-hotels-with-a-view-1614348818.jpeg",
    },
    {
      url: "https://uk2-roomlynx.eu.guestline.net/picturemanager/images/OBMNG1/Hotel1.JPG",
    },
  ],
  starRating: "4",
};

export const serialisedHotel2Mock = {
  id: "OBMNG2",
  name: "DBM Hotel 2",
  address1: "10 Carlisle St",
  address2: "",
  images: [
    {
      url: "https://uk2-roomlynx.eu.guestline.net/picturemanager/images/OBMNG2/lw0428_76188584_720x450.jpeg",
    },
    {
      url: "https://uk2-roomlynx.eu.guestline.net/picturemanager/images/OBMNG2/nobu-lobby-day-optimized.jpeg",
    },
  ],
  starRating: "5",
};

export const serialisedHotelsMock = [
  serialisedHotel1Mock,
  serialisedHotel2Mock,
];

export const hotelsMock = [
  {
    ...serialisedHotel1Mock,
    description:
      "Etag for the win chocolate biscuit wafer soufflé toffee toffee donut. Tart biscuit wafer pudding chocolate cake oat cake halvah\r\nMarshmallow halvah gingerbread apple pie muffin biscuit. Cake pudding topping pie lemon drops lollipop. Bear claw oat cake jelly beans. Bonbon toffee caramels pudding gingerbread cookie lollipop.",
    postcode: "WC2R 0PZ",
    town: "London",
    countryCode: "GB",
    country: "United Kingdom",
    facilities: [
      {
        code: "1",
      },
      {
        code: "2",
      },
    ],
    telephone: "12345666",
    email: "JabbaScript@guestline.com",
    checkInHours: "14",
    checkInMinutes: "00",
    checkOutHours: "11",
    checkOutMinutes: "00",
    position: {
      latitude: 55.950191,
      longitude: -3.18755,
      timezone: "GMT+1",
    },
  },
  {
    ...serialisedHotel2Mock,
    description:
      "Fruitcake brownie sugar plum cotton candy pastry marzipan pie lollipop ice cream. Sweet pie tootsie roll oat cake apple pie candy pastry wafer jelly beans. Cake sweet oat cake chocolate sweet chocolate pudding biscuit.",
    postcode: "W1D 3BR",
    town: "London",
    countryCode: "GB",
    country: "United Kingdom",
    facilities: [],
    telephone: "54453559",
    email: "JabbaScript@guestline.com",
    checkInHours: "13",
    checkInMinutes: "00",
    checkOutHours: "10",
    checkOutMinutes: "00",
    position: {
      timezone: "GMT+1",
    },
  },
];

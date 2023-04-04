const hotelRoom1Mock = {
  id: "DTFF",
  name: "Deluxe Twin",
  shortDescription:
    "Halvah pastry tart marshmallow croissant chupa chups jelly-o.",
  longDescription:
    "Halvah pastry tart marshmallow croissant chupa chups jelly-o. Gummi bears toffee jelly beans jelly pie jujubes danish candy cheesecake. Gummies fruitcake bonbon topping gingerbread lemon drops. Candy canes dragée biscuit fruitcake. Candy canes tootsie roll lemon drops candy canes.",
  occupancy: {
    maxAdults: 2,
    maxChildren: 0,
    maxOverall: 2,
  },
};

const hotelRoom2Mock = {
  id: "STND",
  name: "Double/Twin Standard Double",
  shortDescription:
    "Halvah pastry tart marshmallow croissant chupa chups jelly-o.",
  longDescription:
    "Bear claw marshmallow bear claw tiramisu caramels dragée. Pastry sweet sugar plum sugar plum candy icing tiramisu danish.\r\nHalvah pastry tart marshmallow croissant chupa chups jelly-o. Gummi bears toffee jelly beans jelly pie jujubes danish candy cheesecake. Gummies fruitcake bonbon topping gingerbread lemon drops. Candy canes dragée biscuit fruitcake. Candy canes to",
  occupancy: {
    maxAdults: 2,
    maxChildren: 0,
    maxOverall: 2,
  },
};

const hotelRoom3Mock = {
  id: "STTW",
  name: "Standard Twin",
  shortDescription:
    "Halvah pastry tart marshmallow croissant chupa chups jelly-o.",
  longDescription: "Standard Twin",
  occupancy: {
    maxAdults: 2,
    maxChildren: 1,
    maxOverall: 2,
  },
};

export const hotelSerialisedRoomsMock = [
  hotelRoom1Mock,
  hotelRoom2Mock,
  hotelRoom3Mock,
];

export const hotelDetailsMock = {
  rooms: [
    {
      ...hotelRoom1Mock,
      disabledAccess: false,
      bedConfiguration: "Twin",
      images: [
        {
          url: "https://rl-uk2.azureedge.net/picturemanager/images/OBMNG1/room3.jpg",
          alt: "",
        },
        {
          url: "https://rl-uk2.azureedge.net/picturemanager/images/OBMNG1/music.jpg",
          alt: "",
        },
        {
          url: "https://rl-uk2.azureedge.net/picturemanager/images/OBMNG1/livingroom.jpg",
          alt: "",
        },
      ],
      facilities: [
        {
          code: "27",
          name: "4 Poster Bed",
        },
        {
          code: "28",
          name: "Kitchen Utensils",
        },
        {
          code: "15",
          name: "24 Hour Room Service",
        },
      ],
    },
    {
      ...hotelRoom2Mock,
      id: "STND",
      name: "Double/Twin Standard Double",
      shortDescription:
        "Halvah pastry tart marshmallow croissant chupa chups jelly-o.",
      longDescription:
        "Bear claw marshmallow bear claw tiramisu caramels dragée. Pastry sweet sugar plum sugar plum candy icing tiramisu danish.\r\nHalvah pastry tart marshmallow croissant chupa chups jelly-o. Gummi bears toffee jelly beans jelly pie jujubes danish candy cheesecake. Gummies fruitcake bonbon topping gingerbread lemon drops. Candy canes dragée biscuit fruitcake. Candy canes to",
      occupancy: {
        maxAdults: 2,
        maxChildren: 0,
        maxOverall: 2,
      },
      disabledAccess: false,
      bedConfiguration: "Both",
      images: [
        {
          url: "https://rl-uk2.azureedge.net/picturemanager/images/OBMNG1/room4.jpg",
          alt: "",
        },
        {
          url: "https://rl-uk2.azureedge.net/picturemanager/images/OBMNG1/livingroom.jpg",
          alt: "",
        },
        {
          url: "https://rl-uk2.azureedge.net/picturemanager/images/OBMNG1/music.jpg",
          alt: "",
        },
      ],
      facilities: [
        {
          code: "27",
          name: "4 Poster Bed",
        },
        {
          code: "13",
          name: "In-room Safe",
        },
        {
          code: "28",
          name: "Kitchen Utensils",
        },
      ],
    },
    {
      ...hotelRoom3Mock,
      disabledAccess: false,
      bedConfiguration: "Twin",
      images: [
        {
          url: "https://rl-uk2.azureedge.net/picturemanager/images/OBMNG1/room4.jpg",
          alt: "",
        },
        {
          url: "https://rl-uk2.azureedge.net/picturemanager/images/OBMNG1/livingroom.jpg",
          alt: "",
        },
        {
          url: "https://rl-uk2.azureedge.net/picturemanager/images/OBMNG1/music.jpg",
          alt: "",
        },
      ],
      facilities: [
        {
          code: "27",
          name: "4 Poster Bed",
        },
        {
          code: "32",
          name: "Fully Equipped Kitchen",
        },
        {
          code: "13",
          name: "In-room Safe",
        },
      ],
    },
  ],
  ratePlans: [
    {
      id: "24_HOUR",
      shortDescription: "24 Hour Rate - Payment Type Pay Now",
      longDescription:
        "Code: 24_HOUR, Prepayment: Pay now\r\nSome other long added description added recently\r\n\r\nTesting bullet points\r\n1\r\n2\r\n3",
      prePayment: "Reserve",
      cancellationPolicy: {
        name: "Free Cancelation",
        text: "You can cancel when ever you like.",
        penalty: "Fixed",
        applicable: "Full Stay",
        hour: "10 AM",
      },
    },
  ],
};

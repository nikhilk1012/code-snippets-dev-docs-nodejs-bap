const getOrder = () => {
  return {
    items: [
      {
        id: "sedan_spot",
        quantity: {
          count: 1,
        },
      },
    ],
    billing: {
      name: "John Doe",
      address: {
        door: "21A",
        name: "ABC Appartments",
        locality: "HSR Layout",
        city: "Bengaluru",
        state: "Karnataka",
        country: "India",
        area_code: "560102",
      },
      email: "user@example.com",
      phone: "+919876543210",
    },
    fulfillment: {
      tracking: true,
      start: {
        location: {
          id: "user-location",
          descriptor: {
            name: "Current user location",
          },
          gps: "12.9349377,77.6055586",
        },
        instructions: {
          name: "pick up instructions",
          short_desc: "Ask doorman to ring 21A",
        },
        time: {
          label: "ETA",
          duration: "P12M",
        },
        contact: {
          phone: "+919999999999",
          email: "test@example.com",
        },
      },
      end: {
        location: {
          gps: "12.914028, 77.638698",
        },
      },
    },
    quote: {
      price: {
        currency: "INR",
        value: "180",
      },
      breakup: [
        {
          title: "Sedan Spot Booking",
          price: {
            currency: "INR",
            value: "170",
          },
        },
        {
          title: "Service Charge",
          price: {
            currency: "INR",
            value: "10",
          },
        },
      ],
    },
    payment: {
      uri: "https://api.bpp.com/pay?amt=$640&mode=upi&vpa=bpp@upi",
      tl_method: "http/get",
      params: {
        amount: "180",
        mode: "upi",
        vpa: "bpp@upi",
      },
      type: "ON-FULFILMENT",
      status: "NOT-PAID",
    },
  };
};

module.exports = {
  getOrder,
};

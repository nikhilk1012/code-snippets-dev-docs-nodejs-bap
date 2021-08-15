const getOrder = () => {
  return {
    order: {
      provider: {
        id: "./retail.kirana/ind.blr/pooja-stores@lrdn.bpp.shopez.com.provider",
        locations: [
          {
            id: "./retail.kirana/ind.blr/pooja-stores.koramangala-4th-block@lrdn.bpp.shopez.com.provider_location",
          },
        ],
      },
      items: [
        {
          id: "./retail.kirana/ind.blr/pooja-stores.brown-bread-400gm@lrdn.bpp.shopez.com.item",
          quantity: {
            count: 1,
          },
        },
        {
          id: "./retail.kirana/ind.blr/pooja-stores.goodlife-milk-toned-1L@lrdn.bpp.shopez.com.item",
          quantity: {
            count: 2,
          },
        },
      ],
      billing: {
        name: "Jane Doe",
        address: {
          door: "21B",
          name: "EFG Appartments",
          locality: "Electronic City",
          city: "Bengaluru",
          state: "Karnataka",
          country: "India",
          area_code: "560104",
        },
        email: "jane@example.com",
        phone: "+919777543210",
        created_at: "2021-06-15T07:08:36.211Z",
        updated_at: "2021-06-15T07:08:36.211Z",
      },
      fulfillment: {
        type: "home-delivery",
        tracking: false,
        start: {
          location: {
            id: "./retail.kirana/ind.blr/pooja-stores.koramangala-4th-block@lrdn.bpp.shopez.com.provider_location",
            descriptor: {
              name: "Pooja Stores",
            },
            gps: "12.9349377,77.6055586",
          },
          time: {
            range: {
              start: "2021-06-15T07:09:30.000Z",
              end: "2021-06-15T07:10:30.000Z",
            },
          },
          instructions: {
            name: "pick up instructions",
            short_desc: "Provide the order id",
          },
          contact: {
            phone: "+919999999999",
            email: "info@poojastores.com",
          },
        },
        end: {
          location: {
            gps: "12.835407, 77.662524",
            address: {
              door: "21B",
              name: "EFG Appartments",
              locality: "Electronic City",
              city: "Bengaluru",
              state: "Karnataka",
              country: "India",
              area_code: "560104",
            },
          },
          time: {
            range: {
              start: "2021-06-15T07:11:36.212Z",
              end: "2021-06-15T07:12:36.212Z",
            },
          },
          instructions: {
            name: "drop off instructions",
            short_desc: "Leave at door step",
          },
          contact: {
            phone: "+919777543210",
            email: "jane@example.com",
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
            title: "Brown Bread 400 gm",
            price: {
              currency: "INR",
              value: "40",
            },
          },
          {
            title: "Good Life Toned Milk 1L",
            price: {
              currency: "INR",
              value: "120",
            },
          },
        ],
        ttl: "P4D",
      },
      payment: {
        uri: "https://api.bpp.com/pay?amt=$amount&txn_id=ksh87yriuro34iyr3p4&mode=upi&vpa=bpp@upi",
        tl_method: "http/get",
        params: {
          transaction_id: "ksh87yriuro34iyr3p4",
          amount: "180",
          mode: "upi",
          vpa: "bpp@upi",
        },
        type: "ON-ORDER",
        status: "PAID",
      },
      created_at: "2021-06-23T07:33:02.655Z",
      updated_at: "2021-06-23T07:33:02.655Z",
    },
  };
};

module.exports = {
  getOrder,
};

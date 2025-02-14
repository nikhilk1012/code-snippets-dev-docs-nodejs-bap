const getOrder = () => {
  return {
    order: {
      id: "0f8c1e68-c041-427d-9ef4-d4d3e5b22ef9",
      state: "Active",
      items: [
        {
          id: "./logistics.hyperlocal-delivery/ind.blr/fastlogistics.standard-delivery@lrdn.bpp.fastlogistics.com.item",
          quantity: {
            count: 1,
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
            short_desc: "Don't ring doorbell",
          },
          contact: {
            phone: "+919999999999",
            email: "customer@example.com",
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
          value: "50",
        },
        breakup: [
          {
            title: "Standard delivery",
            price: {
              currency: "INR",
              value: "50",
            },
          },
        ],
        ttl: "P4D",
      },
      payment: {
        uri: "https://api.bpp.com/pay?amt=$amount&txn_id=ksh87yriuro34iyr3p5&mode=upi&vpa=bpp@upi",
        tl_method: "http/get",
        params: {
          transaction_id: "ksh87yriuro34iyr3p5",
          amount: "10",
          mode: "upi",
          vpa: "bpp@upi",
        },
        type: "ON-ORDER",
        status: "NOT-PAID",
      },
      created_at: "2021-06-23T07:33:02.655Z",
      updated_at: "2021-06-23T07:33:02.655Z",
    },
  };
};

module.exports = {
  getOrder,
};

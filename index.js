const cors = require("cors");
const express = require("express");
const stripe = require("stripe")(
  "sk_test_51Ofd0KSGt4oZc6vbJ3F5zvX22i1uPiNjKAF5W15k5r2CGUc4KwCgpBfdKhQREC0Yk00dpMwJ5eHq5k1sKk7ZZL3s00mAgOkkIn"
); //secret key
const { v4: uuidv4 } = require("uuid");
const uuid = uuidv4();

const app = express();

//middleware
app.use(express.json());
app.use(cors());

//routes
app.get("/", (req, res) => {
  res.send("It works at server");
});

//POST METHOD
app.post("/payment", (req, res) => {
  const { product, token } = req.body;
  console.log("PRODUCT", product);
  console.log("PRICE", product.price);

  const idempontencyKey = uuid();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: product.price * 100,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: `purchase of ${product.name}`,
          shipping: {
            name: token.card.name,
            address: {
              country: token.card.address_country,
            },
          },
        },
        { idempontencyKey }
      );
    })
    .then((result) => res.status(200).json(result))
    .cath((err) => console.log(err));
});

app.listen(3000, () => console.log("Listening on PORT 3000"));

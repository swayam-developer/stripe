import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import StripeCheckout from "react-stripe-checkout";
function App() {
  const [product, setProduct] = useState({
    name: "React from FB",
    price: 10,
    productBy: "FaceBook",
  });

  const makePayment = (token) => {
    const body = {
      token,
      product,
    };
    const headers = {
      "content-type": "applicaion/json",
    };
    return fetch("http://localhost:3000/payment", {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log("RESPONSE", response);
        const { status } = response;
        console.log("STATUS", status);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://react.js.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Purchase
        </a>
        <StripeCheckout
          stripeKey="pk_test_51Ofd0KSGt4oZc6vbsAU3oLXUIo90PJva15I9LnVyQFlPNs1pnZ9TYpN1Edc3OpU6zHxeIasEbwKiF5Lgc5ugxSMj00ix8z9SjY"
          token={makePayment}
          name="Buy React"
          amount={product.price * 100}
          shippingAddress
          billingAddress
        >
          <button className="btn-large blue">
            Buy react in {product.price} $
          </button>
        </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
//

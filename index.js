let express = require('express');
let cors = require("cors");

let app = express();
app.use(cors());
const port = 3000;
app.use(express.static('static'));


app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseInt(req.query.cartTotal);
  let totalcartvalue = parseFloat(newItemPrice * cartTotal);
  res.send(totalcartvalue.toString());
});

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember;

  
  let cartTotalFloat = parseFloat(cartTotal);

   // Determine discount percentage
  const discountPercentage = (isMember === 'true') ? 0.10 : 0; // 10% discount for members

  // Calculate the final price after discount
  const finalPrice = cartTotalFloat - (cartTotalFloat * discountPercentage);

  // Return the final price as a string
  res.send(finalPrice.toString()); 
});

const TAX_RATE = 0.05;

app.get('/calculate-tax', (req, res) => {
    let cartTotal = req.query.cartTotal;

    // Parse cartTotal as a float
    const cartTotalFloat = parseFloat(cartTotal);

    

    // Calculate the tax
    const taxAmount = cartTotalFloat * TAX_RATE;

    // Return the tax amount as a string 
    res.send(taxAmount.toString());
});

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = req.query.distance;

  // Parse distance as a float
  let distanceFloat = parseFloat(distance);

  

  let deliveryDays;

  // Calculate delivery days based on shipping method
  if (shippingMethod === 'Standard') {
      deliveryDays = parseFloat(distanceFloat / 50); // 1 day per 50 kms
  } else if (shippingMethod === 'Express') {
      deliveryDays = parseFloat(distanceFloat / 100); // 1 day per 100 kms
  } else {
      return res.status(400).send('Invalid shipping method');
  }

  // Return the estimated delivery days as a string
  res.send(deliveryDays.toString());
});

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);

  // Calculate shipping cost
  const shippingCost = weight * distance * 0.1;

  // Return the shipping cost as a string 
  res.send(shippingCost.toString());
});
app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = req.query.purchaseAmount;
  // Calculate loyalty points (1 point for every $10 spent)
  const loyaltyPoints = parseFloat(purchaseAmount * 2 );

  // Return the loyalty points as a string
  res.send(loyaltyPoints.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

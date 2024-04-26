const stripe = require("stripe")(process.env.ST_SECRET_KEY);

const paymentIntent = async (req, res) => {
  const { totalAmount } = req.body;
  const payeeAmount = totalAmount * 100;
  // Use an existing Customer ID if this is a returning customer.

  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: "2024-04-10" }
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: payeeAmount,
    currency: "inr",
    customer: customer.id,
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter
    // is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey:
      "pk_test_51P7X2TSJ9sOUmZnaQtaoOmrgoQaRHrQBUoe0MjIaCK0py4zeRf1KAYx4pITQR1yQJ97zbq7ujfp4lrkBmNygBCL5004FUKDxk8",
  });
};

module.exports = { paymentIntent };

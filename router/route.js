const express = require("express");
const route = express();
const stripetest = require('stripe')("sk_test_51Ke4SfLonn4VKBsRHhJjdeJJZpUTXg85y5YNQvlfYeb7zuvvncevGET4EgejiH5BmfMNjpJ7jsrwwKwYDeiTaWHl00hrq2D8DL");



route.get('/', async (req, res) => {
    const paymentIntent = await stripetest.paymentIntents.create({
        amount: parseInt(req.query.amount),
        currency: req.query.currency,
        payment_method_types: ['card'],

    }, function (error, paymentIntent) {
        if (error != null) {
            console.log(error);
            res.json({ "error": error });
        } else {
            res.json({
                paymentIntent: paymentIntent.client_secret,
                paymentIntentData: paymentIntent,
                amount: req.body.amount,
                currency: req.body.currency,
            });
        }
    });
});


module.exports = route;
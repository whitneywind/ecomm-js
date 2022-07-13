const express = require('express');
const cartsRepo = require('../repositories/carts');
const productsRepo = require('../repositories/products');
const cartShowTemplate = require('../views/carts/show');

const router = express.Router();

// receive a post req to add item to cart
router.post('/cart/products', async (req, res) => {
    let cart;
    // figure out thecart
    if (!req.session.cartId) {
        // no cart
        // so make and store cart id on the req.session.cartId prop
        cart = await cartsRepo.create({ items: [] });
        req.session.cartId = cart.id;
    } else {
        // let's get cart from the repo
        cart = await cartsRepo.getOne(req.session.cartId);
    }

    const existingItem = cart.items.find(item => item.id === req.body.productId);
    if (existingItem) {
        // inc quantity and save cart
        existingItem.quantity++;
    } else {
        // add new produt to array
        cart.items.push({ id: req.body.productId, quantity: 1});
    }
    await cartsRepo.update(cart.id, {
        items: cart.items
    });


    res.redirect('/');
});

router.get('/cart', async (req, res) => {
    if (!req.session.cartId) {
        return res.redirect('/');
    }

    const cart = await cartsRepo.getOne(req.session.cartId);

    for (let item of cart.items) {
        const product = await productsRepo.getOne(item.id);

        item.product = product;
    }

    res.send(cartShowTemplate({ items: cart.items }));
});

router.post('/cart/products/delete', async (req, res) => {
    const { itemId } = req.body;
    const cart = await cartsRepo.getOne(req.session.cartId);

    const items = cart.items.filter(item => item.id !== itemId);

    await cartsRepo.update(req.session.cartId, { items });

    res.redirect('/cart');
})

module.exports = router;

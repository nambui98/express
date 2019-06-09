const Product = require('../../model/product.model')
const Session = require('../../model/cart.model')
module.exports = {
    products: async(req, res, next) => {
        var products = await Product.find();
        res.json(products);
    },
    create: async(req, res) => {
        var product = await Product.create(req.body);
        res.json(product)
    },
    put: async(req, res) => {
        // var bool = false;
        // var productId = await Product.find({ _id: req.body._id })
        // if (productId[0] !== undefined) {
        //     var product = await Product.updateMany({ _id: req.body._id }, { name: req.body.name, image: req.body.image, description: req.body.description },
        //         function(error, success) {
        //             if (error) {
        //                 console.log(error);
        //             } else {
        //                 console.log(success);
        //             }
        //         })
        //     res.json(product)
        //     bool = true;
        // }
        // if (productId[0] === undefined) {
        //     var product = new Product({ _id: req.body._id, name: req.body.name, image: req.body.image, description: req.body.description });
        //     product.save()
        //     res.json(product)
        // }


        Product.findById(req.body._id, function(err, product) {
            if (err) return res.status(500).send(err.value)
            if (!product) return res.status(404).send('Not Found');

            product.name = req.body.name || product.name;
            product.image = req.body.image || product.image;
            product.description = req.body.description || product.description

            product.save(function(err, product) {
                if (err) return res.status(500).send(err);
                res.status(200).json(product);
            });
        });
    },
    patch: async(req, res) => {
        Product.updateMany({ _id: req.body._id }, { name: req.body.name, image: req.body.image, description: req.body.description },
            function(error, success) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(success);
                }
            })
    },
    delete: (req, res) => {
        Product.deleteOne({ _id: req.body._id }, function(err, result) {
            if (err) {
                console.log("error query");
            } else {
                console.log(result);
            }
        })
    }
}
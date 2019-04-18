import Product from "../../models/product";

export const getProducts = (req, res): void => {
    res.status(200).json({
        data: "All products are here"
    });
};

export const getProductById = (req, res): void => {
    const { id } = req.params;

    res.status(200).json({
        message: `Your product ID is ${id}`
    });
};

export const createProduct = async (req, res): Promise<void> => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price
    });

    try {
        await product.save();

        res.status(201).json({
            message: "New product was created",
            product
        });
    } catch (error) {
        res.status(400).json();
    }
};

export const deleteProduct = (req, res): void => {
    const { id } = req.params;

    res.status(200).json({
        message: `Product with id = ${id} was deleted successfully`
    });
};

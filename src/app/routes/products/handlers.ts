import { RequestHandler } from "express";

export const getProducts: RequestHandler = (req, res): void => {
    res.status(200).json({
        data: "All products are here"
    });
};

export const getProductById: RequestHandler = (req, res): void => {
    const { id } = req.params;

    res.status(200).json({
        message: `Your product ID is ${id}`
    });
};

export const createProduct: RequestHandler = (req, res): void => {
    res.status(200).json({
        message: "New product was created"
    });
};

export const deleteProduct: RequestHandler = (req, res): void => {
    const { id } = req.params;

    res.status(200).json({
        message: `Product with id = ${id} was deleted successfully`
    });
};

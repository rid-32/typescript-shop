import { RequestHandler } from "express";

export const getOrders: RequestHandler = (req, res): void => {
    res.status(200).json({
        message: "All orders"
    });
};

export const createOrder: RequestHandler = (req, res): void => {
    res.status(200).json({
        message: "Order was created"
    });
};

export const deleteOrder: RequestHandler = (req, res): void => {
    const { id } = req.params;

    res.status(200).json({
        message: `Order ${id} was deleted`
    });
};

export const getOrderById: RequestHandler = (req, res): void => {
    const { id } = req.params;

    res.status(200).json({
        message: `Here is your order by ID ${id}`
    });
};

import { RequestHandler } from "express";

export const getProducts: RequestHandler = (req, res) => {
  res.status(200).json({
    data: "All your products are here"
  });
};

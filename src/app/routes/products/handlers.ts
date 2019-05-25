import * as mongoose from 'mongoose';

import Product from '../../models/product';

export const getProducts = async (req, res): Promise<void> => {
  try {
    const products = await Product.find();

    res.status(200).json({
      data: products,
      length: products.length,
    });
  } catch (error) {
    res.status(404).end();
  }
};

export const getProductById = async (req, res): Promise<void> => {
  const { id } = req.params;

  try {
    const product = await Product.findById({ _id: id });

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    res.status(404).end();
  }
};

export const createProduct = async (req, res): Promise<void> => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });

  try {
    await product.save();

    res.status(201).json({
      message: 'New product was created',
      product,
    });
  } catch (error) {
    res.status(400).json();
  }
};

export const deleteProduct = async (req, res): Promise<void> => {
  const { id } = req.params;

  try {
    await Product.remove({ _id: id });

    res.status(200).end();
  } catch (error) {
    res.status(400).end();
  }
};

const getUpdatedPayload = data => {
  const validFields = ['name', 'price'];
  const result = {};

  for (const key in data) {
    if (validFields.includes(key)) result[key] = data[key];
  }

  return result;
};

export const changeProduct = async (req, res): Promise<void> => {
  const { id } = req.params;
  const payload = getUpdatedPayload(req.body);

  try {
    const result = await Product.update(
      { _id: id },
      {
        $set: payload,
      },
    );

    res.status(200).end();
  } catch (error) {
    res.status(400).end();
  }
};

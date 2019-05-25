import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

import Product from '../../models/product';

interface ProductShape {
  _id: string;
  name: string;
  price: number;
}

const productShape: ProductShape = {
  _id: null,
  name: null,
  price: null,
};
const productFieldsForSelection: string[] = Object.keys(productShape);

const getProductFromDocument = (product: Document): ProductShape => {
  const result = productShape;

  for (const key in product) {
    if (productFieldsForSelection.includes(key)) result[key] = product[key];
  }

  return result;
};

interface ProductWithMetadata extends ProductShape {
  request: {
    type: string;
    url: string;
  };
}

const getProductsWithMetadata = (products: Document[]): ProductWithMetadata[] =>
  products.map(
    (product: Document): ProductWithMetadata => {
      return {
        ...getProductFromDocument(product),
        request: {
          type: 'GET',
          url: `http://localhost:3000/products/${product._id}`,
        },
      };
    },
  );

interface ProductsResponse {
  data: ProductWithMetadata[];
  total: number;
}

export const getProducts = async (req, res): Promise<void> => {
  try {
    const products: Document[] = await Product.find().select(
      productFieldsForSelection.join(' '),
    );
    const payload: ProductsResponse = {
      data: getProductsWithMetadata(products),
      total: products.length,
    };

    res.status(200).json(payload);
  } catch (error) {
    res.status(404).end();
  }
};

export const getProductById = async (req, res): Promise<void> => {
  const { id } = req.params;

  try {
    const product = await Product.findById({ _id: id }).select(
      productFieldsForSelection.join(' '),
    );

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
    const newProduct = await product.save();

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

interface DataForUpload {
  name?: string;
  price?: number;
}

const getUpdatedPayload = (data: DataForUpload): DataForUpload => {
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
    await Product.update(
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

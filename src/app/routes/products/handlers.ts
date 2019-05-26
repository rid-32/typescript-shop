import { Document, Types } from 'mongoose';
import * as config from 'config';

import Product from '../../models/product';

interface ProductShape {
  _id: Types.ObjectId;
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

interface ProductRequest {
  type: string;
  description?: string;
  url: string;
  body?: {};
}

interface ProductWithMetadata extends ProductShape {
  request: ProductRequest;
}

const getUrl = (id: string | void): string => {
  const baseUrl = config.get<string>('BASE_URL');
  const url = `${baseUrl}/products`;

  return id ? `${url}/${id}` : url;
};

const getProductWithMetadata = (product: Document): ProductWithMetadata => ({
  ...getProductFromDocument(product),
  request: {
    type: 'GET',
    description: 'Get the product',
    url: getUrl(product._id),
  },
});

const getProductsWithMetadata = (products: Document[]): ProductWithMetadata[] =>
  products.map(getProductWithMetadata);

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
  const { id }: { id: Types.ObjectId } = req.params;

  try {
    const product: Document = await Product.findById({ _id: id }).select(
      productFieldsForSelection.join(' '),
    );

    if (product) {
      const payload = {
        ...getProductFromDocument(product),
        request: {
          type: 'GET',
          description: 'Get all products',
          url: getUrl(),
        },
      };

      res.status(200).json(payload);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    res.status(404).end();
  }
};

export const createProduct = async (req, res): Promise<void> => {
  const payloadForNewProduct: ProductShape = {
    _id: new Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  };
  const product: Document = new Product(payloadForNewProduct);

  try {
    const newProduct: Document = await product.save();
    const payload: ProductWithMetadata = getProductWithMetadata(newProduct);

    res.status(201).json(payload);
  } catch (error) {
    res.status(400).json();
  }
};

export const deleteProduct = async (req, res): Promise<void> => {
  const { id }: { id: Types.ObjectId } = req.params;

  try {
    await Product.remove({ _id: id });

    const requestForResponse: ProductRequest = {
      type: 'POST',
      description: 'Create new product',
      url: getUrl(),
      body: { name: 'String', price: 'Number' },
    };
    const response = { request: requestForResponse };

    res.status(200).json(response);
  } catch (error) {
    res.status(400).end();
  }
};

interface DataForUpload {
  name?: string;
  price?: number;
}

const getValidFieldsForUpdate = (): string[] => {
  const excludedFields = ['_id'];

  return productFieldsForSelection.filter(
    (field: string): boolean => !excludedFields.includes(field),
  );
};

const getPayloadForUpdate = (data: DataForUpload): DataForUpload => {
  const validFields: string[] = getValidFieldsForUpdate();
  const result = {};

  for (const key in data) {
    if (validFields.includes(key)) result[key] = data[key];
  }

  return result;
};

export const changeProduct = async (req, res): Promise<void> => {
  const { id }: { id: Types.ObjectId } = req.params;
  const payload: DataForUpload = getPayloadForUpdate(req.body);

  try {
    await Product.update(
      { _id: id },
      {
        $set: payload,
      },
    );

    const requestForResponse: ProductRequest = {
      type: 'GET',
      description: 'Get updated product',
      url: getUrl(String(id)),
    };
    const response = {
      request: requestForResponse,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(400).end();
  }
};

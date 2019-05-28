import { Types, Document } from 'mongoose';

import { getUrlById } from '../../utils/url';

import Order from '../../models/order';
import Product from '../../models/product';

interface OrderShape {
  _id: Types.ObjectId;
  product: Types.ObjectId;
  quantity: number;
}

interface OrderRequest {
  type: string;
  url: string;
  description: string;
  body?: {};
}

interface OrderWithMetadata extends OrderShape {
  request: OrderRequest;
}

interface OrdersListShape {
  data: OrderWithMetadata[];
  total: number;
}

const OrderShape: OrderShape = {
  _id: null,
  product: null,
  quantity: null,
};
const orderFieldsForSelection = Object.keys(OrderShape);

const getOrdersUrl = getUrlById.bind(null, 'orders');

const getOrderFromDocument = (order: Document): OrderShape => {
  const result: OrderShape = OrderShape;

  for (const key in order) {
    if (orderFieldsForSelection.includes(key)) result[key] = order[key];
  }

  return result;
};

const getOrderWithMetadata = (
  order: Document,
  meta: OrderRequest,
): OrderWithMetadata => ({
  ...getOrderFromDocument(order),
  request: meta,
});

const getOrdersWithMetadata = (orders: Document[] = []): OrderWithMetadata[] =>
  orders.map(
    (order: Document): OrderWithMetadata =>
      getOrderWithMetadata(order, {
        type: 'GET',
        url: getOrdersUrl(order._id),
        description: 'Get the order',
      }),
  );

export const getOrders = async (req, res): Promise<void> => {
  try {
    const orders: Document[] = await Order.find().select(
      orderFieldsForSelection.join(' '),
    );
    const payload: OrdersListShape = {
      data: getOrdersWithMetadata(orders),
      total: orders.length,
    };

    res.status(200).json(payload);
  } catch (error) {
    res.status(404).end();
  }
};

const createOrderOnFoundProduct = async ({
  productId,
  quantity,
}): Promise<OrderWithMetadata> => {
  const payloadForNewOrder: OrderShape = {
    _id: new Types.ObjectId(),
    product: productId,
    quantity,
  };
  const order: Document = new Order(payloadForNewOrder);
  const savedOrder: Document = await order.save();

  return getOrderWithMetadata(savedOrder, {
    type: 'GET',
    url: getOrdersUrl(order._id),
    description: 'Get the order',
  });
};

export const createOrder = async (req, res): Promise<void> => {
  try {
    const { productId, quantity } = req.body;

    const product: Document = await Product.findById({ _id: productId });

    if (product) {
      const order: OrderWithMetadata = await createOrderOnFoundProduct({
        productId,
        quantity,
      });

      res.status(201).json(order);
    } else {
      res.status(404).json({
        message: 'Product was not found',
      });
    }
  } catch (error) {
    res.status(400).end();
  }
};

export const getOrderById = async (req, res): Promise<void> => {
  const { id }: { id: Types.ObjectId } = req.params;

  try {
    const order: Document = await Order.findById({ _id: id }).select(
      orderFieldsForSelection.join(' '),
    );

    if (order) {
      const payload = getOrderWithMetadata(order, {
        type: 'GET',
        url: getOrdersUrl(),
        description: 'Get all orders',
      });

      res.status(200).json(payload);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    res.status(400).end();
  }
};

export const deleteOrder = async (req, res): Promise<void> => {
  const { id }: { id: Types.ObjectId } = req.params;

  try {
    await Order.remove({ _id: id });

    const requestForResponse: OrderRequest = {
      type: 'POST',
      url: getOrdersUrl(),
      description: 'Create new order',
      body: { productId: 'ID', quantity: 'Number' },
    };
    const response = {
      request: requestForResponse,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(400).end();
  }
};

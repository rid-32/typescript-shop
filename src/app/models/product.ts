import * as mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  _id: mongoose.SchemaTypes.ObjectId,
  name: String,
  price: Number,
});

export default mongoose.model('Product', productSchema);

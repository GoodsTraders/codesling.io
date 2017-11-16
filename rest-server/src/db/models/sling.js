import mongoose from 'mongoose';

const slingSchema = mongoose.Schema({
  slingId: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: false,
  },
  testText: {
    type: String,
    require: false,
  }
});

const Sling = mongoose.model('Sling', slingSchema);

export default Sling;

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://joginapallyr:VbCCgTQDOYvKDavc@mockapi.tbaugng.mongodb.net/?retryWrites=true&w=majority&appName=mockapi', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define loose schema — allow any fields
const recordSchema = new mongoose.Schema({}, { strict: false });
const Record = mongoose.model('Record', recordSchema);

// Root route
app.get('/', (req, res) => {
  res.send('Mock API with MongoDB (no schema) is running. Use /records endpoint.');
});

// Create record
app.post('/records', async (req, res) => {
  const record = new Record(req.body);
  await record.save();
  res.json(record);
});

// Get all records
app.get('/records', async (req, res) => {
  const records = await Record.find();
  res.json(records);
});

// Get single record
app.get('/records/:id', async (req, res) => {
  const record = await Record.findById(req.params.id);
  if (record) res.json(record);
  else res.status(404).json({ message: 'Record not found' });
});

// Update record
app.put('/records/:id', async (req, res) => {
  const record = await Record.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (record) res.json(record);
  else res.status(404).json({ message: 'Record not found' });
});

// Delete record
app.delete('/records/:id', async (req, res) => {
  await Record.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

// Root route
app.get('/', (req, res) => {
  res.send('Mock API with MongoDB (no schema) is running. Use /records endpoint.');
});

// Health check route (add this 👇)
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});


// Start server
app.listen(3000, () => {
  console.log('Mock API with MongoDB (no schema) running on http://localhost:3000');
});

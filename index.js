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
const crawlSchema = new mongoose.Schema({}, { strict: false });
const New_UpdatedCrawl = mongoose.model('New_UpdatedCrawl', crawlSchema);

// Root route
app.get('/', (req, res) => {
  res.send('Mock API with MongoDB (no schema) is running. Use /New_UpdatedCrawl endpoint.');
});

// Create record
app.post('/New_UpdatedCrawl', async (req, res) => {
  const record = new New_UpdatedCrawl(req.body);
  await record.save();
  res.json(record);
});

// Get all records
app.get('/New_UpdatedCrawl', async (req, res) => {
  const records = await New_UpdatedCrawl.find();
  res.json(records);
});

// Get single record
app.get('/New_UpdatedCrawl/:id', async (req, res) => {
  const record = await New_UpdatedCrawl.findById(req.params.id);
  if (record) res.json(record);
  else res.status(404).json({ message: 'Record not found' });
});

// Update record
app.put('/New_UpdatedCrawl/:id', async (req, res) => {
  const record = await New_UpdatedCrawl.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (record) res.json(record);
  else res.status(404).json({ message: 'Record not found' });
});

// Delete record
app.delete('/New_UpdatedCrawl/:id', async (req, res) => {
  await New_UpdatedCrawl.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Start server
app.listen(3000, () => {
  console.log('Mock API with MongoDB (no schema) running on http://localhost:3000');
});

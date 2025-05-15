import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  period_start_date: {
    type: Date,
    required: true,
  },
  period_end_date: {
    type: Date,
    required: true,
  },
  // Add other relevant fields like 'name', 'notes', etc.
  name: {
    type: String,
    default: ''
  },
  notes: {
    type: String,
    default: ''
  }
}, { timestamps: true });

// Static methods to mimic base44.entities.Budget behavior
budgetSchema.statics.list = async function (userId) {
  if (!userId) {
    console.warn('Attempting to list budgets without a userId. This is for simulation.');
    return this.find().populate('category_id');
  }
  return this.find({ user_id: userId }).populate('category_id');
};

budgetSchema.statics.create = async function (data) {
  const budget = new this(data);
  return budget.save();
};

budgetSchema.statics.update = async function (budgetId, data) {
  return this.findByIdAndUpdate(budgetId, data, { new: true });
};

budgetSchema.statics.delete = async function (budgetId) {
  return this.findByIdAndDelete(budgetId);
};

// Add other specific methods if they were part of the original Budget entity API

const Budget = mongoose.model('Budget', budgetSchema);

export default Budget;

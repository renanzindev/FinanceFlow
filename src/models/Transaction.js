import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  account_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true,
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  type: { // 'income', 'expense', 'transfer'
    type: String,
    required: true,
    enum: ['income', 'expense', 'transfer'],
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  notes: {
    type: String,
    default: '',
  },
  // For transfers, you might need a 'to_account_id'
  to_account_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: function() { return this.type === 'transfer'; }, // Required only if type is 'transfer'
  },
  // Storing updated_date as in the original stats calculation
  updated_date: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Ensure updated_date is set on save/update
transactionSchema.pre('save', function(next) {
  this.updated_date = new Date();
  next();
});

transactionSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updated_date: new Date() });
  next();
});


// Static methods to mimic base44.entities.Transaction behavior
transactionSchema.statics.list = async function (userId, orderBy = '-date', limit = null) {
  let query = this.find();
  if (userId) {
    query = query.where({ user_id: userId });
  }
  query = query.sort(orderBy); // Example: '-date' for descending date
  if (limit) {
    query = query.limit(parseInt(limit, 10));
  }
  return query.populate('category_id').populate('account_id'); // Populate related data
};

transactionSchema.statics.create = async function (data) {
  const transaction = new this(data);
  return transaction.save();
};

transactionSchema.statics.update = async function (transactionId, data) {
  return this.findByIdAndUpdate(transactionId, data, { new: true });
};

transactionSchema.statics.delete = async function (transactionId) {
  return this.findByIdAndDelete(transactionId);
};

// Method to simulate the filter functionality if used by the frontend
transactionSchema.statics.filter = async function(filterParams) {
    const query = {};
    if (filterParams.user_id) query.user_id = filterParams.user_id;
    if (filterParams.category) query.category_id = filterParams.category; // Assuming 'category' is category_id
    // Add other potential filter fields from the original Transaction.filter usage
    // e.g., date ranges, account_id, type, etc.
    return this.find(query);
};


const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;

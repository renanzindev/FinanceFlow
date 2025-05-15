import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String, // e.g., 'checking', 'savings', 'credit_card', 'investment', 'cash'
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
  },
  currency: {
    type: String,
    required: true,
    default: 'BRL',
  },
  // Add other relevant fields like 'institution', 'account_number (encrypted/masked)', etc.
  // For simplicity, keeping it minimal for now.
}, { timestamps: true });

// Static methods to mimic base44.entities.Account behavior if needed
// For example, list, create, update, delete

accountSchema.statics.list = async function (userId) {
  if (!userId) {
    // In a real app, this might throw an error or be handled based on auth context
    console.warn('Attempting to list accounts without a userId. This is for simulation.');
    return this.find();
  }
  return this.find({ user_id: userId });
};

accountSchema.statics.create = async function (data) {
  // Assuming data contains user_id and other account fields
  const account = new this(data);
  return account.save();
};

accountSchema.statics.update = async function (accountId, data) {
  return this.findByIdAndUpdate(accountId, data, { new: true });
};

accountSchema.statics.delete = async function (accountId) {
  return this.findByIdAndDelete(accountId);
};

const Account = mongoose.model('Account', accountSchema);

export default Account;

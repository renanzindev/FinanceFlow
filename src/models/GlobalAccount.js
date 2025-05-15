import mongoose from "mongoose";

// Mock schema for GlobalAccount, as requested by the user.
// This would typically have a more defined structure based on application needs.
const globalAccountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  type: { // e.g., 'bank', 'investment_platform', 'wallet_service'
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "Global Account Type",
  },
  is_default: {
    type: Boolean,
    default: true, // Assuming global accounts are defaults
  }
  // Add other relevant fields like supported_currencies, regions, etc.
}, { timestamps: true });

// Mock static methods for GlobalAccount
globalAccountSchema.statics.list = async function () {
  console.warn("GlobalAccount.list() is a mock implementation.");
  // Return a predefined list of mock global accounts or an empty array
  return this.find({ is_default: true }); // Example: find accounts marked as default
};

globalAccountSchema.statics.create = async function (data) {
  console.warn("GlobalAccount.create() is a mock implementation and might not persist data as expected.");
  const account = new this(data);
  // In a real scenario, you might prevent creation or handle it differently for global/default entities
  return account.save();
};

// Other methods (update, delete) might be restricted or not applicable for global/default accounts.
globalAccountSchema.statics.update = async function (id, data) {
  console.warn(`GlobalAccount.update(${id}) is a mock implementation.`);
  return this.findByIdAndUpdate(id, data, { new: true });
};

globalAccountSchema.statics.delete = async function (id) {
  console.warn(`GlobalAccount.delete(${id}) is a mock implementation.`);
  return this.findByIdAndDelete(id);
};

const GlobalAccount = mongoose.model("GlobalAccount", globalAccountSchema);

export default GlobalAccount;

import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: { // e.g., 'income', 'expense'
    type: String,
    required: true,
    enum: ['income', 'expense'],
  },
  icon: {
    type: String, // For storing an icon identifier or URL
    default: '',
  },
  color: {
    type: String, // For storing a color code (e.g., hex)
    default: '#FFFFFF',
  },
  is_global: {
    type: Boolean, // If it's a default/global category or user-defined
    default: false,
  }
}, { timestamps: true });

// Static methods to mimic base44.entities.Category behavior
categorySchema.statics.list = async function (userId) {
  // In a real app, filter by userId or return global categories as well
  if (!userId) {
    console.warn('Attempting to list categories without a userId. This is for simulation and might return all or global categories.');
    // For now, let's assume it lists all categories if no userId is provided, or only global ones.
    // This logic needs to align with how the frontend expects it.
    return this.find({ $or: [{ user_id: null }, { is_global: true }] });
  }
  return this.find({ $or: [{ user_id: userId }, { is_global: true }] });
};

categorySchema.statics.create = async function (data) {
  // Assuming data contains user_id and other category fields
  const category = new this(data);
  return category.save();
};

categorySchema.statics.update = async function (categoryId, data) {
  return this.findByIdAndUpdate(categoryId, data, { new: true });
};

categorySchema.statics.delete = async function (categoryId) {
  return this.findByIdAndDelete(categoryId);
};

// Method to simulate the filter functionality if used by the frontend
categorySchema.statics.filter = async function(filterParams) {
    // A simple implementation, would need to be more robust based on actual filter needs
    // Example: filterParams = { user_id: 'someId', name: 'someName' }
    const query = {};
    if (filterParams.user_id) query.user_id = filterParams.user_id;
    if (filterParams.name) query.name = { $regex: filterParams.name, $options: 'i' }; // Case-insensitive search
    // Add other potential filter fields from the original Category.filter usage
    return this.find(query);
};


const Category = mongoose.model('Category', categorySchema);

export default Category;

import mongoose from "mongoose";

// Mock schema for GlobalCategory, as requested by the user.
// This would typically have a more defined structure based on application needs.
const globalCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  type: { // e.g., 'income', 'expense'
    type: String,
    required: true,
    enum: ['income', 'expense'],
  },
  icon: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: '#CCCCCC',
  },
  is_default: {
    type: Boolean,
    default: true, // Assuming global categories are defaults
  }
}, { timestamps: true });

// Mock static methods for GlobalCategory
globalCategorySchema.statics.list = async function () {
  console.warn("GlobalCategory.list() is a mock implementation.");
  // Return a predefined list of mock global categories or an empty array
  return this.find({ is_default: true }); // Example: find categories marked as default
};

globalCategorySchema.statics.create = async function (data) {
  console.warn("GlobalCategory.create() is a mock implementation and might not persist data as expected.");
  const category = new this(data);
  // In a real scenario, you might prevent creation or handle it differently for global/default entities
  return category.save(); 
};

// Other methods (update, delete) might be restricted or not applicable for global/default categories.
// For now, we'll provide mock implementations if needed by the frontend structure.

globalCategorySchema.statics.update = async function (id, data) {
  console.warn(`GlobalCategory.update(${id}) is a mock implementation.`);
  return this.findByIdAndUpdate(id, data, { new: true });
};

globalCategorySchema.statics.delete = async function (id) {
  console.warn(`GlobalCategory.delete(${id}) is a mock implementation.`);
  return this.findByIdAndDelete(id);
};

const GlobalCategory = mongoose.model("GlobalCategory", globalCategorySchema);

export default GlobalCategory;

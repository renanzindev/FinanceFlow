import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 4, // Definir um tamanho mínimo para a senha
  },
  profile_picture: {
    type: String,
    default: "",
  },
  currency: {
    type: String,
    default: "BRL",
  },
  dateFormat: {
    type: String,
    default: "dd/MM/yyyy",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
}, { timestamps: true });

// Middleware para fazer o hash da senha antes de salvar
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Método para comparar a senha fornecida com a senha no banco de dados
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Métodos estáticos para interagir com o usuário (substituindo os anteriores)
// O método User.me() agora dependerá de um ID de usuário (ex: do token JWT)
userSchema.statics.me = async function (userId) {
  if (!userId) {
    throw new Error("ID do usuário não fornecido para buscar dados.");
  }
  // Exclui o campo de senha da resposta
  return this.findById(userId).select("-password");
};

userSchema.statics.updateMyUserData = async function (userId, data) {
  if (!userId) {
    throw new Error("ID do usuário não fornecido para atualizar dados.");
  }
  // Impede a atualização direta da senha por este método
  if (data.password) {
    delete data.password;
  }
  return this.findByIdAndUpdate(userId, data, { new: true }).select("-password");
};

const User = mongoose.model("User", userSchema);

export default User;
import User from "../models/User.js";
import Account from "../models/Account.js";
import Category from "../models/Category.js";
import Transaction from "../models/Transaction.js";
import Budget from "../models/Budget.js";
import CreditCardBill from "../models/CreditCardBill.js";
import GlobalCategory from "../models/GlobalCategory.js";
import GlobalAccount from "../models/GlobalAccount.js";

export {
    User,       // Anteriormente base44.auth
    Account,    // Anteriormente base44.entities.Account
    Transaction,// Anteriormente base44.entities.Transaction
    Category,   // Anteriormente base44.entities.Category
    Budget,     // Anteriormente base44.entities.Budget
    CreditCardBill, // Anteriormente base44.entities.CreditCardBill
    GlobalCategory, // Anteriormente base44.entities.GlobalCategory
    GlobalAccount   // Anteriormente base44.entities.GlobalAccount
};

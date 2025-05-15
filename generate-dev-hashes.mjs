import bcrypt from "bcryptjs";

async function generateAndLogHashes() {
  try {
    const adminPassword = "admin";
    const userPassword = "password123";
    const saltRounds = 10;

    const hashedAdminPassword = await bcrypt.hash(adminPassword, saltRounds);
    console.log(`Hashed Admin Password (for 'admin'): ${hashedAdminPassword}`);

    const hashedUserPassword = await bcrypt.hash(userPassword, saltRounds);
    console.log(`Hashed User Password (for 'user@example.com'): ${hashedUserPassword}`);
  } catch (error) {
    console.error("Error generating hashes:", error);
  }
}

generateAndLogHashes();

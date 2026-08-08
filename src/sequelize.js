import { Sequelize, DataTypes } from 'sequelize';

// 1. Initialize Sequelize and point it to a SQLite file
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.db', // File path or use ':memory:'
  logging: false                // Set to true to see raw SQL logs
});

// 2. Define a Model (Table Structure)
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

async function runSequelizeDemo() {
  try {
    // Sync Database (Creates table if it doesn't exist)
    await sequelize.sync({ force: true });
    console.log('Database synced successfully.');

    // =========================================================================
    // CREATE
    // =========================================================================
    const newUser = await User.create({
      name: 'Alice Smith',
      email: 'alice@example.com'
    });
    console.log(`[CREATE] Saved user ID: ${newUser.id}`);

    // =========================================================================
    // READ
    // =========================================================================
    // Read Single Row
    const singleUser = await User.findByPk(newUser.id);
    console.log('[READ ONE]', singleUser.toJSON());

    // Read All Rows
    const allUsers = await User.findAll();
    console.log(`[READ ALL] Total users found: ${allUsers.length}`);

    // =========================================================================
    // UPDATE
    // =========================================================================
    newUser.name = 'Alice Jones';
    await newUser.save(); // Persists changes to SQLite
    console.log('[UPDATE] Saved new name to database.');

    // =========================================================================
    // DELETE
    // =========================================================================
    await newUser.destroy();
    console.log('[DELETE] Removed user from database.');

  } catch (error) {
    console.error('Sequelize Error:', error);
  } finally {
    // Close the connection gracefully
    await sequelize.close();
    console.log('Connection closed.');
  }
}

runSequelizeDemo();

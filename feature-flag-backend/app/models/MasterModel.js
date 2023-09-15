
const { Sequelize, DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid'); // Import UUID generation library
const sequelize = require('../../config/database');

// Define User model
const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  
  // Define FeatureFlag model
  const FeatureFlag = sequelize.define('FeatureFlag', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: DataTypes.TEXT,
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('boolean', 'percentage', 'targeted', 'time-based'),
      allowNull: false,
    },
    targetEnvironments: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
  });

  // Define TargetGroup model
  const TargetGroup = sequelize.define('TargetGroup', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    flagState: {
      type: DataTypes.ENUM('active', 'inactive'), // Define possible flag states
      allowNull: false,
      defaultValue: 'inactive', // Set a default flag state
    },
  });

  const Company = sequelize.define('Company', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(), // Generate a UUID as the default value
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    // Add any additional fields you want for the Company model here
  });
  
  // Define FlagRule model
  const FlagRule = sequelize.define('FlagRule', {
    ruleName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ruleType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    criteria: DataTypes.JSON, // Store flagging criteria as JSON (adjust as needed)
    percentage: DataTypes.FLOAT,
  });
  
  // Define FeatureFlagUsage model
  const FeatureFlagUsage = sequelize.define('FeatureFlagUsage', {
    activationDate: DataTypes.DATE,
    deactivationDate: DataTypes.DATE,
  });
  
  // Define model associations
  User.hasMany(FeatureFlag, { foreignKey: 'createdBy' });
  FeatureFlag.belongsTo(User, { foreignKey: 'createdBy' });
  FeatureFlag.hasMany(FlagRule);
  FlagRule.belongsTo(FeatureFlag);
  FeatureFlag.hasMany(FeatureFlagUsage);
  FeatureFlagUsage.belongsTo(FeatureFlag);
  User.hasMany(FeatureFlagUsage);
  FeatureFlagUsage.belongsTo(User);
  FeatureFlag.belongsToMany(TargetGroup, { through: 'FeatureFlagTargetGroups' });
  TargetGroup.belongsToMany(Company, {
    through: 'TargetGroupCompanies',
    as: 'companies', // Alias to access associated companies
    foreignKey: 'targetGroupId',
  });
  
  // Synchronize the database (create tables) - Use a migration framework for production
  sequelize.sync({ force: true }).then(() => {
    console.log('Database synchronized.');
  }).catch((err) => {
    console.error('Database synchronization failed:', err);
  });
  
  // Export models for use in other parts of your application
  module.exports = {
    User,
    FeatureFlag,
    FlagRule,
    FeatureFlagUsage,
    TargetGroup,
    Company
  };

  
  
  
  
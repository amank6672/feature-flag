
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../../config/database');

const TargetGroups = sequelize.define("target_groups", {
	uuid: {
		type: DataTypes.STRING,
		allowNull: false,
		primaryKey: true
	},
	identifier: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true
	},
    name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
    description: {
		type: DataTypes.STRING,
	},
	targets: {
		type: DataTypes.JSON(),
	},
	isDeleted: {
		type: DataTypes.BOOLEAN,
		defaultValue: false
	}
});

module.exports = TargetGroups;
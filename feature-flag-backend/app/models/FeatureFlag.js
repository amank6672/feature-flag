
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../../config/database');

const FeatureFlag = sequelize.define("feature_flag", {
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
	environment: {
		type: DataTypes.ENUM('dev', 'qa', 'staging', 'prod')
	},
	description: {
		type: DataTypes.STRING,
	},
	prerequisite: {
		type: DataTypes.STRING,
	},
	flagState: {
		type: DataTypes.BOOLEAN,
		defaultValue: false
	},
	flagDisabledState: {
		type: DataTypes.BOOLEAN,
		defaultValue: false
	},
	flagEnabledState: {
		type: DataTypes.BOOLEAN,
		defaultValue: true
	},
	isDeleted: {
		type: DataTypes.BOOLEAN,
		defaultValue: false
	}
});

module.exports = FeatureFlag;
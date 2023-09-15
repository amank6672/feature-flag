
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../../config/database');

const FlagTargetMap = sequelize.define("flag_target_map", {
	uuid: {
		type: DataTypes.STRING,
		allowNull: false,
		primaryKey: true
	},
	flagId: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	targetGroupId: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	targetValue: {
		type: DataTypes.BOOLEAN,
		default: false
	},
	isDeleted: {
		type: DataTypes.BOOLEAN,
		defaultValue: false
	}
});

module.exports = FlagTargetMap;
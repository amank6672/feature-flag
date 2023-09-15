const crypto = require('crypto');
const FeatureFlag = require('../models/FeatureFlag');

exports.getFeatureFlagList = (req, res) => {
	FeatureFlag.findAll({
		where: {
			isDeleted: false
		}
	}).then(flagList => {
		res.status(200).json({
			data: flagList.map(flag => ({
				id: flag.uuid,
				name: flag.name,
				description: flag.description,
				identifier: flag.identifier,
				flagState: flag.flagState
			}))
		})
	}).catch(err => {
		console.log(err);
		res.status(500).send({ error: 'something blew up' })
	})

}

exports.getFeatureFlag = (req, res) => {
	FeatureFlag.findOne({
		where: {
			uuid: req.params.id
		}
	}).then(flag => {
		res.status(200).json({
			data: flag
		})
	}).catch(err => {
		console.log(err);
		res.status(500).send({ error: 'something blew up' })
	})

}

exports.addFeatureFlag = (req, res) => {
	console.log(req)
	const { name, identifier, description } = req.body;
	const flagObj = {
		uuid: crypto.randomUUID(),
		name,
		identifier,
		description: description || '',
	}

	FeatureFlag.create(flagObj)
		.then(flag => res.status(200).json({ data: flag }))
		.catch(err => {
			console.log(err);
			res.status(500).send({ error: 'something blew up' })
		})
}

exports.updateFeatureFlag = async (req, res) => {
	const { id, name, description, prerequisite, flagState, flagDisabledState, flagEnabledState } = req.body;
	const flagObj = {
		name,
		description,
		prerequisite,
		flagState,
		flagDisabledState,
		flagEnabledState
	};

	FeatureFlag.update(flagObj, {
		where: {
			uuid: id,
		},
	}).then(() => FeatureFlag.findOne({
		where: {
			uuid: id
		}
	})).then(flag => res.status(200).json({ data: flag }))
		.catch(err => {
			console.log(err);
			res.status(500).send({ error: 'something blew up' })
		})
}
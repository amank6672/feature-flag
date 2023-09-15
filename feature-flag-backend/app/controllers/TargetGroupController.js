const crypto = require('crypto');
const TargetGroup = require('../models/TargetGroups');

exports.getAllTargetGroups = (req, res) => {
	TargetGroup.findAll({
		where: {
			isDeleted: false
		}
	}).then(targetGroupList => {
		res.status(200).json({
			data: targetGroupList.map(group => ({
				id: group.uuid,
				name: group.name,
				description: group.description,
				identifier: group.identifier
			}))
		})
	}).catch(err => {
		console.log(err);
		res.status(500).send({ error: 'something blew up' })
	})

}

exports.getTargetGroup = (req, res) => {
	TargetGroup.findOne({
		where: {
			uuid: req.params.id
		}
	}).then(group => {
		res.status(200).json({
			data: group
		})
	}).catch(err => {
		console.log(err);
		res.status(500).send({ error: 'something blew up' })
	})

}

exports.addTargetGroup = (req, res) => {
	const { name, identifier, description } = req.body;
	const flagObj = {
		uuid: crypto.randomUUID(),
		name,
		identifier,
		description: description || '',
	}

	TargetGroup.create(flagObj)
		.then(group => res.status(200).json({ data: group }))
		.catch(err => {
			console.log(err);
			res.status(500).send({ error: 'something blew up' })
		})
}

exports.updateTargetGroup = async (req, res) => {
	const { id, name, description, targets } = req.body;
	const groupObj = {
		name,
		description,
		targets
	};

	TargetGroup.update(groupObj, {
		where: {
			uuid: id,
		},
	}).then(() => TargetGroup.findOne({
		where: {
			uuid: id
		}
	})).then(group => res.status(200).json({ data: group }))
		.catch(err => {
			console.log(err);
			res.status(500).send({ error: 'something blew up' })
		})
}
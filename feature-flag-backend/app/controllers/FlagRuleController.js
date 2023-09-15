const { FlagRule, FeatureFlag } = require('../models/MasterModel'); // Import your Sequelize models

// Controller function to create a new FlagRule for a specific FeatureFlag
async function createFlagRule(req, res) {
  try {
    const { featureFlagId } = req.params; // Extract the FeatureFlag ID from the URL
    const { ruleName, ruleType, criteria, percentage } = req.body;

    // Check if the associated FeatureFlag exists
    const featureFlag = await FeatureFlag.findByPk(featureFlagId);
    if (!featureFlag) {
      return res.status(404).json({ error: 'Feature flag not found' });
    }

    // Create the FlagRule associated with the FeatureFlag
    const flagRule = await FlagRule.create({
      ruleName,
      ruleType,
      criteria,
      percentage,
      FeatureFlagId: featureFlag.id,
    });

    res.status(201).json(flagRule);
  } catch (error) {
    console.error('Error creating FlagRule:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Controller function to update a FlagRule by its ID
async function updateFlagRule(req, res) {
  try {
    const { id } = req.params; // Extract the FlagRule ID from the URL
    const { ruleName, ruleType, criteria, percentage } = req.body;

    // Check if the FlagRule exists
    const flagRule = await FlagRule.findByPk(id);
    if (!flagRule) {
      return res.status(404).json({ error: 'Flag rule not found' });
    }

    // Update the FlagRule's properties
    flagRule.ruleName = ruleName;
    flagRule.ruleType = ruleType;
    flagRule.criteria = criteria;
    flagRule.percentage = percentage;

    // Save the updated FlagRule to the database
    await flagRule.save();

    res.json(flagRule);
  } catch (error) {
    console.error('Error updating FlagRule:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Controller function to delete a FlagRule by its ID
async function deleteFlagRule(req, res) {
  try {
    const { id } = req.params; // Extract the FlagRule ID from the URL

    // Check if the FlagRule exists
    const flagRule = await FlagRule.findByPk(id);
    if (!flagRule) {
      return res.status(404).json({ error: 'Flag rule not found' });
    }

    // Delete the FlagRule from the database
    await flagRule.destroy();

    res.status(204).end(); // Respond with 204 (No Content) on successful deletion
  } catch (error) {
    console.error('Error deleting FlagRule:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Controller function to get a FlagRule by its ID
async function getFlagRuleById(req, res) {
  try {
    const { id } = req.params; // Extract the FlagRule ID from the URL

    // Check if the FlagRule exists
    const flagRule = await FlagRule.findByPk(id);
    if (!flagRule) {
      return res.status(404).json({ error: 'Flag rule not found' });
    }

    res.json(flagRule);
  } catch (error) {
    console.error('Error fetching FlagRule:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  createFlagRule,
  updateFlagRule,
  deleteFlagRule,
  getFlagRuleById,
  // Export other controller functions here
};

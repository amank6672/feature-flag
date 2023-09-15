const { FeatureFlagUsage, User, FeatureFlag } = require('./models'); // Import your Sequelize models

// Controller function to create a new FeatureFlagUsage record
async function createFeatureFlagUsage(req, res) {
  try {
    const { featureFlagId } = req.params; // Extract the FeatureFlag ID from the URL
    const { userId, activationDate, deactivationDate } = req.body;

    // Check if the associated FeatureFlag and User exist
    const [featureFlag, user] = await Promise.all([
      FeatureFlag.findByPk(featureFlagId),
      User.findByPk(userId),
    ]);

    if (!featureFlag || !user) {
      return res.status(404).json({ error: 'Feature flag or user not found' });
    }

    // Create the FeatureFlagUsage record associated with the FeatureFlag and User
    const featureFlagUsage = await FeatureFlagUsage.create({
      activationDate,
      deactivationDate,
      FeatureFlagId: featureFlag.id,
      UserId: user.id,
    });

    res.status(201).json(featureFlagUsage);
  } catch (error) {
    console.error('Error creating FeatureFlagUsage:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Controller function to update a FeatureFlagUsage record by its ID
async function updateFeatureFlagUsage(req, res) {
  try {
    const { id } = req.params; // Extract the FeatureFlagUsage ID from the URL
    const { activationDate, deactivationDate } = req.body;

    // Check if the FeatureFlagUsage record exists
    const featureFlagUsage = await FeatureFlagUsage.findByPk(id);
    if (!featureFlagUsage) {
      return res.status(404).json({ error: 'Feature flag usage record not found' });
    }

    // Update the FeatureFlagUsage record's properties
    featureFlagUsage.activationDate = activationDate;
    featureFlagUsage.deactivationDate = deactivationDate;

    // Save the updated FeatureFlagUsage record to the database
    await featureFlagUsage.save();

    res.json(featureFlagUsage);
  } catch (error) {
    console.error('Error updating FeatureFlagUsage:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Controller function to delete a FeatureFlagUsage record by its ID
async function deleteFeatureFlagUsage(req, res) {
  try {
    const { id } = req.params; // Extract the FeatureFlagUsage ID from the URL

    // Check if the FeatureFlagUsage record exists
    const featureFlagUsage = await FeatureFlagUsage.findByPk(id);
    if (!featureFlagUsage) {
      return res.status(404).json({ error: 'Feature flag usage record not found' });
    }

    // Delete the FeatureFlagUsage record from the database
    await featureFlagUsage.destroy();

    res.status(204).end(); // Respond with 204 (No Content) on successful deletion
  } catch (error) {
    console.error('Error deleting FeatureFlagUsage:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Controller function to get a FeatureFlagUsage record by its ID
async function getFeatureFlagUsageById(req, res) {
  try {
    const { id } = req.params; // Extract the FeatureFlagUsage ID from the URL

    // Check if the FeatureFlagUsage record exists
    const featureFlagUsage = await FeatureFlagUsage.findByPk(id);
    if (!featureFlagUsage) {
      return res.status(404).json({ error: 'Feature flag usage record not found' });
    }

    res.json(featureFlagUsage);
  } catch (error) {
    console.error('Error fetching FeatureFlagUsage:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  createFeatureFlagUsage,
  updateFeatureFlagUsage,
  deleteFeatureFlagUsage,
  getFeatureFlagUsageById,
  // Export other controller functions here
};

const { User, FeatureFlag, FlagRule, FeatureFlagUsage, TargetGroup, Company } = require('../models/MasterModel'); // Import your Sequelize models

// Controller function to create a new feature flag
async function createFeatureFlag(req, res) {
    try {
        const { name, description, status, type, targetEnvironments, startDate, endDate } = req.body;

        // Create the feature flag in the database
        const featureFlag = await FeatureFlag.create({
            name,
            description,
            status,
            type,
            targetEnvironments,
            startDate,
            endDate,
            createdBy: req.user.id, // Assuming you have user authentication and can access the user's ID from req.user
        });

        res.status(201).json(featureFlag);
    } catch (error) {
        console.error('Error creating feature flag:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Controller function to get a list of all feature flags
async function getAllFeatureFlags(req, res) {
    try {
        const featureFlags = await FeatureFlag.findAll();
        res.json(featureFlags);
    } catch (error) {
        console.error('Error fetching feature flags:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Controller function to update a feature flag by its ID
async function updateFeatureFlag(req, res) {
    try {
        const { id } = req.params; // Extract the feature flag ID from the URL
        const { name, description, status, type, targetEnvironments, startDate, endDate } = req.body;

        // Check if the feature flag exists
        const featureFlag = await FeatureFlag.findByPk(id);
        if (!featureFlag) {
            return res.status(404).json({ error: 'Feature flag not found' });
        }

        // Update the feature flag's properties
        featureFlag.name = name;
        featureFlag.description = description;
        featureFlag.status = status;
        featureFlag.type = type;
        featureFlag.targetEnvironments = targetEnvironments;
        featureFlag.startDate = startDate;
        featureFlag.endDate = endDate;

        // Save the updated feature flag to the database
        await featureFlag.save();

        res.json(featureFlag);
    } catch (error) {
        console.error('Error updating feature flag:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Controller function to delete a feature flag by its ID
async function deleteFeatureFlag(req, res) {
    try {
        const { id } = req.params; // Extract the feature flag ID from the URL

        // Check if the feature flag exists
        const featureFlag = await FeatureFlag.findByPk(id);
        if (!featureFlag) {
            return res.status(404).json({ error: 'Feature flag not found' });
        }

        // Delete the feature flag from the database
        await featureFlag.destroy();

        res.status(204).end(); // Respond with 204 (No Content) on successful deletion
    } catch (error) {
        console.error('Error deleting feature flag:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Controller function to get a feature flag by its ID
async function getFeatureFlagById(req, res) {
    try {
        const { id } = req.params; // Extract the feature flag ID from the URL

        // Check if the feature flag exists
        const featureFlag = await FeatureFlag.findByPk(id);
        if (!featureFlag) {
            return res.status(404).json({ error: 'Feature flag not found' });
        }

        res.json(featureFlag);
    } catch (error) {
        console.error('Error fetching feature flag:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Controller function to associate a FeatureFlag with one or more TargetGroups
async function associateFeatureFlagWithTargetGroups(req, res) {
    try {
        const { featureFlagId } = req.params; // Extract the FeatureFlag ID from the URL
        const { targetGroupIds } = req.body;

        // Check if the FeatureFlag exists
        const featureFlag = await FeatureFlag.findByPk(featureFlagId);
        if (!featureFlag) {
            return res.status(404).json({ error: 'Feature flag not found' });
        }

        // Find the TargetGroups by their IDs
        const targetGroups = await TargetGroup.findAll({
            where: {
                id: targetGroupIds,
            },
        });

        // Associate the FeatureFlag with the selected TargetGroups
        await featureFlag.addTargetGroups(targetGroups);

        res.json({ message: 'Target groups associated with the feature flag successfully' });
    } catch (error) {
        console.error('Error associating target groups with feature flag:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function getAllFlagsForCompany(req, res) {
    try {
        const { companyId } = req.params; // Extract the company ID from the URL

        // Find all TargetGroups associated with the company
        const targetGroups = await TargetGroup.findAll({
            include: [
                {
                    model: Company,
                    where: {
                        id: companyId,
                    },
                    as: 'companies', // Alias to access associated companies
                },
            ],
        });

        // Initialize an array to store feature flags and their statuses
        const flagsWithStatus = [];

        // Iterate through each TargetGroup
        for (const targetGroup of targetGroups) {
            // Iterate through associated companies of the TargetGroup
            for (const company of targetGroup.companies) {
                // Find feature flags associated with the company
                const featureFlags = await FeatureFlag.findAll({
                    where: {
                        companyId: company.id,
                    },
                });

                // Apply the flag state from the TargetGroup to the feature flags
                for (const featureFlag of featureFlags) {
                    const flagStatus = targetGroup.flagState;

                    // Add the feature flag and its status to the result array
                    flagsWithStatus.push({
                        id: featureFlag.id,
                        name: featureFlag.name,
                        status: flagStatus,
                    });
                }
            }
        }

        // Find feature flags not associated with any TargetGroup
        const featureFlagsWithoutTargetGroup = await FeatureFlag.findAll({
            where: {
                companyId: companyId,
                TargetGroupId: null, // Check for flags with no associated TargetGroup
            },
        });

        // Apply the flag status from the FeatureFlag model to these flags
        for (const featureFlag of featureFlagsWithoutTargetGroup) {
            flagsWithStatus.push({
                id: featureFlag.id,
                name: featureFlag.name,
                status: featureFlag.status, // Use the flag status from the FeatureFlag model
            });
        }

        res.json(flagsWithStatus);
    } catch (error) {
        console.error('Error computing flags for company:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}



module.exports = {
    createFeatureFlag,
    getAllFeatureFlags,
    updateFeatureFlag,
    deleteFeatureFlag,
    getFeatureFlagById,
    associateFeatureFlagWithTargetGroups,
    getAllFlagsForCompany
};

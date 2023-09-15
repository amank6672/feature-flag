const express = require('express');
const router = express.Router();
const version = process.env.API_VERSION;

const FeatureFlagController = require('../app/controllers/FeatureFlagController');
const TargetGroupController = require('../app/controllers/TargetGroupController');

router.get(`/api/${version}/get-feature-flags`, FeatureFlagController.getFeatureFlagList);
router.get(`/api/${version}/get-feature-flag/:id`, FeatureFlagController.getFeatureFlag);
router.post(`/api/${version}/add-feature-flag`, FeatureFlagController.addFeatureFlag);
router.post(`/api/${version}/update-feature-flag`, FeatureFlagController.updateFeatureFlag);
router.get(`/api/${version}/get-target-groups`, TargetGroupController.getAllTargetGroups);
router.get(`/api/${version}/get-target-group/:id`, TargetGroupController.getTargetGroup);
router.post(`/api/${version}/add-target-group`, TargetGroupController.addTargetGroup);
router.post(`/api/${version}/update-target-group`, TargetGroupController.updateTargetGroup);

module.exports = router;
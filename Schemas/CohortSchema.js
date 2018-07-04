const mongoose = require('mongoose');

const cohortSchema = new mongoose.Schema({
    cohort_name: {
        type: String
    }
});

const cohortModel = mongoose.model("Cohort", cohortSchema, "cohorts");

module.exports = cohortModel;


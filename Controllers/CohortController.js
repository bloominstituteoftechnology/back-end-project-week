const router = require("express").Router();
const Cohorts = require("../Schemas/CohortSchema");

const post = (req, res) => {
    const { cohort_name } = req.body;
    Cohorts.create({ cohort_name })
        .then(cohort => {
            res.status(201).json(cohort);
        })
        .catch(err => {
            res.status(500).json({Error: err.message});
        });
};
// "https://lambnotes.herokuapp.com/api/cohorts/"
router.route("/").post(post);




module.exports = router;
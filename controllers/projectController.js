const knex = require("knex");
const knexConfig = require("../knexfile");
const db = knex(knexConfig.development);

const controllersProject = {
  addProject(req, res, next) {
    if (!req.body.name || req.body.length <= 0) {
      next(new Error("EMPTY BODY"));
    }
    const projectName = req.body;
    db("projects")
      .insert(projectName)
      .then(id => res.status(201).json(id))
      .catch(()=> next(new Error("Project Not Added")));
      .catch(next)
  },

  addAction(req, res, next) {
    if (req.body.length <= 0) {
      next(new Error("EMPTY BODY"));
    }
    const actionName = req.body;
    db("actions")
      .insert(actionName)
      .then(id => res.status(201).json(id))
      .catch(()=> next(new Error("ID NOT FOUND")));
  },


  // retrieve data from two tables
  getProjectAction(req, res, next) {
    db("projects")
      .select("projects.id", "projects.name", "actions.description")
      .where("projects.id", req.params.id)
      .join("actions", { "projects.id": "actions.project_id" })
      .then(project => {
        // console.log("project = ", projects.id);
        if (!project.length) {
          next(new Error("ID NOT FOUND"));
        } else res.status(200).json(project);
      })
      .catch(next);
  },

  getProject(req, res, next) {
    db("projects")
      .then(project => {
        if (!project.length) {
          next(new Error("ID NOT FOUND"));
        }
        res.status(200).json(project);
      })
      .catch(next(new Error("ID NOT FOUND")));
  }
};

module.exports = controllersProject;

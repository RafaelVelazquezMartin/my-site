const mongoose = require("mongoose");

const Project = require("../models/project");
const Image = require("../models/image");

exports.projects_get_all = (req, res, next) => {
  Project.find()
    .populate("images", "title caption imagePath")
    .populate("stack", "name type logo slug _id")
    .select("name description images stack importance author slug _id")
    .then(projects => {
      const response = {
        count: projects.length,
        projects: projects.map(project => {
          return {
            name: project.name,
            description: project.description,
            images: project.images,
            stack: project.stack,
            importance: project.importance,
            author: project.author,
            slug: project.slug,
            _id: project._id
          };
        })
      };
      if (projects.length > 0) {
        res.status(200).json(response);
      } else {
        res.status(404).json({ message: "There are currently no projects" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

exports.projects_store_all = (req, res, next) => {
  let projects = req.body.projects;
};

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

exports.projects_get_project = (req, res, next) => {
  const id = req.params.project_id;
  Project.findOne({ _id: id })
    .select("name  description importance stack slug images author")
    .populate("images", "filename imagePath")
    .populate("stack", "name type logo slug _id")
    .populate("author", "email")
    .then(project => {
      if (!project) {
        return res.status(404).json({ message: "No such project exists" });
      }
      res.status(200).json(project);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

exports.projects_create_project = (req, res, next) => {
  console.log("BODY", req.body);

  var images = new Array();
  if (req.body.images) {
    req.body.images.forEach((image, i) => {
      images.push(image._id);
    });
  }

  // var stack = new Array();
  // if (req.body.stack) {
  //   JSON.parse(req.body.stack).forEach((tech, i) => {
  //     stack.push(tech);
  //   });
  //   console.log("STACK: " + stack);
  // }

  const project = new Project({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    description: req.body.description,
    images: images,
    stack: req.body.stack ? req.body.stack : [], // not sure if valid
    importance: req.body.importance,
    author: req.user_data.user_id,
    slug: slugify(req.body.name)
  });

  project
    .save()
    .then(result => {
      res.status(201).json({
        message: "Project created successfully",
        createdProject: {
          name: result.name,
          description: result.description,
          _id: result._id,
          // images: result.images,
          images: images,
          stack: result.stack,
          importance: result.importance,
          author: result.author,
          slug: result.slug
        },
        request: {
          type: "GET",
          url: "https://cors-anywhere.herokuapp.com/http://35.222.61.88/projects/" + result._id
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.projects_update_project = (req, res, next) => {
  const id = req.params.project_id;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  if (updateOps.name) {
    updateOps["slug"] = slugify(updateOps.name);
  }
  Project.findOne({ _id: id })
    .select("-__v")
    .then(oldProject => {
      Project.findByIdAndUpdate(
        { _id: id },
        { $set: updateOps },
        { new: true },
        (err, newP) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          }
          res.status(200).json({
            message: "Project updated",
            oldProject: oldProject,
            updatedProject: newP
          });
        }
      ).select("-__v");
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

exports.projects_delete_project = (req, res, next) => {
  Project.findById(req.params.project_id)
    .then(project => {
      Project.remove({ _id: req.params.project_id })
        .then(result => {
          res.status(200).json({
            message: "Project successfully deleted",
            deletedProject: project
          });
        })
        .catch(err => {
          res.status(500).json({ error: err });
        });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

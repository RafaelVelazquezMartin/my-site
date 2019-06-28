const mongoose = require("mongoose");

const Technology = require("../models/technology");

exports.technologies_get_all = (req, res, next) => {
  Technology.find()
    .select("name logo slug type _id")
    .then(technologies => {
      const response = {
        count: technologies.length,
        technologies: technologies.map(technology => {
          return {
            name: technology.name,
            type: technology.type,
            logo: technology.logo,
            slug: technology.slug,
            _id: technology._id
          };
        })
      };
      if (technologies.length > 0) {
        res.status(200).json(response);
      } else {
        res
          .status(404)
          .json({ message: "There are currently no technologies" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

exports.technologies_get_technology = (req, res, next) => {
  const id = req.params.technology_id;
  Technology.findOne({ _id: id })
    .select("name logo slug type _id")
    .then(technology => {
      if (!technology) {
        return res.status(404).json({ message: "No such technology exists" });
      }
      res.status(200).json(technology);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

exports.technologies_create_technology = (req, res, next) => {
  console.log("BODY", req.body);
  // console.log("FILES", req.files);

  const technology = new Technology({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    // logo: req.file.path,
    logo: req.body.logo,
    type: req.body.type,
    slug: slugify(req.body.name)
  });

  technology
    .save()
    .then(result => {
      res.status(201).json({
        message: "Techonology created successfully",
        createdTech: {
          name: result.name,
          logo: result.logo,
          _id: result._id,
          type: result.type,
          slug: result.slug
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.technologies_update_technology = (req, res, next) => {
  const id = req.params.technology_id;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  if (updateOps.name) {
    updateOps["slug"] = slugify(updateOps.name);
  }
  Project.findOne({ _id: id })
    .select("-__v")
    .then(oldTech => {
      Technology.findByIdAndUpdate(
        { _id: id },
        { $set: updateOps },
        { new: true },
        (err, newT) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          }
          res.status(200).json({
            message: "Technology updated",
            oldTech: oldTech,
            updatedTech: newT
          });
        }
      ).select("-__v");
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

exports.technologies_delete_technology = (req, res, next) => {
  Technology.findById(req.params.technology_id)
    .then(technology => {
      Technology.remove({ _id: req.params.technology_id })
        .then(result => {
          res.status(200).json({
            message: "Project successfully deleted",
            deletedTech: technology
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

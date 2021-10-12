var express = require("express");
var router = express.Router();
const database = require("../database/models/index");
const Trainer = database.db.Trainer;
const TrainingStaff = database.db.TrainingStaff;

//************TRAINER *********************/

/* GET index page. */
router.get("/", async function (req, res) {
  try {
    const trainers = await Trainer.findAll();
    const trainingStaffs = await TrainingStaff.findAll();
    //res.render("admin/index", { trainers: trainers });
    res.render("layouts/master", {
      content: "../admin/index",
      trainers: trainers,
      trainingStaffs: trainingStaffs,
      successFlashMessage: req.flash("successFlashMessage"),
      errorFlashMessage: req.flash("errorFlashMessage"),
    });
  } catch (error) {
    console.log(error);
  }
});

/* GET create page. */
router.get("/create_trainer", function (req, res, next) {
  //res.render("trainer_view/create");
  res.render("layouts/master", {
    content: "../trainer_view/create",
    successFlashMessage: req.flash("successFlashMessage"),
    errorFlashMessage: req.flash("errorFlashMessage"),
  });
});

/* POST add trainer. */
router.post("/add_trainer", async function (req, res) {
  // const username = req.body.username;
  // const password = req.body.password;
  const { username, password } = req.body;
  try {
    const trainer = await Trainer.create({
      username: username,
      password: password,
    });

    if (trainer) {
      req.flash(
        "successFlashMessage",
        `Create trainer ${trainer.username} successfully`
      );
    }
    res.redirect("/admin");
  } catch (error) {
    req.flash("errorFlashMessage", error);
    console.log(error);
  }
});

/* GET create page. */
router.get("/delete_trainer/:trainerId", async function (req, res) {
  const { trainerId } = req.params;
  try {
    const deletedTrainer = await Trainer.destroy({
      where: {
        id: trainerId,
      },
    });

    if (deletedTrainer) {
      req.flash("successFlashMessage", "Delete trainer successfully");
      res.redirect("/admin");
    }

    req.flash("errorFlashMessage", "Delete trainer failed");
    res.redirect("/admin");
  } catch (error) {
    console.log(error);
  }
});

/* GET update page. */
router.get("/update_trainer/:trainerId", async function (req, res, next) {
  const { trainerId } = req.params;
  try {
    const trainer = await Trainer.findOne({
      where: {
        id: trainerId,
      },
    });

    const { username, password, id } = trainer.dataValues;
    //res.render("trainer_view/update", { username, password, id });
    res.render("layouts/master", {
      content: "../trainer_view/update",
      id,
      username,
      password,
      successFlashMessage: req.flash("successFlashMessage"),
      errorFlashMessage: req.flash("errorFlashMessage"),
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/edit_trainer", async function (req, res) {
  const { id, username, password } = req.body;
  try {
    const updatedTrainer = await Trainer.update(
      { username: username, password: password },
      {
        where: {
          id: id,
        },
      }
    );

    if (updatedTrainer) {
      req.flash("successFlashMessage", "Update trainer successfully");
      res.redirect("/admin");
    }

    req.flash("errorFlashMeesage", "Update trainer failed");
    res.redirect("/admin");
  } catch (error) {
    console.log(error);
  }
});

//*************TRAINING STAFF ****************/

/* GET create page. */
router.get("/create_trainingStaff", function (req, res, next) {
  //res.render("trainer_view/create");
  res.render("layouts/master", {
    content: "../trainingStaff_view/create",
    successFlashMessage: req.flash("successFlashMessage"),
    errorFlashMessage: req.flash("errorFlashMessage"),
  });
});

/* POST add trainingStaff. */
router.post("/add_trainingStaff", async function (req, res) {
  const { username, password } = req.body;
  try {
    const trainingStaff = await TrainingStaff.create({
      username: username,
      password: password,
    });

    if (trainingStaff) {
      req.flash(
        "successFlashMessage",
        `Create trainingStaff ${trainingStaff.username} successfully`
      );
    }
    res.redirect("/admin");
  } catch (error) {
    req.flash("errorFlashMessage", error);
    console.log(error);
  }
});

module.exports = router;

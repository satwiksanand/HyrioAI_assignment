const { jobModel } = require("../db/index");
const customError = require("../utils/customError");
const zod = require("zod");

const jobSchema = zod.object({
  title: zod.string().nonempty(),
  description: zod.string().nonempty(),
  experience: zod.enum(["BEGINNER", "INTERMEDIATE", "EXPERT"]),
  endDate: zod.date(),
});

const addCandidateSchema = zod.object({
  candidateEmail: zod.string().email(),
  jobId: zod.string().nonempty(),
});

const createJob = async (req, res, next) => {
  const job = {
    title: req.body.title,
    description: req.body.description,
    experience: req.body.experience,
    endDate: new Date(req.body.endDate),
  };
  try {
    if (!jobSchema.safeParse(job).success) {
      throw customError(400, "Invalid details!");
    }
    //let's say one company can post many jobs with the same title and description for now.
    const newJob = new jobModel({
      author: req.company._id,
      title: job.title,
      description: job.description,
      experience: job.experience,
      endDate: job.endDate,
    });
    await newJob.save();
    return res.status(201).json({
      message: "job created successfully!",
    });
  } catch (err) {
    next(err);
  }
};

// i don't know what the ui requirements are man so i'm just going to let it be simple.

const addCandidate = async (req, res, next) => {
  //the body here will contain only one string and that will be the email.
  //i am expecting the jobid of the job here so take that into account.
  const details = {
    candidateEmail: req.body.candidateEmail,
    jobId: req.body.jobId,
  };
  try {
    if (!addCandidateSchema.safeParse(details).success) {
      throw customError(400, "Invalid details!");
    }
    await jobModel.findByIdAndUpdate(req.body.jobId, {
      $addToSet: { candidate: details.candidateEmail }, //no duplicate user in the applied list.
    });
    return res.status(201).json({
      message: "Candidate added successfully!",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createJob,
  addCandidate,
};

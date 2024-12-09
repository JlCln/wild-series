import type { RequestHandler } from "express";
import programRepository from "./programRepository";
import { programSchema } from "./validator/programValidator";

/* ************************************************************************* */

const browse: RequestHandler = async (_req, res, next) => {
  try {
    const programs = await programRepository.readAll();
    res.json(programs);
  } catch (err) {
    next(err);
  }
};

const readAll: RequestHandler = async (req, res, next) => {
  try {
    const programsFromDB = await programRepository.readAll();

    res.json(programsFromDB);
  } catch (error) {
    next(error);
  }
};

/* ************************************************************************* */

const read: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id) || id <= 0) {
      res.status(400).json({
        error: "Invalid program ID",
      });
      return;
    }

    const program = await programRepository.read(id);

    if (!program) {
      res.sendStatus(404);
      return;
    }

    res.json(program);
  } catch (err) {
    next(err);
  }
};

/* ************************************************************************* */

const edit: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const updateData = req.body;

    console.info("Received update data:", updateData);

    if (Number.isNaN(id) || id <= 0) {
      res.status(400).json({
        error: "Invalid program ID",
      });
      return;
    }

    if (!updateData.title || !updateData.category_id) {
      res.status(400).json({
        error: "Title and category_id are required",
      });
      return;
    }

    const success = await programRepository.update(id, {
      title: updateData.title,
      synopsis: updateData.synopsis || "",
      poster: updateData.poster || "",
      country: updateData.country || "",
      year: Number(updateData.year) || new Date().getFullYear(),
      category_id: Number(updateData.category_id),
    });

    if (!success) {
      res.status(400).json({
        error: "Failed to update program",
      });
      return;
    }

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

/* ************************************************************************* */

const add: RequestHandler = async (req, res, next) => {
  try {
    const newProgram = {
      title: req.body.title,
      synopsis: req.body.synopsis || "",
      poster: req.body.poster || "",
      country: req.body.country || "",
      year: Number(req.body.year) || new Date().getFullYear(),
      category_id: Number(req.body.category_id),
    };

    const insertId = await programRepository.create(newProgram);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

/* ************************************************************************* */

const destroy: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id) || id <= 0) {
      res.status(400).json({
        error: "Invalid program ID",
      });
      return;
    }

    await programRepository.delete(id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default { browse, read, edit, add, destroy };

import Resource from "../models/resource.model.js";
import { errorHandler } from "../utils/error.js";

// Create a new resource
export const createResource = async (req, res, next) => {
  try {
    const newResource = await Resource.create(req.body);
    res.status(201).json({ message: "Resource created successfully!", resource: newResource });
  } catch (error) {
    next(error);
  }
};

// Get all resources
export const getAllResources = async (req, res, next) => {
  try {
    const resources = await Resource.find();
    res.status(200).json(resources);
  } catch (error) {
    next(error);
  }
};

// Update an existing resource
export const updateResource = async (req, res, next) => {
  try {
    const updatedResource = await Resource.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedResource) {
      return next(errorHandler(404, "Resource not found!"));
    }
    res.status(200).json(updatedResource);
  } catch (error) {
    next(error);
  }
};

// Delete a resource
export const deleteResource = async (req, res, next) => {
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: "Resource not found!" });
    }
    res.status(200).json({ message: "Resource deleted successfully!" });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid resource ID!" });
    }
    next(error);
  }
};


const mongoose = require("mongoose");
const Blog = require("../model/Blog.js");
const User = require("../model/User.js");
const logger = require("../logger/logging.js");

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("user");
    logger.info("Successfully fetched all blogs");
    return res.status(200).json({ blogs });
  } catch (error) {
    logger.error(`Error fetching blogs: ${error.message}`);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.addBlog = async (req, res) => {
  const { title, content, image, user } = req.body;

  try {
    const existingUser = await User.findById(user);

    if (!existingUser) {
      logger.warn(`Unable to find user by id: ${user}`);
      return res.status(400).json({ message: "Unable to find user by this Id" });
    }

    const blog = new Blog({ title, content, image, user });

    const session = await mongoose.startSession();
    session.startTransaction();

    await blog.save({ session });
    existingUser.blogs.push(blog);
    await existingUser.save({ session });

    await session.commitTransaction();
    session.endSession();

    logger.info(`Successfully added blog: ${blog.title}`);
    return res.status(200).json({ blog });
  } catch (error) {
    logger.error(`Error adding blog: ${error.message}`);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateBlog = async (req, res) => {
  const { title, content, image } = req.body;
  const blogId = req.params.id;

  try {
    const blog = await Blog.findByIdAndUpdate(blogId, { title, content, image });

    if (!blog) {
      logger.warn(`Blog not found for update with id: ${blogId}`);
      return res.status(404).json({ message: "Blog not found" });
    }

    logger.info(`Successfully updated blog: ${blog.title}`);
    return res.status(200).json({ blog });
  } catch (error) {
    logger.error(`Error updating blog: ${error.message}`);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getBlogById = async (req, res) => {
  const blogId = req.params.id;

  try {
    const blog = await Blog.findById(blogId);

    if (!blog) {
      logger.warn(`Blog not found with id: ${blogId}`);
      return res.status(404).json({ message: "Blog not found" });
    }

    logger.info(`Successfully fetched blog by ID: ${blog.title}`);
    return res.status(200).json({ blog });
  } catch (error) {
    logger.error(`Error fetching blog by ID: ${error.message}`);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndRemove(req.params.id).populate("user");

    if (!blog) {
      logger.warn(`Blog not found for deletion with id: ${req.params.id}`);
      return res.status(404).json({ message: "Blog not found" });
    }

    await blog.user.blogs.pull(blog);
    await blog.user.save();

    logger.info(`Successfully deleted blog: ${blog.title}`);
    return res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    logger.error(`Error deleting blog: ${error.message}`);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const userBlogs = await User.findById(userId).populate("blogs");

    if (!userBlogs) {
      logger.warn(`User not found with id: ${userId}`);
      return res.status(404).json({ message: "User not found" });
    }

    logger.info(`Successfully fetched user by ID: ${userBlogs.name}`);
    return res.status(200).json({ user: userBlogs });
  } catch (error) {
    logger.error(`Error fetching user by ID: ${error.message}`);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
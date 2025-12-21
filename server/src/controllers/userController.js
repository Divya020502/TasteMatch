import User from "../models/User.js";

/**
 * GET user profile
 */
export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-passwordHash");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

/**
 * UPDATE user profile (taste, cuisines, diet)
 */
export const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        tasteProfile: req.body.tasteProfile,
        cuisines: req.body.cuisines,
        diet: req.body.diet,
      },
      { new: true }
    );

    // ✅ MUST SEND RESPONSE
    res.status(200).json({
      message: "Profile updated successfully",
      user,
    });
  } catch (err) {
    next(err);
  }
};


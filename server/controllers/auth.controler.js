export const authHandler = async (req, res) => {
  try {
    return res.status(200).json({ message: "Auth successful", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

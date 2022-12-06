const isAdmin = async (req, res, next) => {
    if (!req?.user?.isAdmin) {
      return res.sendStatus(403);
    } else {
      next();
    }
};

export default isAdmin;
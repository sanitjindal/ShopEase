import express from "express";
import passport from "passport";
const router = express.Router();

// Route for initiating Google authentication
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback route for Google authentication
router.get('/auth/google/callback', 
  passport.authenticate('google', {
    failureRedirect: `${process.env.FRONTEND_URL}/login`,
    session: false
  }),
  (req, res) => {
    const token = req.user.generateJWT();
    const user = req.user;

    const userStr = encodeURIComponent(JSON.stringify(user));

    res.redirect(`${process.env.FRONTEND_URL}/google/callback?token=${token}&user=${userStr}`);
  }
);

// Route to check login status
router.get('/login/success', async (req, res) => {
  if (req.user) {
    res.status(200).json({ message: 'user login', user: req.user });
  } else {
    res.status(400).json({ message: 'not authorized' });
  }
});


export default router;

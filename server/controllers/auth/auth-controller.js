import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";

//register
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body; //Getting the data from the frontend side

  const checkUser = await User.findOne({ email });
  const checkName = await User.findOne({ userName });
  if (checkUser)
    return res.json({
      success: false,
      message: "User Already exists with the same email",
    });
  if (checkName)
    return res.json({
      success: false,
      message: "User Already exists with the same Username",
    });
  try {
    const hashPassword = await bycrypt.hash(password, 12); //Hashing the value with the password using salt number 12
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });

    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Sign Up Successful",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};
//login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return res.json({
        success: false,
        message: "User doesn't exists ! Please Register first",
      });

    const checkPasswordMatch = await bycrypt.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch)
      return res.json({
        success: false,
        message: "Incorrect Password! Please enter the correct Password",
      });

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    ); //Create a token for the logged in user

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged in successfully",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        userName: checkUser.userName,
      },
    }); //cookie for keeping the user logged in
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

//logout
const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully",
  });
};

//auth middleware
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorised user",
    });

  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY"); //Verifying the token against the CLIENT_SECRET_KEY
    req.user = decoded;
    next(); //Then, next() is called to pass control to the next middleware or route handler (in this case, the route handler for /check-auth):
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorised user",
    });
  }
};

export { registerUser, loginUser, logoutUser, authMiddleware };

// Key Differences Between next(), return, and res
// next() (for passing control):

// next() is used when you want to pass control to the next middleware or route handler in the chain.
// The middleware function does not end the request-response cycle when next() is called. Instead, it tells Express.js to move to the next function in the middleware stack.
// In your case, after successfully verifying the JWT, you use next() because you want the /check-auth route handler to be executed next, which will send the response.
// res (for sending responses):

// res methods like res.send() or res.json() are used to end the request-response cycle and send a response back to the client.
// If you use res inside the middleware, the response is sent immediately, and no further middleware or route handlers will run after that.
// In your case, if you used res in the authMiddleware (instead of next()), the request would end in the middleware, and the /check-auth route handler would never run.

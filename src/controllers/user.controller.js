import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/User.model.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend (in this case postman will do this)
  // validation of details -- not empty
  // check if user already exists: username, email

  // check for images, avatar
  //upload them to cloudinary , avatar check
  //create user Object -create entry in DB
  //remove password and refresh field from response
  // check for user creation
  // response return

  const { fullName, email, username, password } = req.body;
  console.log("email:", email);
  console.log("password:", password);
  // single field ko bhi check kr skte ho ki vo empty toh nhi haii...aur ek sath array mai dalkar "some()" function lga do!!
  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All Fields are required");
  }

  // to check for existed user
  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "User with this email or username already Existed");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar not uploaded");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage:coverImage?.url || "",
    email,
    password,
    username:username.toLowerCase()
  })

  const createdUser= await User.findById(user._id).select(
    "-password -refreshToken"
  )

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user")
    
  }

  return res.status(201).json(
    new ApiResponse(200,createdUser,"user Registered Successfully")
  )

});

export { registerUser };

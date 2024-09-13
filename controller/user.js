//const res = require("express/lib/response")
const user = require("../models/user");
// const cloudinary = require("cloudinary");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
var jwt = require("jsonwebtoken");
// const path = require("path");
// const ObjectId = require("mongoose");
const mongoose = require("mongoose");
const SelectedPlan = require("../models/form");
const otpGenerator = require("otp-generator");
const mine = require("../models/Mine");
const reward = require("../models/Reward");
// const PDFDocument = require("pdfkit");
// const fs = require("fs");
// const { log } = require("console");
// exports.loginuser = async (req,res) =>{
// try{

//     const mycloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
//         folder:"avatars",
//         width:150,
//         crop:"scale",

//     })

// const {name,email,password} = req.body

// const currentuser = await user.create
// ({
//     name,
//     email,
//     password,
//     avatar:{
//       public_id:mycloud.public_id,
//       url:mycloud.secure_url
//     }
// })
//    console.log(currentuser)
//    res.status(200).json(currentuser)

// }catch(error){
//     //res.status(400).json(error.message)
//     console.log(error)
// }
// }

// exports.loginuse = async (req,res) =>{

//     try{
//         const r = await user.find()
//         res.status(200).send(r)
//     }catch(error){
//         res.status(400).json(error.message)
//     }

// }

exports.register = async (req, res) => {
  console.log("req.body", req.body);
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "All fields required", status: false });
    }

    const existingUser = await user.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const newUser = await user.create({
      name,
      email: email.toLowerCase(),
      mobileOtp: otp,
      isVerified: false // Assuming you have this field in your user schema
    });

    return res.status(200).json({ data: newUser, status: true });
  } catch (e) {
    console.error("Error in registration:", e);
    return res.status(500).json({ message: "Internal server error", status: false });
  }
};
const userMineData = [
  { profit: 10, profitHour: 30 },
  { profit: 30, profitHour: 50 },
  { profit: 50, profitHour: 70 },
  { profit: 90, profitHour: 130 },
];
async function createMineWithUserMines(user) {
  const updatedUserMineData = userMineData.map((data) => ({
    _id: mongoose.Types.ObjectId(),
    ...data,
  }));
  const data = new mine({
    userMine: updatedUserMineData,
    userId: user._id,
  });
  try {
    await data.save();
    console.log("Mine data saved successfully:", data);
  } catch (error) {
    console.error("Error saving mine data:", error);
  }
}
// when user register then create her reward
exports.getUserMine = async (req, res) => {
  const userId = req.loginUserId;
  const findTheUserMine = await user.findById(userId);
  if (!findTheUserMine) {
    return res.status(404).json({ message: "User not found ", status: false });
  }
  try {
    const data = await mine.find({ userId: userId });
    if (!data) {
      return res
        .status(404)
        .json({ message: " mine not found ", status: false });
    }
    return res.json({ message: " mine found ", status: true, data: data });
  } catch (e) {
    return res.status(404).json({ message: " mine not found ", status: false });
  }
};
exports.updateUserMine = async (req, res) => {
  const userId = req.loginUserId;
  const { mineId } = req.body;
  if (!mineId) {
    return res.status(404).json({ message: "Mine not found", status: false });
  }
  try {
    const findTheUserMine = user.findById(userId);
    if (!findTheUserMine) {
      return res.status(404).json({ message: "User not found", status: false });
    }
    const findTheParticularMine = await mine.findOne({ userId: userId });
    if (!findTheParticularMine) {
      return res.status(404).json({ message: "Mine not found", status: false });
    }
    const data = findTheParticularMine.userMine;
    const findTheMineId = data.find((i) => i._id.toString() === mineId);
    if (!findTheMineId) {
      return res
        .status(404)
        .json({ message: "Mine ID not found", status: false });
    }
    findTheMineId.profit *= 1.5;
    findTheMineId.profitHour *= 1.5;
    await findTheParticularMine.save();
    return res
      .status(200)
      .json({ message: "Mine updated successfully", status: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", status: false });
  }
};
async function createUserReward(userId) {
  try {
    const today = new Date();
    const rewards = [];
    for (let i = 0; i < 10; i++) {
      rewards.push({
        day: today.getDate() + i,
        reward: `Reward ${i + 1}`,
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + i)
      });
    }
    await reward.findOneAndUpdate(
      { userId: userId },
      { $set: { userId: userId }, $push: { userRewards: { $each: rewards } } },
      { upsert: true, new: true }
    );

    console.log("Rewards created successfully");
  } catch (error) {
    console.error("Error creating rewards:", error);
  }
}
exports.getUserReward = async (req, res) => {
  const userId = req.loginUserId;

  try {
    const findUser = await user.findById(userId);
    if (!findUser) {
      return res.status(404).json({ message: " user not found ", status: false });
    }
    const data = await reward.find({ userId: userId });
    if (!data) {
      return res.status(404).json({ message: " user not found ", status: false });
    }

    return res.status(200).json({ message: "reward found successfully", status: true, data: data });
  } catch (e) {
    return res.status(404).json({ message: "  error", status: false });
  }
};

// claim the reward  
exports.claimReward = async (req, res) => {
  const { day } = req.body;
  const userId = req.loginUserId;
  
  try {
    const rewardData = await reward.findOne({ userId, 'userRewards.day': day });
    if (!rewardData) {
      return res.status(404).json({ message: "Reward not found", status: false });
    }

    const userReward = rewardData.userRewards.find(r => r.day === day);
    if (userReward && !userReward.claimed) {
      userReward.claimed = true;
      await rewardData.save(); // Save the parent document

      const allRewardsClaimed = rewardData.userRewards.every(r => r.claimed);
      if (allRewardsClaimed) {
        await reward.updateOne(
          { userId },
          { $set: { userRewards: [] } }
        );
        await createUserReward(userId);
      }

      return res.send({ success: true, reward: userReward });
    } else {
      return res.send({ success: false, message: 'Reward already claimed or invalid day' });
    }
  } catch (error) {
    console.error('Error claiming reward:', error);
    return res.status(500).send({ success: false, message: 'Internal server error' });
  }
};

exports.resetClaimDaily  = async (req,res)=>{
  try {
    await reward.updateMany(
      { 'userRewards.claimed': true },
      { $set: { 'userRewards.$[elem].claimed': false } },
      { arrayFilters: [{ 'elem.claimed': true }] }
    );
    console.log('Rewards reset successfully');
  } catch (error) {
    console.error('Error resetting rewards:', error);
  }
}


exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res
      .status(400)
      .json({ message: "Email and OTP are required", status: false });
  }
  try {
    const userRecord = await user.findOne({ email });
    if (!userRecord) {
      return res.status(400).json({ message: "User not found", status: false });
    }
    if (userRecord.isVerified) {
      return res
        .status(200)
        .json({ message: "User already verified", status: true });
    }
    // console.log(typeof userRecord.mobileOtp ,typeof otp)
    if (userRecord.mobileOtp == otp) {
      userRecord.isVerified = true;
      await userRecord.save();
      return res
        .status(200)
        .json({ message: "OTP verified successfully", status: true });
    } else {
      return res.status(400).json({ message: "Invalid OTP", status: false });
    }
  } catch (e) {
    console.error("Error in OTP verification:", e);
    return res
      .status(500)
      .json({ message: "Internal server error", status: false });
  }
};
exports.resendOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required", status: false });
  }
  try {
    const userRecord = await user.findOne({ email });
    if (!userRecord) {
      return res.status(400).json({ message: "User not found", status: false });
    }
    if (userRecord.isVerified) {
      return res.status(200).json({ message: "User already verified", status: true });
    }

    const newOtp = Math.floor(100000 + Math.random() * 900000);
    userRecord.mobileOtp = newOtp;
    await userRecord.save();

    return res.status(200).json({ message: "OTP resent successfully", status: true , newOtp: newOtp });
  } catch (e) {
    console.error("Error in resending OTP:", e);
    return res.status(500).json({ message: "Internal server error", status: false });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const lowerCaseEmail = email.toLowerCase();
    const users = await user.findOne({ email: lowerCaseEmail });
    if (!users) {
      return res.status(404).json({ status: false, message: "User not found" });
    }
    const matchPassword = await bcrypt.compare(password, users.password);
    if (!matchPassword) {
      return res
        .status(404)
        .json({ status: false, message: "Password mismatch" });
    }
    const token = jwt.sign(
      { id: users._id, email: users.email },
      process.env.secretkey,
      { expiresIn: "9h" }
    );
    return res
      .status(200)
      .json({ status: true, users, token, role: users.role });
  } catch (e) {
    console.log("Error during login:", e);
    return res.status(400).json({ status: false, message: e.message });
  }
};
// here auth verify
exports.verifyToken = (req, res, next) => {

  
  // let token = req.headers["x-access-token"] || req.headers["authorization"];
  // token = token.replace(/^Bearer\s+/, "");
  // console.log("verifyToken", token);
  // if (token) {
  //   jwt.verify(token, process.env.secretkey, (err, decoded) => {
  //     if (err) {
  //       return res.json({
  //         success: false,
  //         message: "Token is not valid",
  //       });
  //     }
  //     req.loginUserId = decoded.id;
  //     next();
  //   });
  // } else {
  //   return res.json({
  //     success: false,
  //     message: "Token not provided",
  //   });
  // }
};

//change password

exports.changepassword = async (req, res) => {
  try {
    const { oldpassword, newpassword } = req.body;
    let userDoc = await user.findOne({ _id: req.loginUserId });
    if (!userDoc) {
      return res.status(200).json({ status: false, message: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(oldpassword, userDoc.password);
    if (!passwordMatch) {
      return res
        .status(200)
        .json({ status: false, message: "Password incorrect" });
    }
    const saltRounds = 10;
    const hashpassword = await bcrypt.hash(newpassword, saltRounds);
    const data = await user.updateOne(
      { _id: userDoc._id },
      { $set: { password: hashpassword } }
    );
    return res.status(200).json({ data: data, status: true });
  } catch (e) {
    console.log(e.message);
  }
};

// here get api for users
exports.getUsers = async (req, res) => {
  const id = req.loginUserId;
  //  console.log("dadad" ,req.loginUserId)
  try {
    let users = await user.find({ _id: id });
    return res.status(200).json({ users: users, status: true });
  } catch (e) {
    console.log(e.message);
  }
};

// user like and dislike api
exports.likeDislikeUser = async (req, res) => {
  try {
    if (req?.headers?.authorization) {
      console.log("hw=elloe", req?.headers?.authorization);
    } else {
      return res.status(401).json({ message: "Unauthorized", status: false });
    }
    const { id } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("null");
    } else {
      console.log("found", id);
    }
    const foundUser = await user.findById(id);
    if (foundUser) {
      if (foundUser.like === 0) {
        foundUser.like = 1;
      } else {
        foundUser.like = 0;
      }
      const updateUserLikeStatus = await user.updateOne(
        { _id: id },
        { $set: foundUser }
      );
      let message = foundUser.like === 1 ? "liked sucesfuuly" : "dislike user";
      return res.status(200).json({
        message: message,
        status: true,
        updateUserLikeStatus: updateUserLikeStatus,
      });
    }
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: e.message, status: false });
  }
};

// exports.whatsAppSendMessage = async (req, res) => {
//   try {
//     const data = await client.messages.create({
//       body: req.body.message,
//       from: "whatsapp:+14155238886",
//       to: "whatsapp:" + req.body.to,
//     });
//     console.log("data:", data);
//     if (data) {
//       return res
//         .status(200)
//         .json({ message: "Message sent", status: true, data: data });
//     } else {
//       return res
//         .status(400)
//         .json({ message: "Message not sent", status: false });
//     }
//   } catch (e) {
//     console.log("Error:", e.message);
//     res.status(500).json({ message: "Internal server error", status: false });
//   }
// };

// create api for user enquiry for hotels about rooms according to date or name, email
exports.createEnquiry = async (req, res) => {
  //  here i want to create enquiry for user suppose in hotel i have 15 room available and usefr want to create enquiry for 19/10/2023 to 24/10/2023 and user want to create enquiry for 5 rooms and how to create enqiry accrding to dates and totalRooms can create logic
  try {
    const totalRoom = 15;
    const data = await user.create({
      name: req.body.name,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      totalRoom: Number(req.body.totalRoom) - totalRoom,
    });
  } catch (e) {}
};

// g<eSx#SW1`+Ih83O
// const accountSid = 'ACa0492404f16229d203a90a7842b1675b';
// const authToken = '37d86a7b8621200078990b89ee094ead';
// const client = require('twilio')(accountSid, authToken);

// client.messages
//     .create({
//                 from: 'whatsapp:+14155238886',
//         to: 'whatsapp:+918094404704'
//     })
//     .then(message => console.log(message.sid))
//     .done();
//forgot password api for user account .

exports.forgotPassword = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkEmail = await user.findOne({ email: email });
    if (!checkEmail) {
      return res
        .status(400)
        .json({ message: "Email not found", status: false });
    }
    let otp = otpGenerator.generate(6, {
      digits: true,
      upperCaseAlphabets: true,
      specialChars: true,
    });
    const hashPassword = await bcrypt.hash(password, 10);
    const updatePassword = await user.updateOne(
      { _id: checkEmail._id },
      { $set: { password: hashPassword, mobileOtp: otp } }
    );
    res.status(200).json({
      message: "Password updated successfully",
      status: true,
      updatePassword: updatePassword,
    });
  } catch (e) {
    console.log("ee", e.message);
    res.status(500).json({ message: "Internal Server Error", status: false });
  }
};

// create api selectplan
exports.selectPlan = async (req, res) => {
  try {
    const { monthly, quarterly, yearly, productId } = req.body;
    // Create an array to store selected plans
    const selectedPlans = [];
    if (monthly) {
      const monthlyData = {
        type: "Monthly",
        features: req.body.monthly.features,
        price: req.body.monthly.price,
      };
      selectedPlans.push(monthlyData);
    }
    if (quarterly) {
      const quarterlyData = {
        type: "Quarterly",
        features: req.body.quarterly.features,
        price: req.body.quarterly.price,
      };
      selectedPlans.push(quarterlyData);
    }
    if (yearly) {
      const yearlyData = {
        type: "Yearly",
        features: req.body.yearly.features,
        price: req.body.yearly.price,
      };
      selectedPlans.push(yearlyData);
    }
    // Store selected plans in the database
    const data = await SelectedPlan.create({
      plan: selectedPlans,
      productId: productId,
    });
    res.status(200).json({ message: "Selected plans stored successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.blockUsers = async (req, res) => {
  try {
    const findUser = await user.findById(req.body.id);
    console.log("Find user", findUser);
    if (!findUser) {
      return res.status(404).json({ message: "Couldn't find user" });
    }
    console.log("!findUser.block", !findUser.block);

    findUser.block = !findUser.block;

    const updateData = await user.findByIdAndUpdate(req.body.id, {
      $set: findUser,
    });
    console.log("update", updateData);
    return res.status(200).json({ message: "Successfully updated" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

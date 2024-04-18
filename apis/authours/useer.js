import bcrypt from "bcrypt"
import express, { Router } from "express"

import User from "../model/uder.js"
import mongoose from "mongoose";

const userRoute =  express.Router()



// updated user


userRoute.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (error) {
                return res.status(500).json(error);
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            });
            res.status(200).json("your account updated");
        } catch (err) {
            return res.status(502).json(err);
        }
    } else {
        return res.status(403).json("you can update only your account");
    }
});
// deleteuser


userRoute.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("your account deleted");
        } catch (err) {
            return res.status(502).json(err);
        }
    } else {
        return res.status(403).json("you can delete only your account");
    }
});


// get user
// userRoute.get("/:id", async (req, res)=>{
//     try {
// // const username = await User.findOne(req.params.userName)
// const user =  await User.findById(req.params.id);
// const {password ,updatedAt, ...other} = user._doc

// res.status(200).json(other)

//     } catch (error) {
//         res.status(403).json("user not found")
//     }
// })

userRoute.get("/", async (req, res) => {
    try {
        let user;
        if (req.query.id) {
            user = await User.findById(req.query.id);
        } else if (req.query.userName) {
            user = await User.findOne({ userName: req.query.userName });
        } else {
            return res.status(400).json({ error: "Missing parameters" });
        }

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const { password, updatedAt, ...other } = user._doc;
        res.status(200).json(other);
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});

userRoute.put("/:id/follow", async (req, res) => {
    if (req.body && req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentuser = await User.findById(req.body.userId);
            
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } });
                await currentuser.updateOne({ $push: { followings: req.params.id } });
                
                res.status(200).json("follower added");
            } else {
                res.status(403).json("you already follow");
            }
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        return res.status(500).json("no");
    }
});


// unfollow
// unfollow

userRoute.put("/:id/unfollow", async (req, res) => {
    if (req.body && req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentuser = await User.findById(req.body.userId);
            
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await currentuser.updateOne({ $pull: { followings: req.params.id } });
                
                res.status(200).json("unfollower");
            } else {
                res.status(403).json("you already unfollow");
            }
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        return res.status(500).json("no");
    }
});

userRoute.get("/friends/:userId", async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      const friends = await Promise.all(
        user.followings.map((friendId) => {
          return User.findById(friendId);
        })
      );
      let friendList = [];
      friends.map((friend) => {
        const { _id, username, profilePicture } = friend;
        friendList.push({ _id, username, profilePicture });
      });
      res.status(200).json(friendList)
    } catch (err) {
      res.status(500).json(err);
    }
  });

export   { userRoute }



































































































































































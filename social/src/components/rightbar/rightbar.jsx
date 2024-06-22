import React, { useContext, useEffect, useState } from "react";
import "./rightbar.css";
import { Link } from "react-router-dom";
import Online from "../online/online";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Add, Remove } from "@mui/icons-material";
import { BaseUrl } from "../../../utills/domain";

export function Rightbar({  user }) {
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.followings?.includes(user?._id)
  );

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get(
          `${BaseUrl}/user/friends/${currentUser?._id}`
        );
        setFriends(friendList.data);
        console.log(friendList);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]); 

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`${BaseUrl}/user/${user?._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`${BaseUrl}/user/${user?._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {
      console.log(err);
    }
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdaycontainer">
          <img className="imggift" src="/src/assets/gift3.png" alt="" />
          <span className="birthdaytext">
            <b>Sarim khan</b> and <b>three other friends</b> <br /> have a birthday
          </span>
        </div>
        <img className="adspost" src="/src/assets/person10.jpeg" alt="" />
        <h4 className="rightbartittle">Online friends</h4>
        {/* Iterate over 'userdata' array and render 'Online' component */}
        {/* userdata.map((u) => (
          <Online key={u.id} user={u} />
        )) */}
      </>
    );
  };

  
  const ProfileRightbar = () => {
    return (
      <>
        {user.userName !== currentUser.userName && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <div className="usertittle">
          <h3>User info</h3>
          <br />
          <div className="userinfo">
            <div className="userinfoitems">
              <span className="rightbarforkey">City:</span>
              <span className="rightbarforvalue">{currentUser.city || "Not mentioned"}</span>
            </div>
            <div className="userinfoitems">
              <span className="rightbarforkey">Relationship:</span>
              <span className="rightbarforvalue">{currentUser.relationship || "Not mentioned"}</span>
            </div>
            <div className="userinfoitems">
              <span className="rightbarforkey">Favorite sports:</span>
              <span className="rightbarforvalue">{currentUser.from || "Not mentioned"}</span>
            </div>
          </div>
          <br />
          <h3>User friends</h3>
          <br />
          <div className="userfollowings">
            <div className="userfollowing">
              {/* Check if 'friends' array is not empty before rendering */}
              {friends.length > 0 &&
                friends.map((friend) => (
                  <Link
                    key={friend._id} // Added key prop
                    to={"/profile/" + friend.userName}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="rightbarFollowing">
                      <img
                        src={friend.profilePicture ? friend.profilePicture : "default-profile-img.jpg"}
                        alt=""
                        className="rightbarFollowingImg"
                      />
                      <span className="rightbarFollowingName">{friend.userName}</span>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarwrapper">{user ? <ProfileRightbar /> : <HomeRightbar />}</div>
    </div>
  );
}

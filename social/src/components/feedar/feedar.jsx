import React, { useContext, useEffect, useState } from "react";
import "./feedar.css";
import { Share } from "../share/share";
import { Posts } from "../post/post";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { BaseUrl } from "../../../utills/domain";

export function Feedar({ username }) {
 const [posts, setPosts] = useState([]);
 const { user } = useContext(AuthContext);

 useEffect(() => {
  const fetchPosts = async () => {
    const res = username
      ? await axios.get(`${BaseUrl}/post/profile/${username}` )
      : await axios.get(`${BaseUrl}/post/timeline/ ${user._id}`);

    setPosts(
      res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      })
    );
  };
  
  fetchPosts();
}, [username, user?._id]);

 return (
    <div className="feeds">
      <div className="feedwrapper">
        <Share />
        {posts.map((p, index) => (
  <Posts key={index} data={p} />))}
      </div>
    </div>
 );
}



 
import React, { useState, useEffect, useContext } from "react";
import "./post.css";
import { MoreVert } from "@mui/icons-material";
import axios from 'axios'; // Don't forget to import axios
import { AuthContext } from "../../context/AuthContext";
import {format } from "timeago.js"
import { BaseUrl } from "../../../utills/domain";
// import { userdata } from "../../dummydata/users";

export function Posts({ data }) {
  const [like, setLike] = useState(data.likes ? data.likes.length : 0);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);

  const likeHandler = () => {
    try {
      axios.put(`${BaseUrl}/post/${data._id}/like`, { userId: currentUser._id });
    } catch (err) {}
    setIsLiked(!isLiked);
    setLike(isLiked ? like - 1 : like + 1);
  
  };
  useEffect(() => {
    const fetchUser = async () => {

      try {
        const res = await axios.get(`${BaseUrl}/user?id=${data.userId}`);
        setUser(res.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [data.userId]); // Make sure to include data.userId in dependencies

  if (!user) {
    return null; // Render nothing if user data is not available yet
  }
  return (
    <div className="Posts">
      <div className="postswraaper">
        <div className="postTop">
          <div className="posttopleft">
            <img className="postproileimg" src={currentUser?.profilepicture || "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIAPoA+gMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAQQFAwIG/9oACAEBAAAAAN8AAAAAAAAAAIAAAACQAAAAAAIFXh4nta6AAACFDO8BNzU9gAAPONWAOmz3AAAxaoAe93oAAFHJAAt7AEoAnA5AAN3sBICvhgAGjpgAFDKAALeyAAZ2YAAWdsAAoZQABb2QCAcMMAA0dMAgDA5gANzuBIBQygALW0AIAYtYAPe50AkAPGPWAPez3ASAEM7P8guanQAEABFTh5d7XUABATSzbWnIApZ1++BKAyKZ7v3esJeadDgWdj0JIGNVA6dvUc+AHbb9EgyqAAABb2JArYgAAAa14DDrgAAB03vQVcUAAADVvkMmkAAABY3A+d8gAAAPoOhwwgAAADYuFXGAAAANPQf/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/9oACgICEAMQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/EADUQAAIBAQUGBAMHBQAAAAAAAAECAwQAESExQBITMDJBUSAiYXEUUoEFEDRCcpKhI2JwgrH/2gAIAQEAAT8A/wAGEhRezADubPWwLle3tY/aB6RD6m3x8vyJYV79Y1stfEeZWWySRycjg6jAAkm4C01cBeIh/sbO7ub2Yk+K+60VbImD+YfzZJEkXaQ3jSsyopZjcozNqipaY3ZJ0HCjkeJtpDcbQTrMt4wIzGkqagzNcOQZcSN2jcMpxFopFlQONFXTbKCIZtn7cakm3clx5W0Ushlkd+549PJvYVY55HQVTbEEnrhoKB8ZE+ugrzdGg7toKI3VA9QRoPtDKL3OgpPxEegrx/SjPZtBRC+oX0B0FUm3A/pjoKBMZH9hoZUMUjJ2PHpo91CinPM6GuhvUSjMZ8akh3soJ5VxOjqYDC2HIcuIiNI4RRibRRLEgQaN0WRSrC8G09O0J7r0PCRHkYKgvNoIFgXuxzOlIBBBF4NpqHrF+02ZWQ3MCD44qOR8X8i/zaOJIl2UF2oZVcXMoIs9DC2RK2NA/SQW+Am+ZLCgk6utloIxzOxtHDFHyIBpZq1Ewj8x79LSTSSm93JtBWMtyyXkd7KyuNpSCOHNWqmEXmPfpYTShy4ka82hrgcJRd6iwIOI4pKqpZjcBmbVFU0vlXBPAjvGb0Yg2jr+kifUWSaKTlceJnROdwvvaSuiXkBY2lqJZeZsOwy8EFQ8J7r2sjpIoZTeOHgASTcBiTapqDM3ZBkOAssqcrsPrYVlQPz3+4t8dUf2ftsa2oP5gPYWaonfOVuBBM0L3jLqLI6yKGU3g8Ktn2julOAz01LPunuJ8jcGqm3MWHM2A1FFNtpsHNf+cCpl3spPQYLqI5DE6uOllIYBhkfFVybuE92wGqoZL0KfL4q59qbY+QaqmfdzIehwPhvAxOQs7F2Zj1JOrifbjR+4HgqW2YJT6Xayha+C7sx8Fb+Gb9S6yg5Zf1D7/wD/xAAUEQEAAAAAAAAAAAAAAAAAAACA/9oACAECAQE/AAB//8QAFBEBAAAAAAAAAAAAAAAAAAAAgP/aAAgBAwEBPwAAf//Z"} alt="" />
            <span className="postusername">{currentUser?.userName}</span>
            <span className="postdate">{format(data.createdAt)} </span>
          </div>
          <div className="posttopright">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="posttext">{data.desc}</span>
          <img className="postimg img-fluid" src={data.Img} alt="" />
        </div>
        <div className="postbottom">
          <div className="bottomleft">
            <img
              className="likebuttons"
              onClick={likeHandler}
              src="/src/assets/like.jpeg"
              alt=""
            />
            <img
              className="likebuttons"
              onClick={likeHandler}
              src="/src/assets/heart2.png"
              alt=""
            />
            <span className="likecounter">{like} people like it</span>
          </div>
          <div className="bottomright">
          <span className="postcomenttext">{data.comments !== undefined ? data.comments : "0"} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}

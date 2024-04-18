import { Box, Modal,Typography, CircularProgress } from "@mui/material"; // Imported necessary MUI components
import { Rightbar } from "../../../components/rightbar/rightbar";
import { Slidebar } from "../../../components/slidebar/slidebar";
import Topbar from "../../../components/topbar";
import { useNavigate, useParams } from "react-router-dom"; // Removed unused import
import "./profile.css";
import { Feedar } from "../../../components/feedar/feedar";
import { useContext, useEffect, useRef, useState } from "react";
import axios from 'axios'; // Import axios
import { AuthContext } from "../../../context/AuthContext";
import { EditNotifications } from "@mui/icons-material";
import useUploadImage from "../../../../customhook/photos";
// import Modal from '@mui/material/Modal';

function Profile() {
    
  const { user: currentUser } = useContext(AuthContext); // Removed unused 'dispatch' variable
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [cover, setCover] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const descRef = useRef();
  const userNameRef = useRef();
  const emailRef = useRef();
  const cityRef = useRef();
  const fromRef = useRef();
  const relationRef = useRef();
  const [users, setUser] = useState({});
  const username = useParams().username
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/user?userName=${username}`);
        setUser(res.data);
      } catch (error) {
        console.error("User fetch karne mein error:", error);
      }
    };
    fetchUser();
  }, [username]);

  const updateHandler = async (e) => {
    e.preventDefault();
    const updatePost = {
      userId: currentUser?._id,
      email: emailRef.current.value ? emailRef.current.value : currentUser?.email,
      profilepicture: profile ? profile : currentUser?.profilepicture,
      coverpicture: cover ? cover : currentUser?.coverpicture,
      desc: descRef.current.value ? descRef.current.value : currentUser?.desc,
      from: fromRef.current.value ? fromRef.current.value : currentUser?.from,
      relationship: relationRef.current.value ? relationRef.current.value : currentUser?.relationship,
      city: cityRef.current.value ? cityRef.current.value : currentUser?.city

    };
    try {
     await axios.put(`http://localhost:5000/user/${currentUser?._id}`, updatePost);
      const getCurrentUser = await axios.get(`http://localhost:5000/user?id=${currentUser?._id}`);
      console.log("getCurrentUser", getCurrentUser);
     localStorage.setItem("user", JSON.stringify(getCurrentUser?.data))   
     navigate(`/`)
     window.location.reload()
      console.log(updatePost);
    } catch (err) {
      console.log(err);
    }
  };

  const profilePicHandler = async (proImg) => {
    try {
      setLoading(true); // Setting loading state to true before upload
      const imgUrl = await useUploadImage(proImg, proImg.name); // Assuming 'useUploadImage' function is defined elsewhere
      setProfile(imgUrl);
      console.log(imgUrl);
      setLoading(false); // Setting loading state to false after upload
    } catch (err) {
      console.log(err);
    }
  };

  const coverPicHandler = async (coverImg) => {
    try {
      setLoading2(true); // Setting loading2 state to true before upload
      const coverImgUrl = await useUploadImage(coverImg, coverImg.name); // Assuming 'useUploadImage' function is defined elsewhere
      setCover(coverImgUrl);
      setLoading2(false); // Setting loading2 state to false after upload
    } catch (err) {
      console.log(err);
    }
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  console.log(users);
  return (
    <>
      <Topbar />
      <div>
      <Modal
    keepMounted
    open={open}
    onClose={() => setOpen(false)}
    aria-labelledby="keep-mounted-modal-title"
    aria-describedby="keep-mounted-modal-description"
>
    <Box sx={style}>
        <Typography variant="h6" component="h2">
            Update Profile
        </Typography>
        <form style={{ display: "flex", flexDirection: "column", gap: "10px" }} onSubmit={updateHandler}>
            <div>
                <label htmlFor="username">Username:</label>
                <input className='updateInputbar' style={{ width: "100%" }} type="text" name="" ref={userNameRef} placeholder={currentUser?.username} id="username" />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input className='updateInputbar' style={{ width: "100%" }} type="email" name="" ref={emailRef} placeholder={currentUser?.email} id="email" disabled />
            </div>
            <label className='updateInputbar2' htmlFor="profilePic" style={{ width: "100%", display: 'flex', justifyContent: "space-between" }}>Change Profile Picture <span >{loading && <CircularProgress className='progressBar' style={{ color: "blue" }} />}</span></label>
            <input style={{ width: "100%", display: "none" }} onChange={(e) => profilePicHandler(e.target.files[0])} type="file" name="" id="profilePic" />
            <label className='updateInputbar2' htmlFor="coverPicture" style={{ width: "100%", display: 'flex', justifyContent: "space-between" }}>Change Cover Photo <span>{loading2 && <CircularProgress className='progressBar' style={{ color: "blue" }} />}</span></label>
            <input style={{ width: "100%", display: "none" }} onChange={(e) => coverPicHandler(e.target.files[0])} type="file" name="" id="coverPicture" />
            <div>
                <label htmlFor="desc">Description:</label>
                <input className='updateInputbar' style={{ width: "100%" }} ref={descRef} type="text" name="" id="desc" />
            </div>
            <div>
                <label htmlFor="city">City:</label>
                <input className='updateInputbar' style={{ width: "100%" }} ref={cityRef} type="text" name="" id="city" />
            </div>
            <div>
                <label htmlFor="from">Favorite sports:</label>
                <input className='updateInputbar' style={{ width: "100%" }} ref={fromRef} type="text" name="" id="from" />
            </div>
            <div>
                <label htmlFor="relation">Relationship:</label>
                <input className='updateInputbar' style={{ width: "100%" }} ref={relationRef} type="text" name="" id="relation" />
            </div>
            <button className='updateProfile' type="submit">Update</button>
        </form>
    </Box>
</Modal>

      </div>

      <div className="Profile">
        <Slidebar />
        <div className="profileright">
          <div className="profilerighttop">
            <div className="profilecover">
            <img src={ currentUser?.coverpicture ? currentUser?.coverpicture : "https://th.bing.com/th/id/OIP.kCIO8rFORxt2-P3C6LVGTAHaE8?w=230&h=180&c=7&r=0&o=5&dpr=1.6&pid=1.7"} alt="" className="coverpicture" />
              <img src={currentUser?.profilepicture || "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIAPoA+gMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAQQFAwIG/9oACAEBAAAAAN8AAAAAAAAAAIAAAACQAAAAAAIFXh4nta6AAACFDO8BNzU9gAAPONWAOmz3AAAxaoAe93oAAFHJAAt7AEoAnA5AAN3sBICvhgAGjpgAFDKAALeyAAZ2YAAWdsAAoZQABb2QCAcMMAA0dMAgDA5gANzuBIBQygALW0AIAYtYAPe50AkAPGPWAPez3ASAEM7P8guanQAEABFTh5d7XUABATSzbWnIApZ1++BKAyKZ7v3esJeadDgWdj0JIGNVA6dvUc+AHbb9EgyqAAABb2JArYgAAAa14DDrgAAB03vQVcUAAADVvkMmkAAABY3A+d8gAAAPoOhwwgAAADYuFXGAAAANPQf/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/9oACgICEAMQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/EADUQAAIBAQUGBAMHBQAAAAAAAAECAwQAESExQBITMDJBUSAiYXEUUoEFEDRCcpKhI2JwgrH/2gAIAQEAAT8A/wAGEhRezADubPWwLle3tY/aB6RD6m3x8vyJYV79Y1stfEeZWWySRycjg6jAAkm4C01cBeIh/sbO7ub2Yk+K+60VbImD+YfzZJEkXaQ3jSsyopZjcozNqipaY3ZJ0HCjkeJtpDcbQTrMt4wIzGkqagzNcOQZcSN2jcMpxFopFlQONFXTbKCIZtn7cakm3clx5W0Ushlkd+549PJvYVY55HQVTbEEnrhoKB8ZE+ugrzdGg7toKI3VA9QRoPtDKL3OgpPxEegrx/SjPZtBRC+oX0B0FUm3A/pjoKBMZH9hoZUMUjJ2PHpo91CinPM6GuhvUSjMZ8akh3soJ5VxOjqYDC2HIcuIiNI4RRibRRLEgQaN0WRSrC8G09O0J7r0PCRHkYKgvNoIFgXuxzOlIBBBF4NpqHrF+02ZWQ3MCD44qOR8X8i/zaOJIl2UF2oZVcXMoIs9DC2RK2NA/SQW+Am+ZLCgk6utloIxzOxtHDFHyIBpZq1Ewj8x79LSTSSm93JtBWMtyyXkd7KyuNpSCOHNWqmEXmPfpYTShy4ka82hrgcJRd6iwIOI4pKqpZjcBmbVFU0vlXBPAjvGb0Yg2jr+kifUWSaKTlceJnROdwvvaSuiXkBY2lqJZeZsOwy8EFQ8J7r2sjpIoZTeOHgASTcBiTapqDM3ZBkOAssqcrsPrYVlQPz3+4t8dUf2ftsa2oP5gPYWaonfOVuBBM0L3jLqLI6yKGU3g8Ktn2julOAz01LPunuJ8jcGqm3MWHM2A1FFNtpsHNf+cCpl3spPQYLqI5DE6uOllIYBhkfFVybuE92wGqoZL0KfL4q59qbY+QaqmfdzIehwPhvAxOQs7F2Zj1JOrifbjR+4HgqW2YJT6Xayha+C7sx8Fb+Gb9S6yg5Zf1D7/wD/xAAUEQEAAAAAAAAAAAAAAAAAAACA/9oACAECAQE/AAB//8QAFBEBAAAAAAAAAAAAAAAAAAAAgP/aAAgBAwEBPwAAf//Z"} alt="" className="profilepitcure" />
            </div>
          </div>
          <div className="profileinfo">
            <h4 style={{ fontSize: "24px" }}>{username}</h4>
            <span style={{ fontWeight: "300" }}>{currentUser?.desc || "NO DISCRIPTION"}</span>
          </div>
          <button onClick={handleOpen} className='updateButton'><span style={{fontSize:"15px"}}>Edit Profile</span> {<EditNotifications style={{fontSize:"17px"}}/>}</button>

          <div className="profilerighbottom">
            <Feedar username={username} user={users} />
            <Rightbar profile={profile} user={users} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;

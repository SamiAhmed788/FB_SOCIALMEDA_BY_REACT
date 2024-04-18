import React, { useContext, useRef, useState } from "react"
import "./share.css"
import { PermMedia,Label,Room, EmojiEmotions, Cancel } from "@mui/icons-material"
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import useUploadImage from "../../../customhook/photos.jsx";
export  function Share() {

    const { user } = useContext(AuthContext);
    const desc = useRef();
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false)

    const postHandler = async (e) => {
      e.preventDefault();
      const newPost = {
        userId: user._id,
        desc: desc.current.value,
        Img: file? file : "",
      }
      try {
        await axios.post("http://localhost:5000/post/", newPost);
        window.location.reload()
      } catch (err) {
        console.log(err);
      }
    }
      
    const uploadImg = async (userFileImg) => {
      try {
  
        console.log("userFileImg", userFileImg);
        setLoading(!loading)
        const imgUrl = await useUploadImage(userFileImg, userFileImg.name)
        setFile(imgUrl)
  
        console.log("file", file);
        setFile(prevUrl => {
          console.log("Updated file state:", prevUrl); // This will log the updated state
          setLoading(false)
          return imgUrl;
        });
      } catch (err) {
        console.log(err);
      }
    }
    return (
 
        <div className="share">
        <div className="sharewrapper">
         
        <div className="shareTop">

            <img  className="shareprofile" src={user.profilepicture || "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIAPoA+gMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAQQFAwIG/9oACAEBAAAAAN8AAAAAAAAAAIAAAACQAAAAAAIFXh4nta6AAACFDO8BNzU9gAAPONWAOmz3AAAxaoAe93oAAFHJAAt7AEoAnA5AAN3sBICvhgAGjpgAFDKAALeyAAZ2YAAWdsAAoZQABb2QCAcMMAA0dMAgDA5gANzuBIBQygALW0AIAYtYAPe50AkAPGPWAPez3ASAEM7P8guanQAEABFTh5d7XUABATSzbWnIApZ1++BKAyKZ7v3esJeadDgWdj0JIGNVA6dvUc+AHbb9EgyqAAABb2JArYgAAAa14DDrgAAB03vQVcUAAADVvkMmkAAABY3A+d8gAAAPoOhwwgAAADYuFXGAAAANPQf/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/9oACgICEAMQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/EADUQAAIBAQUGBAMHBQAAAAAAAAECAwQAESExQBITMDJBUSAiYXEUUoEFEDRCcpKhI2JwgrH/2gAIAQEAAT8A/wAGEhRezADubPWwLle3tY/aB6RD6m3x8vyJYV79Y1stfEeZWWySRycjg6jAAkm4C01cBeIh/sbO7ub2Yk+K+60VbImD+YfzZJEkXaQ3jSsyopZjcozNqipaY3ZJ0HCjkeJtpDcbQTrMt4wIzGkqagzNcOQZcSN2jcMpxFopFlQONFXTbKCIZtn7cakm3clx5W0Ushlkd+549PJvYVY55HQVTbEEnrhoKB8ZE+ugrzdGg7toKI3VA9QRoPtDKL3OgpPxEegrx/SjPZtBRC+oX0B0FUm3A/pjoKBMZH9hoZUMUjJ2PHpo91CinPM6GuhvUSjMZ8akh3soJ5VxOjqYDC2HIcuIiNI4RRibRRLEgQaN0WRSrC8G09O0J7r0PCRHkYKgvNoIFgXuxzOlIBBBF4NpqHrF+02ZWQ3MCD44qOR8X8i/zaOJIl2UF2oZVcXMoIs9DC2RK2NA/SQW+Am+ZLCgk6utloIxzOxtHDFHyIBpZq1Ewj8x79LSTSSm93JtBWMtyyXkd7KyuNpSCOHNWqmEXmPfpYTShy4ka82hrgcJRd6iwIOI4pKqpZjcBmbVFU0vlXBPAjvGb0Yg2jr+kifUWSaKTlceJnROdwvvaSuiXkBY2lqJZeZsOwy8EFQ8J7r2sjpIoZTeOHgASTcBiTapqDM3ZBkOAssqcrsPrYVlQPz3+4t8dUf2ftsa2oP5gPYWaonfOVuBBM0L3jLqLI6yKGU3g8Ktn2julOAz01LPunuJ8jcGqm3MWHM2A1FFNtpsHNf+cCpl3spPQYLqI5DE6uOllIYBhkfFVybuE92wGqoZL0KfL4q59qbY+QaqmfdzIehwPhvAxOQs7F2Zj1JOrifbjR+4HgqW2YJT6Xayha+C7sx8Fb+Gb9S6yg5Zf1D7/wD/xAAUEQEAAAAAAAAAAAAAAAAAAACA/9oACAECAQE/AAB//8QAFBEBAAAAAAAAAAAAAAAAAAAAgP/aAAgBAwEBPwAAf//Z"}  alt="" />
          <input placeholder={"What's in your mind " + user.userName + "?"} ref={desc} type="text" className="shareinput"  />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={file ? file : ""}  alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>)}
        <form className="sharebottom" onSubmit={postHandler}>
<div className="shareoptions">

<label htmlFor="file" className="shareoption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
<span className="shareoptiontext">
    photo Or video
</span>
<input style={{ display: "none" }} type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e) => uploadImg(e.target.files[0])} />
 </label>

 {!file &&(<div className="shareoption">
    <Label htmlColor="blue"  className="shareicon"/>
<span className="shareoptiontext">
    Tag
</span>
</div>)}
{!file &&( <div className="shareoption">
    <Room htmlColor="green"  className="shareicon"/>
<span className="shareoptiontext">
    Location
</span>
</div>)}
<div className="shareoption">
    <EmojiEmotions  htmlColor="gold"  className="shareicon"/>
<span className="shareoptiontext">
    Feelings
</span>
</div>
</div>
<button className="sharebutton" type="submit" >Share</button>
        </form>
        </div>
        </div>
  
  )
  

}


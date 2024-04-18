import React, { useContext } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Person from '@mui/icons-material/Person';
import { Chat, NotificationAdd } from '@mui/icons-material';
import { Link, useNavigate} from "react-router-dom";
import { Dropdown } from 'antd';
import "./topbar.css"
import { AuthContext } from '../context/AuthContext';

export default function Topbar() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const signOutHandler = () => {
        console.log("Running");
        localStorage.removeItem("user");
        navigate("/login"); // This should navigate to the '/login' route
        window.location.reload()
    }

    const showFriendsHandler = () => {
        console.log("Friends hey");
        // Assuming `friends` is a state variable, make sure it's defined and initialized
        // dispatch({type: "SHOW_FRIENDS", payload: !friends});
        // console.log("friends",friends);
    }

    const showHiddenLeftbar = () => {
        // Assuming `isShow` and `dispatch` are defined properly
        // dispatch({type:"SHOW_LEFTBAR", payload: !isShow});
        // console.log("isshow", isShow);
    }

    const items = [
        {
            key: '1',
            label: (
                <Link to={"/"}>
                    Home
                </Link>
            ),
        },
        {
            key: '2',
            label: (
                <Link to={`/profile/${user.userName}`}>
                    Profile
                </Link>
            ),
        },
        {
            key: '3',
            label: "Sign Out",
            onClick: signOutHandler,
        },
        {
            key: '4',
            label: "Friends",
            onClick: showFriendsHandler,
        },
    ];

    return (
        <>
            <div className="topbarContainer">
                <div className="topbarLeft">
                    <Link to="/" style={{ color: "white", textDecoration: "none" }} ><span className="vig">socialmedia</span></Link>
                </div>
                <div className="topbarCenter">
                    <div className="serchbar">
                        <SearchIcon aria-label="search" className='searchIcon'/>
                        <input placeholder='Search for friend, post or views' type="text" className="searchInput" />
                    </div>
                </div>
                <div className="topbarRight">
                    <div className="topbarLinks">
                        <Link to="/" style={{ color: "white", textDecoration: "none" }}><span className="topbarLink">Homepage</span></Link>
                        <Link to={`/profile/${user?.userName}`} style={{ color: "white", textDecoration: "none" }}><span className="topbarLink">Timeline</span></Link>
                    </div>
                    <div className="topbarIcons">
                        <div className="topbarIconItem">
                            <Person aria-label="person icon"  />
                            <span className="topbarIconBadge">1</span>
                        </div>
                        <div className="topbarIconItem">
                            <Chat/>
                            <span className="topbarIconBadge">1</span>
                        </div>
                        <div className="topbarIconItem">
                            <NotificationAdd/>
                            <span className="topbarIconBadge">1</span>
                        </div>
                    </div>
                    <Dropdown
                        menu={{
                            items,
                        }}
                        placement="bottomRight"
                        arrow={{
                            pointAtCenter: true,
                        }}
                    >
                        <img src={user.profilepicture ? user.profilepicture : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIAPoA+gMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAQQFAwIG/9oACAEBAAAAAN8AAAAAAAAAAIAAAACQAAAAAAIFXh4nta6AAACFDO8BNzU9gAAPONWAOmz3AAAxaoAe93oAAFHJAAt7AEoAnA5AAN3sBICvhgAGjpgAFDKAALeyAAZ2YAAWdsAAoZQABb2QCAcMMAA0dMAgDA5gANzuBIBQygALW0AIAYtYAPe50AkAPGPWAPez3ASAEM7P8guanQAEABFTh5d7XUABATSzbWnIApZ1++BKAyKZ7v3esJeadDgWdj0JIGNVA6dvUc+AHbb9EgyqAAABb2JArYgAAAa14DDrgAAB03vQVcUAAADVvkMmkAAABY3A+d8gAAAPoOhwwgAAADYuFXGAAAANPQf/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/9oACgICEAMQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/EADUQAAIBAQUGBAMHBQAAAAAAAAECAwQAESExQBITMDJBUSAiYXEUUoEFEDRCcpKhI2JwgrH/2gAIAQEAAT8A/wAGEhRezADubPWwLle3tY/aB6RD6m3x8vyJYV79Y1stfEeZWWySRycjg6jAAkm4C01cBeIh/sbO7ub2Yk+K+60VbImD+YfzZJEkXaQ3jSsyopZjcozNqipaY3ZJ0HCjkeJtpDcbQTrMt4wIzGkqagzNcOQZcSN2jcMpxFopFlQONFXTbKCIZtn7cakm3clx5W0Ushlkd+549PJvYVY55HQVTbEEnrhoKB8ZE+ugrzdGg7toKI3VA9QRoPtDKL3OgpPxEegrx/SjPZtBRC+oX0B0FUm3A/pjoKBMZH9hoZUMUjJ2PHpo91CinPM6GuhvUSjMZ8akh3soJ5VxOjqYDC2HIcuIiNI4RRibRRLEgQaN0WRSrC8G09O0J7r0PCRHkYKgvNoIFgXuxzOlIBBBF4NpqHrF+02ZWQ3MCD44qOR8X8i/zaOJIl2UF2oZVcXMoIs9DC2RK2NA/SQW+Am+ZLCgk6utloIxzOxtHDFHyIBpZq1Ewj8x79LSTSSm93JtBWMtyyXkd7KyuNpSCOHNWqmEXmPfpYTShy4ka82hrgcJRd6iwIOI4pKqpZjcBmbVFU0vlXBPAjvGb0Yg2jr+kifUWSaKTlceJnROdwvvaSuiXkBY2lqJZeZsOwy8EFQ8J7r2sjpIoZTeOHgASTcBiTapqDM3ZBkOAssqcrsPrYVlQPz3+4t8dUf2ftsa2oP5gPYWaonfOVuBBM0L3jLqLI6yKGU3g8Ktn2julOAz01LPunuJ8jcGqm3MWHM2A1FFNtpsHNf+cCpl3spPQYLqI5DE6uOllIYBhkfFVybuE92wGqoZL0KfL4q59qbY+QaqmfdzIehwPhvAxOQs7F2Zj1JOrifbjR+4HgqW2YJT6Xayha+C7sx8Fb+Gb9S6yg5Zf1D7/wD/xAAUEQEAAAAAAAAAAAAAAAAAAACA/9oACAECAQE/AAB//8QAFBEBAAAAAAAAAAAAAAAAAAAAgP/aAAgBAwEBPwAAf//Z"} alt="" className="topbarImg" />
                    </Dropdown>
                </div>
            </div>
        </>
    );
}

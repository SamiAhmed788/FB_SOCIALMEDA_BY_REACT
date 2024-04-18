import "./online.css"

export default function Online({user}){
    return(
        <div>
              <ul className="friendlist">
    <li className="rightbarFriend">
      <div className="rightbarimgprofile">
        <img className="rightbarimg" src={user.profile} alt="" />
         <span className="rightbaaronline"></span>
            
      </div>
    <span  className="rightbarusername" >{user.userName}</span>
    </li>
    <li className="rightbarFriend">
      <div className="rightbarimgprofile">
        <img className="rightbarimg" src="src/assets/person7.jpeg" alt="" />
         <span className="rightbaaronline"></span>
          
      </div>
    <span  className="rightbarusername" >alian ali</span>
    </li>
   
  </ul>
        </div>
    )
}
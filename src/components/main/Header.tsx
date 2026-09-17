import {Link} from "react-router-dom";
function Header(){
   return (
       <nav className="navbar navbar-inverse">
           <div className="container-fluid">
               <div className="navbar-header">
                   <Link className="navbar-brand" to={"/"}>MiniReact</Link>
               </div>
               <ul className="nav navbar-nav">
                   <li className="active"><Link to="/">Home</Link></li>
                   <li><Link to="/food/find">맛집 검색</Link></li>
                   <li><a href="#">레시피 목록</a></li>
                   <li><a href="#">레시피 검색</a></li>
                   <li><a href="#">쉐프</a></li>
                   <li><a href="#">커뮤니티</a></li>
               </ul>
           </div>
       </nav>
   )
}

export default Header;
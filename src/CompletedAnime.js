import React from "react"
import {NavLink} from "react-router-dom"

class CompletedAnime extends React.Component{
    constructor(){
        super()
        this.state = {
          isLoading: true
        }
      }
      
      componentDidMount(){
        if (this.props.location.state != null){

        }
      }
      
        render(props){
          var {isLoading} = this.state
      
          if (!isLoading){    
            return(
              <div>
                Loading...
              </div>
            )
          }
          else{
            var watchedList = JSON.parse(sessionStorage.getItem('mySessionStorage') || '[]');
            
            return (
              <div className="App">
                {/* <div className="TopBar"></div>*/}
                <div className="MainPage">
                  <div className="Sidebar">
                    <ul className="SidebarList">
                      {/* <h1 className="row" style={{color:"black"}} onClick={()=>{window.location.pathname = "/anime-generator"}}>Home</h1>
                      <h2 className="row" style={{color:"black"}} onClick={()=>{window.location.pathname = "/anime-generator/completedanimep"}}>Watched</h2> */}
                      <h1 className="row" style={{color:"black"}}> <NavLink className="NavLink" to="/">Home</NavLink></h1>
                      <h2 className="row" style={{color:"black"}}> <NavLink className="NavLink" to="/completedanime">Watched</NavLink> </h2>
                    </ul>
                  </div>
                <div className="Randomizer">
                  {/* {this.props.location.state.listcomplete.map((list) => ( */}
                  {watchedList.map((list) => (
                    <div key={list.mal_id}>
                      <a href={list.url} target="_blank"> {list.title} </a>
                      <div><img src={list.image_url} /></div>
                    </div>
                  ))}
                </div>
                </div>
              </div>
            )
          }
        }
}

export default CompletedAnime
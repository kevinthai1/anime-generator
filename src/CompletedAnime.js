import React from "react"
import {NavLink} from "react-router-dom"
import ReorderIcon from '@material-ui/icons/Reorder'
import HomeIcon from '@material-ui/icons/Home'
import CheckIcon from '@material-ui/icons/Check'

class CompletedAnime extends React.Component{
    constructor(){
        super()
        this.state = {
          isLoading: true,
          showSidebar: false
        }
      }
      
      componentDidMount(){
        if (this.props.location.state != null){

        }
      }

      toggleSidebar(){
        this.setState(prevState => ({
          showSidebar: !prevState.showSidebar
        }))
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
                <div className="TopBar">
                  <ReorderIcon onClick={()=>{this.toggleSidebar()}} style={{fontSize:"40px"}}>Sidebar</ReorderIcon>
                  <NavLink className="NavLink" to="/"><HomeIcon style={{fontSize:"40px"}}></HomeIcon></NavLink>
                  <NavLink className="NavLink" to={{ pathname:"/completedanime", state:{listcomplete:this.state.watchList}}}><CheckIcon style={{fontSize:"40px"}}></CheckIcon></NavLink>
                </div>

                <div className="MainPage">

                {this.state.showSidebar ?
                  <div className="Sidebar">
                    <ul className="SidebarList">
                      {/* <h1 className="row" style={{color:"black"}} onClick={()=>{window.location.pathname = "/anime-generator"}}>Home</h1>
                      <h2 className="row" style={{color:"black"}} onClick={()=>{window.location.pathname = "/anime-generator/completedanimep"}}>Watched</h2> */}
                    </ul>
                  </div>: null}

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
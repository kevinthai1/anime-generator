import React from "react"
import {NavLink} from "react-router-dom"
import ReorderIcon from '@material-ui/icons/Reorder'
import HomeIcon from '@material-ui/icons/Home'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'

class CompletedAnime extends React.Component{
    constructor(){
        super()
        this.state = {
          isLoading: true,
          showSidebar: false,
        }
        this.removeAnime = this.removeAnime.bind(this)
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

      removeAnime(id, index){
        var watchedList = JSON.parse(localStorage.getItem('mylocalStorage') || '[]');
        const tempWatchedList = Object.assign([], watchedList) //This creates a duplicate array and not just a reference
        tempWatchedList.splice(index, 1)
        localStorage.setItem('mylocalStorage', JSON.stringify(tempWatchedList))

        window.location.reload(false)
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
            var watchedList = JSON.parse(localStorage.getItem('mylocalStorage') || '[]');
            
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

                <div className="Watched">
                  {/* {this.props.location.state.listcomplete.map((list) => ( */}
                  {watchedList.map((list, index) => (
                    <div className="WatchedAnime" key={list.mal_id}>
                      
                        <CloseIcon onClick={()=>{this.removeAnime(list.mal_id, index)}}></CloseIcon>
                        <a style={{textDecoration:"none"}} href={list.url} target="_blank"> {list.title} </a>
                        <div className="AnimeImage"><img src={list.image_url} /></div>
                       
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
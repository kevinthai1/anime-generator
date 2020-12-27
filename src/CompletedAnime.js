import React from "react"
import {NavLink} from "react-router-dom"

class CompletedAnime extends React.Component{
    constructor(){
        super()
        this.state = {
          animeList: [""],
          isLoading: true,
          animePage: 1,
        }
        this.loadanimePage = this.loadanimePage.bind(this)
        this.incrementPage = this.incrementPage.bind(this)
        this.decrementPage = this.decrementPage.bind(this)
      }
      
      componentDidMount(){
        this.loadanimePage()
      }
      
      incrementPage(){
        this.setState({animePage: this.state.animePage + 1})
        setTimeout(() => {
          this.loadanimePage()
        }, 100)
      }
      
      decrementPage(){
        this.setState({animePage: this.state.animePage - 1})
        setTimeout(() => {
          this.loadanimePage()
        }, 100)
      }
      
      loadanimePage(){  
        this.setState({isLoading: false})
        fetch("https://jikan1.p.rapidapi.com/genre/anime/1/" + this.state.animePage, {
          "method": "GET",
          "headers": {
            "x-rapidapi-key": "542c3ca589msh41c910fdd2fb3e6p174e03jsnb59816e25977",
            "x-rapidapi-host": "jikan1.p.rapidapi.com"
          }
        })
        .then(res => res.json())
        .then(json => {
          this.setState({
            animeList: json.anime,
            isLoading: true
          })
            console.log(this.state.animeList)
        })
      }
      
        render(){
          var {isLoading, animeList} = this.state
      
          if (!isLoading){    
            return(
              <div>
                Loading...
              </div>
            )
          }
          else{
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

                {/* <div className="CompletedConatiner">
                  <button onClick={this.decrementPage}>Previous Page</button>
                  <button onClick={this.incrementPage}>Next Page</button>
                  <h1>Page: {this.state.animePage}</h1>
                  {animeList.map((list) => (
                    <div key={list.mal_id}>
                      <a href={list.url} target="_blank"> {list.title} </a>
                      <div><img src={list.image_url} /></div>
                    </div>
                  ))}
                </div> */}
                </div>
              </div>
            )
          }
        }
}

export default CompletedAnime
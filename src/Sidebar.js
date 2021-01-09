import React from 'react'
import { GenreData } from './GenreData'
import { NavLink } from "react-router-dom"
import ReorderIcon from '@material-ui/icons/Reorder'
import HomeIcon from '@material-ui/icons/Home'
import CheckIcon from '@material-ui/icons/Check'

class Sidebar extends React.Component{

    constructor(){
        super()
        this.state = {
           animeList: [""],
           i: 0,
           page: 1,
           showSidebar: true,
           watchList: [],
           genre: 1, 
            /* 
            Action: 1
            Adventure: 2
            Cars: 3
            Comedy: 4
            Dementia: 5
            Demons: 6
            Mystery: 7
            Drama: 8
            Ecchi: 9
            Fantasy: 10
            Game: 11
            Hentai: 12
            Historical: 13
            Horror: 14
            Kids: 15
            Magic: 16
            Martial Arts: 17
            Mecha: 18
            Music: 19
            Parody: 20
            Samurai: 21
            Romance: 22
            School: 23
            Sci Fi: 24
            Shoujo: 25
            Shoujo Ai: 26
            Shounen: 27
            Shounen Ai: 28
            Space: 29
            Sports: 30
            Super Power: 31
            Vampire: 32
            Yaoi: 33
            Yuri: 34
            Harem: 35
            Slice Of Life: 36
            Supernatural: 37
            Military: 38
            Police: 39
            Psychological: 40
            Thriller: 41
            Seinen: 42
            Josei: 43
            */
        }
        this.loadanimePage = this.loadanimePage.bind(this)
        this.nextRandomAnime = this.nextRandomAnime.bind(this)
        this.getGenre = this.getGenre.bind(this)
        this.changePage = this.changePage.bind(this)
        this.watchedAnime = this.watchedAnime.bind(this)
    }

    componentDidMount(){
        this.loadanimePage()
    }

    loadanimePage(){  
        fetch("https://jikan1.p.rapidapi.com/genre/anime/" + this.state.genre + "/" + this.state.page, {
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
        })
      }

    nextRandomAnime(){
        this.setState({
            i: this.state.i + 1
        })
    }

    getGenre(props){
        this.setState({
          genre: props,
          isLoading: false,
          i: 0
        })
        setTimeout(() => {
            this.loadanimePage()
        }, 100)
    }

    toggleSidebar(){
      this.setState(prevState => ({
        showSidebar: !prevState.showSidebar
      }))
    }

    changePage(){
      this.setState({
        page: this.state.page + 1
      })
      //this.loadanimePage()
    }

    watchedAnime(){
      //Adds anime to watchlist using session storage
      const temp = JSON.parse(localStorage.getItem('mylocalStorage') || '[]')
      temp.push(this.state.animeList[this.state.i])
      this.state.watchList.push(this.state.animeList[this.state.i])
      localStorage.setItem('mylocalStorage', JSON.stringify(temp))

      this.nextRandomAnime()
    }

    displayAnime(){
      var {animeList, i} = this.state
      const watched = JSON.parse(localStorage.getItem('mylocalStorage') || '[]')

      for(var j = 0; j < watched.length; j++){
        if(animeList[i].mal_id == watched[j].mal_id){     
          this.nextRandomAnime()  
        }
      }
      
      return(
        <div className="Container">
          <div className="Image">
            <img src={animeList[i].image_url} />
          </div>
          <div className="Info">
            <h1><a style={{textDecoration:"none", color:"blue"}} href={animeList[i].url} target="_blank"> {animeList[i].title} </a></h1>
            <h3>Year: {animeList[i].airing_start[0]}{animeList[i].airing_start[1]}{animeList[i].airing_start[2]}{animeList[i].airing_start[3]}</h3>
            <h3>Episodes: {animeList[i].episodes}</h3>
            <h3>Synopsis: <p>{animeList[i].synopsis}</p></h3>
          </div>
        </div>  
      )
    }

    render(){
        var {isLoading, animeList, i} = this.state
      
          if (!isLoading){    
            return(
              <div>
                Loading...
              </div>
            )
          }
          else{
            return(
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
                      <h2 className="row" style={{color:"black"}} onClick={()=>{window.location.pathname = "/anime-generator/completedanimep"}}>Watched</h2>
                      <h1 className="row" style={{color:"black"}}> <NavLink className="NavLink" to="/">Home</NavLink></h1>
                      <h2 className="row" style={{color:"black"}}> <NavLink className="NavLink" to={{ pathname:"/completedanime", state:{listcomplete:this.state.watchList}}}>Watched</NavLink> </h2> */}
                      <h2 style={{color:"black", margin:"10px", paddingLeft:"13px"}}>Genre</h2>
                      {GenreData.map((val, key) => {
                        return(
                          <li 
                            key={key} 
                            classname="row" 
                            id={val.value===this.state.genre ? "active" : ""}
                            onClick={() => {this.getGenre(val.value)}}
                          >
                            <div className="row">
                              <div id="icon">{val.icon}</div>
                              <div id="genre">{val.genre}</div>
                            </div>
                          </li>
                        )
                      })}
                    </ul>
                  </div> : null}

                  <div className="Randomizer">
                    <div className="Buttons">
                      <button onClick={this.watchedAnime} style={{margin:"1%"}}>
                        Watched
                      </button>
                      <button onClick={i < 99 ? this.nextRandomAnime : this.changePage}>
                        Next Random Anime
                      </button>
                    </div>

                    {this.displayAnime()}
                  </div>
                </div>         
              </div>
            )
          }
    }
}

export default Sidebar
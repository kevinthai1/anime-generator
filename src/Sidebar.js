import React from 'react'
import {GenreData} from './GenreData'

class Sidebar extends React.Component{

    constructor(){
        super()
        this.state = {
           animeList: [""],
           i: 0,
           page: 1,
           genre: 3, 
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
            console.log(this.state.animeList[this.state.i])
        })
      }

    nextRandomAnime(){
        this.setState({
            i: this.state.i + 1
        })
    }

    // getGenre(event){
    //     const {value} = event.target
    //     this.setState({
    //       genre: value,
    //       isLoading: false
    //     })
    //     setTimeout(() => {
    //         this.loadanimePage()
    //       }, 100)
    // }
    getGenre(props){
        this.setState({
          genre: props,
          isLoading: false
        })
        setTimeout(() => {
            this.loadanimePage()
          }, 100)
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
            return(
              <div className="App">
                {/* <div className="TopBar"></div>*/}
                <div className="MainPage">
                  <div className="Sidebar">
                      <ul className="SidebarList">
                          <h1 className="row" style={{color:"black"}} onClick={() => {console.log("HI")}}>Genre</h1>
                          {GenreData.map((val, key) => {
                            return(
                              // onClick={()=>{window.location.pathname = val.link}}
                              <li 
                                key={key} 
                                classname="row" 
                                id={val.value==this.state.genre ? "active" : ""}
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
                      {/* <h3>Genre: 
                      <select
                      value={this.state.genre}
                      onChange={this.getGenre}
                      >
                      <option value="1">Action</option>
                      <option value="2">Adventure</option>
                      <option value="3">Cars</option>
                      <option value="4">Comedy</option>
                      </select>
                      </h3>
                      {console.log(this.state.genre)} */}
                  </div>

                  <div className="Randomizer">
                    <div className="Buttons">
                      <button onClick={this.loadanimePage}>
                        Random Anime
                      </button>
                      <button onClick={this.nextRandomAnime}>
                        Next Random Anime
                      </button>
                    </div>

                    <div className="Container">
                      <div className="Image">
                          <img src={this.state.animeList[this.state.i].image_url} />
                      </div>

                      <div className="Info">
                      <a href={this.state.animeList[this.state.i].url} target="_blank"> {this.state.animeList[this.state.i].title} </a>
                      <h1>lsdkjf</h1>
                      </div>
                    </div>                    
                  </div>
                </div>         
              </div>
            )
          }
    }
}

export default Sidebar
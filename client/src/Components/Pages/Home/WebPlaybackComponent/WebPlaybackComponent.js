import React, { useState, useEffect, useContext, useRef } from 'react'
import useSound from 'use-sound';
import MusicContext from '../../../../Context/Music/MusicContext';
import './WebPlaybackComponent.css'
import ramStuti from './../../../../SampleSongs/RamStuti.mp3'
import NowPlayingViewSymbol from './Images/NowPlayingView.png'
import LyricsSymbol from './Images/Lyrics.png'
import MuteSymbol from './Images/Mute.png'
import QueueSymbol from './Images/Queue.png'
import FullScreenSymbol from './Images/FullScreen.png'
import OpenMiniPlayerSymbol from './Images/OpenMiniPlayer.png'

const WebPlaybackComponent = (props) => {

  const [is_paused, setPaused] = useState(true);
  const [trackTimeStamp, setTrackTimeStamp]= useState(0);
  const [trackProgress, setTrackProgress]= useState('');
  const track_progress= useRef('');
  const [player, setPlayer] = useState(undefined);
  const [trackStarted, setTrackStartedStatus]= useState(false);
  const [is_active, setActive] = useState(false);
  const [deviceId, setDeviceId]= useState('');
  const context= useContext(MusicContext);
  const {current_track, setTrack}= context;
  const [track_Name, setTrackName]= useState('');
  const [track_Duration, setTrackDuration]= useState('');
  const [track_Artists, setTrackArtists]= useState([]);
  const [album_Image, setAlbumImage]= useState('');
  const clientCredential_accessToken= process.env.REACT_APP_clientCredential_accessToken;
  const intervalId= useRef(0);
  const [volume, setVolume]= useState(1);
  const startX= useRef(null); // starting X coordinates of progress bar
  const endX= useRef(null); // ending X coordinates of progress bar
  const [isMouseDown, setIsMouseDown]= useState(false); // true when left mouse button is clicked down-> will be false when button is released
  const [posX, setPosX]= useState(''); // X coordinates of window while moving mouse after click-hold on progress-bar
  const [play, {pause, duration, sound}] = useSound(ramStuti, {volume, onend: ()=> {setTrackProgress(0); setTrackTimeStamp(0); setPaused(true)}}); // duration is in milliseconds, floating to more than 4-5 digits
  const [seekTime, setSeekTime] = useState(10); // Default seek position (in seconds) to be used as- sound.seek(seekTime)

  useEffect(()=>{
    if(!sound) {
      return;
    }
    if(is_paused) return;
    if(isMouseDown) return;
    const interval= setInterval(()=>{
      let currPos= sound.seek() // return time in seconds
      let currProgress= (currPos/(Math.floor((parseInt(duration))/1000)))*100;
      setTrackProgress(currProgress);
      track_progress.current= currProgress;
      if(track_progress.current=== 100) setPaused(true);
      setTrackTimeStamp(sound.seek());
    }, 1000);
    return () => {
      clearInterval(interval); 
      };
  },[sound, is_paused, isMouseDown]);

  const handleMouseMove= (e)=>{
    //e.clientX is X coordinate of current position of window 
    setPosX(e.clientX); 
    setTrackPosition(e.clientX);
  }
  const handleMouseUp= (e)=>{
    setContent();
    setIsMouseDown(false);  
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  }
  const handleMouseDown= (e)=>{
    setTrackPosition(e.clientX);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    setIsMouseDown(true);
  }

  const handlePlay= () =>{
    setPaused(false);
  }
  const handlePause= () =>{
    setPaused(true);
  }

  const setTrackPosition= (windowXCoordinate)=>{
    const element = document.getElementById("scrollBar");
    const rect = element.getBoundingClientRect();
    startX.current = rect.left;
    endX.current = rect.right;
    let currProgress;
    if(windowXCoordinate<= startX.current) currProgress= 0; //0- 100
    else if(windowXCoordinate>= endX.current) currProgress= 100;
    else{
      currProgress= ((windowXCoordinate- startX.current)/(endX.current- startX.current))*100; //0- 100
    }
    setTrackProgress(currProgress);
    track_progress.current= currProgress;
    if(track_progress.current=== 100) setPaused(true);
    setTrackTimeStamp((currProgress*(duration/1000))/100);
  }

  const setContent= ()=>{
    let currTrackTimeStamp= ((duration/1000)*track_progress.current)/100; //track content position in second, converted from trackProgress
    sound.seek(currTrackTimeStamp);
  }

  return (
    <>
        <div className="container" style={{border: "2px solid red", width: "100vw", display: 'flex', flexDirection: 'row'}}>
              <div id="trackDetails"  style={{border: "2px solid green", width: "25%", display: 'flex', flexDirection: 'row', float: 'left'}}>
                <div id="trackImage">
                  Image
                </div>
                <div id="track_TitleArtists" style={{display: 'flex', flexDirection: 'column'}}>
                  <div id="title">
                      {track_Name}
                  </div>
                  <div id="artists">
                    Artist1, Artist2
                  </div>
                </div> 
                <div id="addToFavourites">
                <i className="fa-solid fa-circle-plus"></i>
                </div>
              </div>
              <div id="trackControls" style={{border: "2px solid yellow", width: "50%", display: 'flex', flexDirection: 'column'}}>
                  <div id="mainControls" style={{padding: "", display: 'flex', flexDirection: 'row', justifyContent: "center", gap: "25px"}}>
                    <div id="shuffle">
                      <i className="fa-solid fa-shuffle"/>
                    </div>
                    <div id="prevTrack">
                      <i className="fa-solid fa-backward-step"></i>
                    </div>
                    <div id="togglePlay">
                      {is_paused? <i onClick={()=> {play(); handlePlay();}} className="fa-solid fa-circle-play"/>: <i onClick={()=> {pause(); handlePause();}} className="fa-solid fa-circle-pause"/>}
                    </div>
                    <div id="nextTrack">
                      <i className="fa-solid fa-forward-step"></i>
                    </div>
                    <div id="repeat">
                      <i className="fa-solid fa-repeat"></i>
                    </div>
                  </div>
                  <div id="progressBar" style={{display: "flex", flexDirection: 'row', gap: "20px", alignItems: 'center' }}>
                    <div id="timeSwapt">
                        {Math.floor((Math.floor(trackTimeStamp))/60)}:{(Math.floor(trackTimeStamp))%60}
                    </div>
                    <div id="scrollBar" onMouseDown={handleMouseDown} >
                      <div id="scrollFill" style={{ color: 'white', width: `${trackProgress}%` }}>
                      </div>
                    </div>
                    <div id="trackDuration">
                        {Math.floor((parseInt(duration))/60000)}:{Math.floor(((parseInt(duration))/1000)%60)}
                    </div>
                  </div>
              </div> 
              <div id="extraTrackControls" style={{border: "2px solid purple", width: "25%", display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                <span id="nowPlayingView">
                  <img src={NowPlayingViewSymbol} alt="" />
                </span>
                <span id="lyrics">
                  <img src={LyricsSymbol} alt="" />
                  {/* <i class="fa-solid fa-microphone-stand"></i> */}
                </span>
                <span id="showQueue">
                  <img src={QueueSymbol} alt="" />
                </span>
                <span id="controlMute">
                  <img src={MuteSymbol} alt="" />
                </span>
                <span id="controleVolume">
                </span>
                <span id="openMiniPlayer">
                  <img src={OpenMiniPlayerSymbol} alt="" />
                </span>
                <span id="fullScreen" style={{fontWeight:"bolder", color: "white"}}>
                  <img src={FullScreenSymbol} alt="" />
                </span>
              </div>
        </div>
      </>
  )
}

export default WebPlaybackComponent

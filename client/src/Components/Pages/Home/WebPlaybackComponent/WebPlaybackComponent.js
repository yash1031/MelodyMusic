import React, { useState, useEffect, useContext, useRef } from 'react'
import useSound from 'use-sound';
import MusicContext from '../../../../Context/Music/MusicContext';
import './WebPlaybackComponent.css'
import ramStuti from './../../../../SampleSongs/RamStuti.mp3'

const CustomProgressBar = ({ progress }) => (
  <div className="progress-bar">
    <div className="progress-fill" style={{ color: 'white', width: `${progress}%` }}></div>
  </div>
);

const WebPlaybackComponent = (props) => {

  const [player, setPlayer] = useState(undefined);
  const [is_paused, setPaused] = useState(true);
  const [trackStarted, setTrackStartedStatus]= useState(false);
  const [trackPosition, setTrackPosition]= useState(0);
  const [is_active, setActive] = useState(false);
  const [deviceId, setDeviceId]= useState('');
  const [trackProgress, setTrackProgress]= useState('');
  const context= useContext(MusicContext);
  const {current_track, setTrack}= context;
  const [track_Name, setTrackName]= useState('');
  const [track_Duration, setTrackDuration]= useState('');
  const [track_Artists, setTrackArtists]= useState([]);
  const [album_Image, setAlbumImage]= useState('');
  const clientCredential_accessToken= process.env.REACT_APP_clientCredential_accessToken;
  const intervalId= useRef(0);
  const [volume, setVolume]= useState(1);

  const [play, {pause, duration}] = useSound(ramStuti, {volume});

  const handlePlay= () =>{
    setPaused(false);
    console.log("Duration of the track is: "+ duration);
  }
  const handlePause= () =>{
    setPaused(true);
  }
  const [seekTime, setSeekTime] = useState(10); // Default seek position (in seconds)

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
                        {Math.floor((Math.floor(trackPosition/1000))/60)}:{(Math.floor(trackPosition/1000))%60}
                    </div>
                    <CustomProgressBar progress={(trackPosition*100)/duration} />
                    <div id="trackDuration">
                        {Math.floor((parseInt(duration)+999)/60000)}:{Math.floor(((parseInt(duration)+999)/1000)%60)}
                    </div>
                  </div>
              </div> 
              <div id="extraTrackControls" style={{border: "2px solid purple", width: "25%", display: 'flex', flexDirection: 'row', float: 'right'}}>
                <div id="nowPlayingView">
                  <i style={{}} className="fa-solid fa-play"></i>
                </div>
                <div id="lyrics">

                </div>
                <div id="showQueue">

                </div>
                <div id="controlMute">

                </div>
                <div id="controleVolume">

                </div>
                <div id="openMiniPlayer">

                </div>
                <div id="fullScreen">

                </div>
              </div>
           {/* <button onClick={togglePlay}>{is_paused? "Play Track": "Pause Track"}</button> */}
        </div>
      </>
  )
}

export default WebPlaybackComponent

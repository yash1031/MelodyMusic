import React, { useState, useEffect, useContext } from 'react'
import MusicContext from '../../../../Context/Music/MusicContext';
import './WebPlaybackComponent.css'

const CustomProgressBar = ({ progress }) => (
  <div className="progress-bar">
    <div className="progress-fill" style={{ width: `${progress}%` }}></div>
  </div>
);

const WebPlaybackComponent = (props) => {

  const [player, setPlayer] = useState(undefined);
  const [is_paused, setPaused] = useState(true);
  const [trackPlaying, setTrackPlayingStatus]= useState(false);
  const [trackPosition, setTrackPosition]= useState(0);
  const [is_active, setActive] = useState(false);
  const [deviceId, setDeviceId]= useState('');
  const [trackProgress, setTrackProgress]= useState('');
  const context= useContext(MusicContext);
  const {current_track, setTrack}= context;
  const [track_Duration, setTrackDuration]= useState('');
  const [track_Name, setTrackName]= useState('');
  const [track_Artists, setTrackArtists]= useState([]);
  const [album_Image, setAlbumImage]= useState('');
  const clientCredential_accessToken= process.env.REACT_APP_clientCredential_accessToken;
  
  useEffect(() => {

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
        console.log("In spotifyWebPlaybackSDKReady, token is: ", props.player_access_token);
        const player = new window.Spotify.Player({
            name: 'Web Playback SDK Quick Start Player',
            getOAuthToken: cb => { cb(props.player_access_token); },
            volume: 0.5
        });

        setPlayer(player);

        player.addListener('ready', ({ device_id }) => {
            console.log('Ready with Device ID', device_id);
            setDeviceId(device_id);
        });

        player.addListener('not_ready', ({ device_id }) => {
            console.log('Device ID has gone offline', device_id);
        });

        player.connect();

    };
}, []);

  useEffect( ()=>{
    const getTrackDetails= async ()=>{
      try{
        const response=  await fetch(`https://api.spotify.com/v1/tracks/${current_track}`,{
          method: "GET",
          headers: {
            'Authorization': `Bearer ${clientCredential_accessToken}`,
          }
        })
        const json= await response.json();
        if(response.status === 200){
          setTrackDuration(json.duration_ms);
          setTrackName(json.name);
          setAlbumImage(json.album?.images[0]?.url)
          let artists= [];
          let duration= await json.duration_ms;
          json.artists.map((artist)=>{
            artists.push(artist);
          })
          setTrackArtists(artists);
        }
        else{
          console.log("Error1 fetching track details", json.error)
          // alert("Error1 fetching track details", json.error)
        }
      }
      catch(error){
        console.log("Error2 fetching track details", error)
        // alert("Error2 fetching track details", error)
      }
    }
    getTrackDetails();
  }, [current_track])

const playTrack = async (deviceId, trackUri) => {
  console.log("props.player_access_token", props.player_access_token)
  console.log("trackUri", trackUri)
  if(trackPlaying){
    player.seek(trackPosition).then(() => {
      player.togglePlay();
      console.log("trackPosition is: "+ trackPosition);
      console.log('Resumed playback!');
      setPaused(false);
      console.log('Track is playing!');
    });
    return;
  }
    try {
      const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
        method: 'PUT',
        body: JSON.stringify({
          uris: [trackUri],
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${props.player_access_token}`,
        },
      });
      if (response.status === 204) {
        setPaused(false);
        console.log('Track is playing!');
      } else {
        console.error('Failed to play track', response.error);
        alert('Failed to play track', response.error);
      }
    } catch (error) {
      console.error('Error playing track:', error);
      alert('Error playing track:', error);
    }
    setTrackPlayingStatus(true);
  };  

const pauseTrack = async (deviceId) => {
  player.togglePlay().then(() => {
    console.log('Toggled playback!');
    setPaused(true);
    player.getCurrentState().then(state => {
      if (!state) {
        console.error('User is not playing music through the Web Playback SDK');
        return;
      }
      const track_position = state.position;
      setTrackPosition(track_position);
      console.log(track_position);
      console.log(state);
    });
    
    console.log('Track is paused!');
  });
    // try {
    //     const response = await fetch(`https://api.spotify.com/v1/me/player/pause?device_id=${deviceId}`, {
    //       method: 'PUT',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${props.player_access_token}`,
    //       },
    //     });
    //     if (response.status === 204 || response.status === 200) {
    //       setPaused(true);
    //       console.log('Track is paused!');
    //     } else {
    //       console.log(response.status);
    //       console.error('Failed to pause track');
    //     }
    // } catch (error) {
    //   console.error('Error pausing track:', error);
    // }
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
                      {is_paused? <i onClick={()=> {setTrackPlayingStatus(false); playTrack(deviceId, `spotify:track:${current_track}`)}} className="fa-solid fa-circle-play"/>: <i onClick={()=> pauseTrack(deviceId)} className="fa-solid fa-circle-pause"/>}
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
                        2:29
                    </div>
                    <CustomProgressBar progress={50} />
                    <div id="trackDuration">
                        {Math.floor((parseInt(track_Duration)+999)/60000)}:{Math.floor(((parseInt(track_Duration)+999)/1000)%60)}
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

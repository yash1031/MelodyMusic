import React, { useState, useEffect } from 'react'

const WebPlaybackComponent = (props) => {

  const [player, setPlayer] = useState(undefined);
  const [is_paused, setPaused] = useState(true);
  const [is_active, setActive] = useState(false);
  const [deviceId, setDeviceId]= useState('');
//   const [current_track, setTrack] = useState(track);

  useEffect(() => {

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
        console.log("In spotifyWebPlaybackSDKReady");
        // console.log(accessToken);
        const player = new window.Spotify.Player({
            name: 'Web Playback SDK Quick Start Player',
            getOAuthToken: cb => { cb(props.token); },
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

const playTrack = async (deviceId, token, trackUri) => {
    try {
      const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
        method: 'PUT',
        body: JSON.stringify({
          uris: [trackUri],
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${props.token}`,
        },
      });
      if (response.status === 204) {
        setPaused(false);
        console.log('Track is playing!');
      } else {
        console.error('Failed to play track');
      }
    } catch (error) {
      console.error('Error playing track:', error);
    }
  };  

const pauseTrack = async (deviceId) => {
    try {
        const response = await fetch(`https://api.spotify.com/v1/me/player/pause?device_id=${deviceId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${props.token}`,
          },
        });
        if (response.status === 204) {
          setPaused(true);
          console.log('Track is paused!');
        } else {
          console.error('Failed to pause track');
        }
    } catch (error) {
      console.error('Error pausing track:', error);
    }
}  

  // const togglePlay = () => {
  //   is_paused? playTrack(deviceId, props.token, 'spotify:track:7ynyU7I8T6aWEaKIOrKTxE'): pauseTrack(deviceId); // Example track ID
  // };

  return (
    <>
        <div className="container" style={{border: "2px solid red", width: "100vw", display: 'flex', flexDirection: 'row'}}>
              <div id="trackDetails"  style={{border: "2px solid green", width: "25%", display: 'flex', flexDirection: 'row', float: 'left'}}>
                <div id="trackImage">
                  Image
                </div>
                <div id="track_TitleArtists" style={{display: 'flex', flexDirection: 'column'}}>
                  <div id="title">
                      This is title
                  </div>
                  <div id="artists">
                    Artist1, Artist2
                  </div>
                </div> 
                <div id="addToFavourites">
                <i class="fa-solid fa-circle-plus"></i>
                </div>
              </div>
              <div id="trackControls" style={{border: "2px solid yellow", width: "50%", display: 'flex', flexDirection: 'column'}}>
                  <div id="mainControls" style={{display: 'flex', flexDirection: 'row', justifyContent: "center", justifyContent: "space-between"}}>
                    <div id="shuffle">
                      <i class="fa-solid fa-shuffle"/>
                    </div>
                    <div id="prevTrack">
                      <i class="fa-solid fa-backward-step"></i>
                    </div>
                    <div id="togglePlay">
                      {is_paused? <i onClick={playTrack(deviceId, props.token, 'spotify:track:7ynyU7I8T6aWEaKIOrKTxE')} class="fa-solid fa-circle-play"/>: <i onClick={pauseTrack(deviceId)} class="fa-solid fa-circle-pause"/>}
                    </div>
                    <div id="nextTrack">
                      <i class="fa-solid fa-forward-step"></i>
                    </div>
                    <div id="repeat">
                      <i class="fa-solid fa-repeat"></i>
                    </div>
                  </div>
                  <div id="progressBar">
                    This is Progress Bar
                  </div>
              </div> 
              <div id="extraTrackControls" style={{border: "2px solid purple", width: "25%", display: 'flex', flexDirection: 'row', float: 'right'}}>
                <div id="nowPlayingView">
                  <i style={{}} class="fa-solid fa-play"></i>
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

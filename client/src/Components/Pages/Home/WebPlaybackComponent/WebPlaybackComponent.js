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

  const togglePlay = () => {
    is_paused? playTrack(deviceId, props.token, 'spotify:track:7ynyU7I8T6aWEaKIOrKTxE'): pauseTrack(deviceId); // Example track ID
  };

  return (
    <>
        <div className="container">
           <div className="main-wrapper">
           <button onClick={togglePlay}>{is_paused? "Play Track": "Pause Track"}</button>
            </div>
        </div>
      </>
  )
}

export default WebPlaybackComponent

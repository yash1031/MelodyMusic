import React, { useState, useEffect } from 'react'

const WebPlaybackComponent = () => {

  const [player, setPlayer] = useState(undefined);
  const accessToken= process.env.REACT_APP_accessToken

  useEffect= (()=>{
    //Setting up onSpotifyWebPlaybackSDKReady
    window.onSpotifyWebPlaybackSDKReady = () => {
        const token = accessToken;
        const player = new window.Spotify.Player({
            name: 'Web Playback SDK Quick Start Player',
            getOAuthToken: cb => { cb(token); },
            volume: 0.5
        });

        setPlayer(player);
    
        // Ready
        player.addListener('ready', ({ device_id }) => {
            console.log('Ready with Device ID', device_id);
        });
    
        // Not Ready
        player.addListener('not_ready', ({ device_id }) => {
            console.log('Device ID has gone offline', device_id);
        });
    
        player.addListener('initialization_error', ({ message }) => {
            console.error(message);
        });
    
        player.addListener('authentication_error', ({ message }) => {
            console.error(message);
        });
    
        player.addListener('account_error', ({ message }) => {
            console.error(message);
        });
    
        document.getElementById('togglePlay').onclick = function() {
        player.togglePlay();
        };
    
        player.connect();
    }
  }, []);

  return (
    <div>
      <button id="togglePlay">Toggle Play</button>
    </div>
  )
}

export default WebPlaybackComponent

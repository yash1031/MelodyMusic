import React, { useState, useEffect } from 'react'

const WebPlaybackComponent = (props) => {

  const [player, setPlayer] = useState(undefined);

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
        });

        player.addListener('not_ready', ({ device_id }) => {
            console.log('Device ID has gone offline', device_id);
        });

        player.connect();

    };
}, []);

  return (
    <>
        <div className="container">
           <div className="main-wrapper">
                This is the WebPlaybackComponent
            </div>
        </div>
      </>
  )
}

export default WebPlaybackComponent

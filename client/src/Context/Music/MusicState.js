import React, {useState} from 'react'
import MusicContext from './MusicContext'

const MusicState = (props) => {
    const [current_track, setTrack] = useState('7ynyU7I8T6aWEaKIOrKTxE');

    return (
        <MusicContext.Provider value={{current_track, setTrack}}>
          {props.children}
        </MusicContext.Provider>
      )
}

export default MusicState

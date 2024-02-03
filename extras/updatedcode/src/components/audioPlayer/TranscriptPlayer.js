import React, { useRef, useEffect, useState } from 'react'
import './audioplayer.css';
import AudioRightImg from "./img/audio-player-icon.svg";
import { Row, Col } from 'react-bootstrap';
import PlayIcon from './img/play-icon.svg';
import PauseIcon from './img/pause-icon.svg';

const TranscriptPlayer = ({chat, currentTime, setCurrentTime, audioTotalTime, setAudioTotalTime}) => {
  
  const [isPlaying, setIsPlaying] = useState(false);

  function secondsToTime(e) {
    var m = Math.floor(e % 3600 / 60).toString().padStart(2, '0'),
      s = Math.floor(e % 60).toString().padStart(2, '0');
    return m + ':' + s;
  }

  useEffect(() => {
    if(chat.length > 0){
        setAudioTotalTime(chat[chat.length - 1][1][1])
      }
  }, [])

  const play = () => {
    setIsPlaying(true)
  };

  const pause = () => {
    setIsPlaying(false)
  };

  useEffect(() => {
    if (isPlaying) {
      if (currentTime < audioTotalTime) {
        const interval = setInterval(() => {
            setCurrentTime(parseInt(currentTime) + 1);
        }, 1000);
        return () => clearInterval(interval);
      } else {
        setCurrentTime(0);
        setIsPlaying(false);
      }
    }
  }, [isPlaying, currentTime]);

  return (
    <div className='audio-player mt-2'>
      <Row>
        <Col md={11} xs={12}>
          <h5 className='title'>Play Transcript</h5>

          <Row>
            <Col xs={1}>
              <div className='d-flex justify-content-center'>
                {
                  isPlaying ? <div onClick={pause} className="pause-btn"><img src={PlayIcon} alt="PauseIcon" /></div> :
                    <div onClick={play} className="play-btn"><img src={PauseIcon} alt="PlayIcon" /></div>
                }
              </div>
            </Col>
            <Col xs={11} className="audio-player-ip">
              <input
                type="range"
                min="0"
                max={audioTotalTime}
                step="1"
                value={currentTime}
                defaultValue="0"
                className="w-100 audioplayer-input"
                style={{ 'background': `linear-gradient(to right, #00829B ${(parseInt(currentTime) - 0) * 100 / (audioTotalTime - 0)}%, #ccc 0px` }}
                // onChange={(e) => {
                //   setCurrentTime(e.target.value);
                // }}
              />
              <Row className='pb-2 audio-player-time'>
                <Col xs={6}>{secondsToTime(currentTime)}</Col>
                <Col xs={6} className="text-end">{secondsToTime(audioTotalTime)}</Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col md={1} xs={12}>
          <img src={AudioRightImg} alt="AudioRightImg" className='right-img' />
        </Col>
      </Row>
    </div>
  )
}

export default TranscriptPlayer
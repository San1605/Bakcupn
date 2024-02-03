import React, { useRef, useEffect, useState } from "react";
import "./audioplayer.css";
import AudioRightImg from "./img/audio-player-icon.svg";
import { Row, Col } from "react-bootstrap";
import PlayIcon from "./img/play-icon.svg";
import PauseIcon from "./img/pause-icon.svg";
import VolumeIcon from "./img/volume.svg";
import Audios from "../../assets/call-8.wav";

const AudioPlayer = ({
  Audio,
  currentTime,
  setCurrentTime,
  audioTotalTime,
  setAudioTotalTime,
}) => {
  const audioPlayer = useRef();
  const [seekValue, setSeekValue] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerVolume, setPlayerVolume] = useState(1);
  const [currentTimeInt, setCurrentTimeInt] = useState(0);

  function secondsToTime(e) {
    var m = Math.floor((e % 3600) / 60)
        .toString()
        .padStart(2, "0"),
      s = Math.floor(e % 60)
        .toString()
        .padStart(2, "0");
    return m + ":" + s;
  }

  const play = () => {
    audioPlayer.current.play();
    setIsPlaying(true);
  };

  const pause = () => {
    audioPlayer.current.pause();
    setIsPlaying(false);
  };
  const onPlaying = () => {
    setCurrentTime(audioPlayer.current.currentTime);
    setCurrentTimeInt(parseInt(audioPlayer.current.currentTime));
    setSeekValue((audioPlayer.current.currentTime / audioTotalTime) * 100);
    if (audioPlayer.current.currentTime === audioTotalTime) {
      setIsPlaying(false);
    }
  };

  const onLoadedMetadata = () => {
    if (audioPlayer.current) {
      setAudioTotalTime(audioPlayer.current.duration);
    }
  };

  useEffect(() => {
    audioPlayer.current.volume = playerVolume;
  }, [playerVolume]);

  return (
    <div className="audio-player">
      <Row className="mb-2">
        <Col md={12} xs={12}>
          {/* <h5 className="text-gray-700 text-18 font-semibold">
            Call Duration
          </h5> */}
             <div className="rounded-t-lg border-b border-gray-300 bg-white text-gray-700 px-6  text-18 font-semibold py-2">
             Call Duration
              </div>

          <audio
            src={Audios}
            ref={audioPlayer}
            onTimeUpdate={onPlaying}
            onLoadedMetadata={onLoadedMetadata}
          >
            Your browser does not support the
            <code>audio</code> element.
          </audio>

          <Row className="ms-0 mt-2 px-6">
            <Col xs={2} className="pt-2 w-fit">
              <div className="d-flex items-center justify-content-center h-4 w-4 text-black">
                {/* {
                  isPlaying ? <div onClick={pause} className="pause-btn"><img src={PlayIcon} alt="PauseIcon" /></div> :
                    <div onClick={play} className="play-btn"><img src={PauseIcon} alt="PlayIcon" /></div>
                } */}
                Agent:
              </div>
            </Col>
            <Col xs={10} className="audio-player-ip pt-1">
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={seekValue}
                className="w-100 audioplayer-input"
                style={{
                  background: `linear-gradient(to right, #00829B  ${
                    ((parseInt(seekValue + 0.5) - 0) * 100) / (100 - 0)
                  }%, #E4E4E4 0px`,
                }}
                onChange={(e) => {
                  const seekto = audioTotalTime * (+e.target.value / 100);
                  audioPlayer.current.currentTime = seekto;
                  setSeekValue(e.target.value);
                }}
              />
            </Col>
            {/* <Col xs={2}>
              <div className='audio-volume d-flex'>
                <div className='audio-img'>
                  <img src={VolumeIcon} alt="VolumeIcon" />
                </div>
                <div className='volume-range'>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={playerVolume}
                    style={{ 'background': `linear-gradient(to right, #00829B ${(parseInt(playerVolume*100 + 0) - 0) * 100 / (100 - 0)}%, #ccc 0px` }}
                    onChange={(e) => setPlayerVolume(e.target.value)}
                  />
                </div>
              </div>
            </Col> */}
          </Row>
          <Row className="mt-4 ms-0 px-6">
            <Col xs={2} className="pt-1 w-fit ps-[23px]">
              <div className="d-flex items-center justify-content-center h-4 w-4 text-black ps-[20px]">
                {/* {
                  isPlaying ? <div onClick={pause} className="pause-btn"><img src={PlayIcon} alt="PauseIcon" /></div> :
                    <div onClick={play} className="play-btn"><img src={PauseIcon} alt="PlayIcon" /></div>
                } */}
                Customer:
              </div>
            </Col>
            <Col xs={10} className="audio-player-ip">
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={seekValue}
                className="w-100 audioplayer-input"
                style={{
                  background: `linear-gradient(to right, #EA6C45  ${
                    ((parseInt(seekValue + 0.5) - 0) * 100) / (100 - 0)
                  }%, #E4E4E4 0px`,
                }}
                onChange={(e) => {
                  const seekto = audioTotalTime * (+e.target.value / 100);
                  audioPlayer.current.currentTime = seekto;
                  setSeekValue(e.target.value);
                }}
              />
            </Col>
            {/* <Col xs={2}>
              <div className='audio-volume d-flex'>
                <div className='audio-img'>
                  <img src={VolumeIcon} alt="VolumeIcon" />
                </div>
                <div className='volume-range'>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={playerVolume}
                    style={{ 'background': `linear-gradient(to right, #00829B ${(parseInt(playerVolume*100 + 0) - 0) * 100 / (100 - 0)}%, #ccc 0px` }}
                    onChange={(e) => setPlayerVolume(e.target.value)}
                  />
                </div>
              </div>
            </Col> */}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default AudioPlayer;

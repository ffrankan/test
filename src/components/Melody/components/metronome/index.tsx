import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button, Switch } from 'antd';
import * as Tone from 'tone';
import NumberKeyboard from './NumberKeyboard';
import BeatPicker from './beatPicker';
import { styled } from 'styled-components'

interface MetronomeProps {
    defaults?: {
        bpm: number;
        beat: string;
        note: string;
    };
    button?: boolean;
}

const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #faf8f8;
    display: flex;
    flex-direction: row;
    position: relative;
    font-family: "Comic Sans MS", cursive;
  

  .metronome-container > div {
    flex: 1;
  }

  .metronome-container > div:nth-child(2) {
    flex: 0 0 375px;
    background-color: #ffffff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    position: relative;
    max-width: 100%;
    margin: 0 auto;
    height: 100%;
    overflow: hidden;
  }

  .metronome-container::after {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease;
  }

  .metronome-container:has(.keyboard-position)::after {
    opacity: 1;
    visibility: visible;
  }

  .toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 8px;
    margin-bottom: 24px;
    padding-top: 15px;
  }

  .left,
  .right {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.7);
    padding: 8px 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    background-color: #a6bacc;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.2);
    transition: transform 0.1s ease, background-color 0.1s ease;
  }

  .left {
    width: 54px;
    display: flex;
    justify-content: center;
    font-size: 16px;
    padding: 0;
    height: 34px;
  }

  .right {
    width: 66px !important;
    box-sizing: border-box;
    text-align: center;
  }

  .toolbar .left .mode img {
    width: 20px;
    height: 20px;
  }

  .dot {
    opacity: 0.5;
  }

  .center {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .tempo-controls {
    display: flex;
    align-items: center;
    gap: 16px;
    background-color: #a6bacc;
    padding: 4px 16px;
    border-radius: 24px;
  }

  .tempo-controls img {
    width: 15px;
    height: 30px;
  }

  .minus,
  .plus {
    font-size: 20px;
    color: rgba(0, 0, 0, 0.7);
    cursor: pointer;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(0, 0, 0, 0.7);
    border-radius: 50%;
    transition: all 0.2s ease;
  }

  .minus:hover,
  .plus:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .minus:active,
  .plus:active {
    transform: scale(0.95);
  }

  .bpm-value {
    font-size: 28px;
    color: rgba(0, 0, 0, 0.7);
    text-align: center;
    padding: 0 8px;
  }

  .tempo-label {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
    margin-top: 4px;
  }

  .pro-badge {
    background: rgba(255, 255, 255, 0.2);
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 12px;
  }

  .metronome-body {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .center-circle {
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: 78vh;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .center-circle-img {
    width: 100%;
    height: 100%;
    margin-left: 5px;
  }

  .pointer-container {
    position: fixed;
    width: 20px;
    height: 400px;
    bottom: 103px;
    left: 50%;
    margin-left: -10px;
  }

  .pointer {
    width: 20px;
    height: 400px;
    transform-origin: bottom center;
    position: relative;
    transition: transform 0.1s linear;
    display: flex;
    justify-content: center;
  }

  .pointer-img {
    width: 160px;
    height: 100%;
  }

  .slider-button {
    width: 30px;
    height: 30px;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    cursor: grab;
  }

  .slider-button:active {
    cursor: grabbing;
  }

  .slider-img {
    width: 100%;
    height: 100%;
  }

  .bottom-controls {
    position: absolute;
    bottom: 25px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 60px;
  }

  .play-button {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    border: none;
    padding: 0;
    color: white;
    font-size: 24px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .play-img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .timer,
  .add-button {
    color: rgba(255, 255, 255, 0.5);
    font-size: 14px;
    cursor: pointer;
  }

  .timers {
    position: absolute;
    top: -20px;
    box-sizing: border-box;
    right: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    color: rgba(0, 0, 0, 0.8);
    background-color: #a6bacc;
    border-radius: 8px;
    padding: 5px;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.2);
  }

  .bpm-indicator {
    position: absolute;
    bottom: 50px;
    right: 16px;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
  }

  .keyboard-position {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    margin: 0 auto;
  }

  /* 添加过渡动画 */
  .slide-up-enter-active,
  .slide-up-leave-active {
    transition: transform 0.3s ease;
  }

  .slide-up-enter-from,
  .slide-up-leave-to {
    transform: translateY(100%);
  }

  .slide-up-enter-to,
  .slide-up-leave-from {
    transform: translateY(0);
  }

  .right:active {
    transform: scale(0.95);
    background-color: #8fa4b8;
  }

`

const Metronome: React.FC<MetronomeProps> = ({
         defaults = {
             bpm: 60,
             beat: '4',
             note: '4',
         },
         button = false,
     }) => {
    // 状态管理
    const [on, setOn] = useState(true);
    const [internalState, setInternalState] = useState({
        bpm: defaults.bpm,
        beat: defaults.beat,
        note: defaults.note,
    });
    const [isPlaying, setIsPlaying] = useState(false);
    const [pointerDegree, setPointerDegree] = useState(0);
    const [showKeyboard, setShowKeyboard] = useState(false);
    const [beatShow, setBeatShow] = useState(false);
    const [tapTimes, setTapTimes] = useState<number[]>([]);
    const [checked, setChecked] = useState(true);

    // refs
    const animationId = useRef<number>();
    const tapTimeoutId = useRef<NodeJS.Timeout>();

    // 常量
    const noteImage = {
        1: '/image/metronome/1.png',
        2: '/image/metronome/2.png',
        4: '/image/metronome/4.png',
        8: '/image/metronome/8.png',
        16: '/image/metronome/16.png',
        32: '/image/metronome/32.png',
    };
    const pointerContainerHeight = 400;
    const sliderButtonHeight = 30;

    // 计算slider-button的top值
    const sliderTop = (() => {
        const range = 400 - 20;
        const scale = (internalState.bpm - 20) / range;
        return scale * (pointerContainerHeight - sliderButtonHeight);
    })();

    // 处理TAP功能
    const handleTap = useCallback(() => {
        const now = Date.now();
        setTapTimes(prev => {
            const newTapTimes = [...prev, now];

            if (tapTimeoutId.current) {
                clearTimeout(tapTimeoutId.current);
            }

            tapTimeoutId.current = setTimeout(() => {
                setTapTimes([]);
            }, 3000);

            if (newTapTimes.length === 4) {
                const intervals = newTapTimes
                    .slice(1)
                    .map((time, index) => time - newTapTimes[index]);
                const averageInterval =
                    intervals.reduce((a, b) => a + b, 0) / intervals.length;
                const calculatedBpm = Math.round(60000 / averageInterval);
                const newBpm = Math.max(20, Math.min(400, calculatedBpm));

                setInternalState(prev => ({ ...prev, bpm: newBpm }));
                return [];
            }

            return newTapTimes;
        });
    }, []);

    // 节拍器播放控制
    const startMetronome = useCallback(() => {
        let startTime: number | null = null;
        let lastDegree = 25;
        let passedZeroFromPositive = false;
        let passedZeroFromNegative = false;
        let noteCount = 0;

        const accentSound = new Tone.Player({
            url: '/audio/metronome/重拍.mp3',
            volume: -2,
        }).toDestination();

        const normalSound = new Tone.Player({
            url: '/audio/metronome/轻拍.mp3',
            volume: -2,
        }).toDestination();

        const animate = (timestamp: number) => {
            if (!startTime) {
                startTime = timestamp;
                setPointerDegree(25);
            }

            const elapsed = timestamp - startTime;
            const period = (60 / internalState.bpm) * 1000 * 2;
            const progress = (elapsed % period) / period;

            const newDegree = 25 * Math.cos(progress * Math.PI * 2);
            setPointerDegree(newDegree);

            if (newDegree <= 0 && lastDegree > 0) {
                passedZeroFromPositive = true;
            }
            if (newDegree >= 0 && lastDegree < 0) {
                passedZeroFromNegative = true;
            }

            if (passedZeroFromPositive || passedZeroFromNegative) {
                if (noteCount % parseInt(internalState.beat) === 0 && checked) {
                    accentSound.start();
                } else {
                    normalSound.start();
                }
                noteCount++;

                passedZeroFromPositive = false;
                passedZeroFromNegative = false;
            }

            lastDegree = newDegree;

            if (isPlaying) {
                animationId.current = requestAnimationFrame(animate);
            }
        };

        animationId.current = requestAnimationFrame(animate);
    }, [internalState.bpm, internalState.beat, checked, isPlaying]);

    // 停止节拍器
    const stopMetronome = useCallback(() => {
        if (animationId.current) {
            cancelAnimationFrame(animationId.current);
        }
        setPointerDegree(0);
    }, []);

    // 切换播放状态
    const togglePlay = useCallback(() => {
        if (on) {
            setIsPlaying(prev => {
                const newIsPlaying = !prev;
                if (newIsPlaying) {
                    startMetronome();
                } else {
                    stopMetronome();
                }
                return newIsPlaying;
            });
        }
    }, [on, startMetronome, stopMetronome]);

    // 处理键盘关闭
    const handleKeyboardClose = () => {
        setShowKeyboard(false);
    };

    // 处理BPM更新
    const handleBpmUpdate = (value: string) => {
        setInternalState(prev => ({ ...prev, bpm: Number(value) }));
    };

    // 处理节拍选择器关闭
    const handleBeatClose = () => {
        setBeatShow(false);
    };

    // 处理节拍更新
    const handleBeatUpdate = (value: [string, string]) => {
        setInternalState(prev => ({
            ...prev,
            beat: value[0],
            note: value[1],
        }));
    };

    // 清理副作用
    useEffect(() => {
        return () => {
            if (tapTimeoutId.current) {
                clearTimeout(tapTimeoutId.current);
            }
            stopMetronome();
        };
    }, [stopMetronome]);

    // 监听默认值变化
    useEffect(() => {
        setInternalState(prev => ({
            ...prev,
            bpm: defaults.bpm,
            beat: defaults.beat,
            note: defaults.note,
        }));
    }, [defaults]);

    if (button) {
        return (
            <Button type="default" onClick={() => setOn(prev => !prev)}>
                {on ? '关闭' : '开启'}
            </Button>
        );
    }

    return (
        <Container>
            <div>
                <div className="toolbar">
                    <div className="left">
                        <span className="time-signature" onClick={() => setBeatShow(true)}>
                          {internalState.beat}/{internalState.note}
                        </span>
                    </div>
                    <div className="center">
                        <div className="tempo-controls" onClick={() => setShowKeyboard(true)}>
                            <img src={noteImage[internalState.note as keyof typeof noteImage]} alt="note" />
                            <span>=</span>
                            <span className="bpm-value">{internalState.bpm}</span>
                        </div>
                    </div>
                    <div className="right" onClick={handleTap}>
                        <span>TAP</span>
                    </div>
                </div>

                <div className="metronome-body">
                    {/* 中心圆形区域 */}
                    <div className="center-circle">
                        <img src="/image/metronome/节拍器_07.png" alt="" className="center-circle-img" />
                    </div>
                    {/* 指针和滑块 */}
                    <div className="pointer-container">
                        <div
                            className="pointer"
                            style={{ transform: `rotate(${pointerDegree}deg)` }}
                        >
                            <img src="/image/metronome/节拍器_04.png" className="pointer-img" />
                            <div
                                className="slider-button"
                                style={{ top: `${sliderTop}px` }}
                            >
                                <img src="/image/metronome/节拍器_10.png" className="slider-img" />
                            </div>
                        </div>
                    </div>

                    {/* 底部控制区 */}
                    <div className="bottom-controls">
                        <div className="timer" />
                        <button className="play-button" onClick={togglePlay}>
                            <img
                                src={isPlaying ? '/image/metronome/节拍器_14.png' : '/image/metronome/节拍器_03.png'}
                                className="play-img"
                                alt="play"
                            />
                        </button>
                        <div className="add-button" />
                    </div>
                    {/* 重音开关 */}
                    <div className="timers">
                        重音开关
                        <Switch size="small" checked={checked} onChange={setChecked} />
                    </div>

                    {/* BPM显示 */}
                    <div className="bpm-indicator">BPM {internalState.bpm}</div>
                </div>
            </div>
            <div />

            {/* 数字键盘组件 */}
            {showKeyboard && (
                <NumberKeyboard
                    value={internalState.bpm}
                    onClose={handleKeyboardClose}
                    onSure={handleBpmUpdate}
                />
            )}

            {/* 节拍选择器组件 */}
            {beatShow && (
                <BeatPicker
                    value={[internalState.beat, internalState.note]}
                    onClose={handleBeatClose}
                    onSure={handleBeatUpdate}
                />
            )}
        </Container>
    );
};

export default Metronome;

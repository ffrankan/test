import React, { useState } from 'react';
import { notification } from 'antd';
import { styled } from 'styled-components';

interface NumberKeyboardProps {
    show?: boolean;
    value?: number;
    onClose?: () => void;
    onConfirm?: (value: string) => void;
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 5;
    background-color: rgba(0, 0, 0, 0.5);
  

  .keyboard-container-bg {
    width: 100%;
    height: calc(100vh - 310px);
  }

  .display-area {
    width: 100%;
    height: 310px;
    background-color: #fff;
    position: absolute;
    box-sizing: border-box;
    bottom: 0;
    padding: 10px;
  }

  .display-area-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #000;
  }

  .display-area-title span:first-child {
    font-size: 25px;
    cursor: pointer;
  }

  .display-area-value {
    height: 45px;
    border-bottom: 2px solid #a5a5a5;
    line-height: 45px;
    font-size: 30px;
    color: rgb(22, 22, 22);
  }

  .display-area-content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 5px;
    padding-top: 10px;
  }

  .button {
    background-color: #fff;
    color: rgb(22, 22, 22);
    padding: 10px 0;
    text-align: center;
    font-size: 20px;
    border: none;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease;
    cursor: pointer;
  }

  .button:active {
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    transform: translateY(1px);
  }

`

const NumberKeyboard: React.FC<NumberKeyboardProps> = ({
       show = true,
       value = 0,
       onClose,
       onConfirm
   }) => {
    const [inputValue, setInputValue] = useState(String(value));

    const buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'X', '0', '确认'];

    const handleButtonClick = (item: string) => {
        if (item === 'X') {
            setInputValue(prev => prev.slice(0, -1));
        } else if (item === '删除') {
            setInputValue('');
        } else if (item === '确认') {
            const numValue = Number(inputValue);
            if (numValue < 20) {
                notification.warning({
                    message: 'BPM值不能小于20'
                });
                return;
            }
            if (numValue > 400) {
                notification.warning({
                    message: 'BPM值不能大于400'
                });
                return;
            }
            onConfirm?.(inputValue);
            onClose?.();
        } else {
            setInputValue(prev => prev + item);
        }
    };

    return (
        <Container>
            <div className="keyboard-container-bg" onClick={onClose}></div>
            <div className="display-area">
                <div className="display-area-title">
                    <span onClick={onClose}>×</span>
                    <span>BPM（20-400）</span>
                    <span></span>
                </div>
                <div className="display-area-value">
                    {inputValue}
                </div>
                <div className="display-area-content">
                    {buttons.map(item => (
                        <div
                            key={item}
                            className="button"
                            onClick={() => handleButtonClick(item)}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default NumberKeyboard;

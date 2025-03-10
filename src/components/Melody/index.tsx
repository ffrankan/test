import React, {FC, useEffect, useState, useMemo} from 'react';
import { styled } from 'styled-components';
import ToolBar from './toolBar';
import ScoreArea from './scoreArea';
import ChordControl from './chordControl';
import {notePositions} from './common'
import { Slider } from 'antd';
import { getSampler } from '@/utils/sampler'

// 定义调号类型
interface KeySignature {
    count: number;
    type: 'sharp' | 'flat' | 'none';
}

const Container = styled.div`
    width: 100%;
    height: 100vh;
    color: #1a1a1a;
    background-color: #f0f0f0;
  
    .keyboard-slider { 
      margin: 10px 0;
      padding: 0 20px;
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 4px;
    }
`

const Melody = () => {
    const [isEditModel, setIsEditModel] = useState<boolean>(false);
    const [timeSignature, setTimeSignature] = useState<string>('4/4');
    const [keyboardOffset, setKeyboardOffset] = useState<number>(15); // 键盘偏移量
    const [keyboardSliderValue, setKeyboardSliderValue] = useState<number>(15);
    const [editLinePosition, setEditLinePosition] = useState<number>(15); // 编辑线位置
    const [currentPosition, setCurrentPosition] = useState<number>(0);  // 当前编辑位置
    const [notes, setNotes] = useState([])
    const [selectedKey, setSelectedKey] = useState('major_C')
    const [maxSliderValue, setMaxSliderValue] = useState(0)
    const [selectedNoteValue, setSelectedNoteValue] = useState('whole')  // 选中的音符时值
    const [startX, setStartX] = useState(0)
    const [startOffset, setStartOffset] = useState(0)

    let isDragging = false
    let sampler

    // 计算音符在五线谱上的位置
    const calculateStaffPosition = (noteKey) => {
        return notePositions[noteKey] || 0;
    };

    // 获取音符宽度
    const getNoteWidth = (noteValue) => {
        const widthMap = {
            'whole': 60,
            'dotted-half': 50,
            'half': 40,
            'dotted-quarter': 35,
            'quarter': 30,
            'eighth': 25     // 添加八分音符的宽度
        };
        return widthMap[noteValue] || 30;
    };

    const handleKeyDown = (event) => {
        // 处理空格键退出编辑模式
        if (event.code === 'Space') {
            event.preventDefault(); // 阻止页面滚动
            if (isEditModel) {
                setIsEditModel(false)
            }
            return;
        }

        if (!isEditModel) return;

        switch (event.key) {
            case 'ArrowLeft':
                // 向左移动编辑线
                if (editLinePosition > 0) {
                    const prevNote = notes[editLinePosition - 1];
                    setCurrentPosition(prevNote ? prevNote.position : 0)
                    setEditLinePosition(state => state - 1)
                }
                break;
            case 'ArrowRight':
                // 向右移动编辑线
                if (editLinePosition < notes.length) {
                    const nextNote = notes[editLinePosition];
                    setCurrentPosition(nextNote ? nextNote.position + getNoteWidth(nextNote) : currentPosition)
                    setEditLinePosition(state => state + 1)
                }
                break;
            case 'Backspace':
            case 'Delete':
                // 删除上一个音符
                if (editLinePosition > 0) {
                    const removedNote = notes[editLinePosition - 1];;
                    setNotes([...notes].splice(editLinePosition - 1, 1));
                    setEditLinePosition(state => state - 1)
                    setCurrentPosition(removedNote.position)

                    // 更新后续音符的位置
                    for (let i = editLinePosition; i < notes.length; i++) {
                        setNotes([...notes][i].position = i === 0 ? 0 : notes[i - 1].position + getNoteWidth(notes[i - 1]));
                    }
                }
                break;
        }
    };

    const getKeySignature = useMemo((): KeySignature => {
        const [type, key] = selectedKey.split("_") as [string, string];

        // 定义类型化的调号映射
        const majorKeySignatures: Record<string, KeySignature> = {
            C: { count: 0, type: "none" },
            G: { count: 1, type: "sharp" },
            D: { count: 2, type: "sharp" },
            A: { count: 3, type: "sharp" },
            E: { count: 4, type: "sharp" },
            B: { count: 5, type: "sharp" },
            "F#": { count: 6, type: "sharp" },
            "C#": { count: 7, type: "sharp" },
            F: { count: 1, type: "flat" },
            Bb: { count: 2, type: "flat" },
            Eb: { count: 3, type: "flat" },
            Ab: { count: 4, type: "flat" },
            Db: { count: 5, type: "flat" },
            Gb: { count: 6, type: "flat" },
            Cb: { count: 7, type: "flat" },
        };

        const minorKeySignatures: Record<string, KeySignature> = {
            A: { count: 0, type: "none" },
            E: { count: 1, type: "sharp" },
            B: { count: 2, type: "sharp" },
            "F#": { count: 3, type: "sharp" },
            "C#": { count: 4, type: "sharp" },
            "G#": { count: 5, type: "sharp" },
            "D#": { count: 6, type: "sharp" },
            "A#": { count: 7, type: "sharp" },
            D: { count: 1, type: "flat" },
            G: { count: 2, type: "flat" },
            C: { count: 3, type: "flat" },
            F: { count: 4, type: "flat" },
            Bb: { count: 5, type: "flat" },
            Eb: { count: 6, type: "flat" },
            Ab: { count: 7, type: "flat" },
        };

        // 添加默认值处理
        const defaultSignature: KeySignature = { count: 0, type: "none" };

        if (type === "major") {
            return majorKeySignatures[key] || defaultSignature;
        }
        return minorKeySignatures[key] || defaultSignature;
    }, [selectedKey]); // 依赖 selectedKey 的变化

    // 修改 noteLeft 的计算属性
    const noteLeft = useMemo(() => {
        // 基础位置（包含谱号宽度）
        const basePosition = 55;
        // 根据调号数量调整位置
        const keySignatureWidth = getKeySignature.count * 10;
        // 如果有调号，额外增加一些间距
        const extraSpace = getKeySignature.count > 0 ? 10 : 0;
        // 拍号宽度
        const timeSignatureWidth = 25;

        return basePosition + keySignatureWidth + extraSpace + timeSignatureWidth;
    }, [getKeySignature.count]); // 依赖调号数量的变化

    // 添加双击事件处理函数
    const handleStaffDoubleClick = () => {
        if (!isEditModel) {
            setIsEditModel(true)
            // 将编辑线位置设置到最后
            setEditLinePosition(notes.length)
            // 更新当前位置
            if (notes.length > 0) {
                const lastNote = notes[notes.length - 1];
                setCurrentPosition(lastNote.position + getNoteWidth(lastNote.value))
            } else {
                setCurrentPosition(0)

            }
        }
    };

    // 修改generateAllKeys函数，导出键盘总长度
    const generateAllKeys = () => {
        const octaveNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
        const allWhiteKeys = [];
        const allBlackKeys = [];

        // 生成88键的所有键位（A0到C8）
        for (let octave = 0; octave <= 8; octave++) {
            octaveNotes.forEach(note => {
                if (
                    (octave === 0 && ['A', 'B'].includes(note)) || // A0-B0
                    (octave >= 1 && octave <= 7) || // 完整的1-7八度
                    (octave === 8 && ['C'].includes(note)) // C8
                ) {
                    allWhiteKeys.push({
                        key: `${note}${octave}`,
                        label: `${note}${octave}`
                    });
                }
            });
        }

        // 生成黑键
        for (let i = 0; i < allWhiteKeys.length - 1; i++) {
            const currentNote = allWhiteKeys[i].key[0];
            const currentOctave = allWhiteKeys[i].key.slice(-1);

            if (!['E', 'B'].includes(currentNote)) {
                allBlackKeys.push({
                    key: `${currentNote}#${currentOctave}`,
                    label: `${currentNote}#${currentOctave}`
                });
            } else {
                allBlackKeys.push({ key: '', label: '' });
            }
        }

        // 计算最大滑动值
        setMaxSliderValue(allWhiteKeys.length - 19) // 19是可见白键数量

        return { allWhiteKeys, allBlackKeys };
    };

    const visibleKeys = useMemo(() => {
        const { allWhiteKeys, allBlackKeys } = generateAllKeys();
        const keysPerView = 19;

        // 使用 keyboardOffset 作为起始索引
        let startIndex = keyboardOffset;

        return {
            whiteKeys: allWhiteKeys.slice(startIndex, startIndex + keysPerView),
            blackKeys: allBlackKeys.slice(startIndex, startIndex + keysPerView - 1)
        };
    }, [keyboardOffset])

    // 添加判断是否为最后一个键的函数
    const isLastKey = (noteKey) => {
        const lastKey = visibleKeys.whiteKeys[visibleKeys.whiteKeys.length - 1].key;
        return noteKey === lastKey;
    };

    // 修改handleDragMove函数，使其同步更新滑块值
    const handleDragMove = (e) => {
        if (!isDragging) return;

        const diff = (e.clientX - startX) / 30;
        const newOffset = Math.round(startOffset - diff);

        // 限制拖动范围
        const boundedOffset = Math.max(0, Math.min(newOffset, maxSliderValue));
        setKeyboardOffset(boundedOffset)
         // 同步更新滑块值
        setKeyboardSliderValue(boundedOffset)
    };
    // 添加拖动事件处理函数
    const handleDragStart = (e) => {
        isDragging = true;
        setStartX(e.clientX)
        setStartOffset(keyboardOffset)
    };

    const handleDragEnd = () => {
        isDragging = false;
    };

    // 添加播放音符的方法
    const playNote = (note) => {
        if (sampler) {
            sampler.triggerAttackRelease(note, '8n');
        }
    };

    // 修改handleSliderChange函数，使其同步更新滑块值
    const handleSliderChange = (value) => {
        setKeyboardOffset(value)
        setKeyboardSliderValue(value)
    };

    const getSampleData = async () => {
        sampler = await getSampler()
    };


    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        getSampleData()
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }

    }, [])

    return (
        <Container>
            <ToolBar
                timeSignature = { timeSignature }
                setTimeSignature = { setTimeSignature }
                onSetModel={setIsEditModel}/>
            { isEditModel
                && <ScoreArea
                    timeSignature = { timeSignature }
                    notes={notes}
                    editLinePosition={editLinePosition}
                    currentPosition={currentPosition}
                    noteLeft={noteLeft}
                    getKeySignature={getKeySignature}
                    onStaffDoubleClick={handleStaffDoubleClick}
                    onNoteValueChange={setSelectedNoteValue}
                />
            }
            <ChordControl
                currentKey={selectedKey}
                onKeySelect={setSelectedKey}
            />
            <div className="keyboard-slider">
                <Slider
                    value={keyboardSliderValue}
                    min={0}
                    max={maxSliderValue}
                    onChange={handleSliderChange}
                />
            </div>
        </Container>
    )
}

export default Melody;

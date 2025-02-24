import React, { useState } from 'react';
import { Switch, Select, InputNumber, Button } from 'antd';
import { styled } from 'styled-components'
import Metronome from "@/components/Melody/components/metronome";

interface ToolbarProps {
    onSaveScore?: () => void;
    onExportMIDI?: () => void;
    onPlayToggle?: () => void;
    onSetModel?: (checked: boolean) => void;
    timeSignature: string,
    setTimeSignature: (value: string) => void;
    isPlaying?: boolean;
}

interface MetronomeDefaults {
    bpm: number;
    beat: string;
    note: string;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  background-color: #c8e8f3;

  .left-tools, .right-tools {
    display: flex;
    align-items: center;

    > * {
      margin-right: 10px;
    }

    > *:last-child {
      margin-right: 0;
    }
  }
`

const Toolbar: React.FC<ToolbarProps> = ({
         onSaveScore,
         onExportMIDI,
         onPlayToggle,
         onSetModel,
         timeSignature, setTimeSignature,
         isPlaying
     }) => {
    // 状态管理
    const [isEditMode, setIsEditMode] = useState(false);
    const [tempo, setTempo] = useState(60);
    const [instrument, setInstrument] = useState('piano');

    // 节拍器默认值
    const metronomeDefaults: MetronomeDefaults = {
        bpm: tempo,
        beat: timeSignature.split('/')[0],
        note: timeSignature.split('/')[1]
    };

    const toggleModel = (checked: boolean) => {
        setIsEditMode(checked);
        onSetModel && onSetModel(checked)
    }

    return (
        <Container>
            <div className="left-tools">
                <Switch
                    checked={isEditMode}
                    onChange={toggleModel}
                    checkedChildren="创作模式"
                    unCheckedChildren="预览模式"
                />
                <Select
                    defaultValue={timeSignature as any}
                    onChange={setTimeSignature}
                    style={{ width: 100 }}
                    placeholder="拍号"
                >
                    <Select.Option value="2/4">2/4</Select.Option>
                    <Select.Option value="3/4">3/4</Select.Option>
                    <Select.Option value="4/4">4/4</Select.Option>
                    <Select.Option value="6/8">6/8</Select.Option>
                </Select>
                <InputNumber<number> // 显式指定泛型类型为 number
                    value={tempo}
                    onChange={(value: number) => setTempo(value ?? 60)} // 使用 ?? 处理 null/undefined
                    min={20}
                    max={400}
                    size="large"
                    placeholder="速度"
                />
                <Select
                    value={instrument as any}
                    onChange={setInstrument}
                    style={{ width: 120 }}
                    placeholder="音色"
                >
                    <Select.Option value="piano">钢琴</Select.Option>
                    <Select.Option value="strings">弦乐乐团</Select.Option>
                    <Select.Option value="woodwinds">木管乐团</Select.Option>
                </Select>
                <div>
                    <span>节拍器  </span>
                    <Metronome
                        button
                        defaults={metronomeDefaults}
                    />
                </div>
            </div>
            <div className="right-tools">
                <Button type="primary" onClick={onPlayToggle}>
                    {isPlaying ? "暂停" : "播放"}
                </Button>
                <Button onClick={onSaveScore}>保存</Button>
                <Button onClick={onExportMIDI}>导出MIDI</Button>
            </div>
        </Container>
    );
};

export default Toolbar;

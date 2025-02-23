import React, { useState } from 'react';
import { Button, Modal, Radio, Space } from 'antd';

interface KeyOption {
    label: string;
    value: string;
}

interface ChordControlProps {
    currentKey: string;
    onKeySelect: (key: string) => void;
}

const ChordControl: React.FC<ChordControlProps> = ({ currentKey, onKeySelect }) => {
    const [showKeyDialog, setShowKeyDialog] = useState(false);
    const [selectedKey, setSelectedKey] = useState(currentKey);

    // 定义大调和小调的选项
    const majorKeys: KeyOption[] = [
        { label: "C", value: "major_C" },
        { label: "C#", value: "major_C#" },
        { label: "Db", value: "major_Db" },
        { label: "D", value: "major_D" },
        { label: "Eb", value: "major_Eb" },
        { label: "E", value: "major_E" },
        { label: "F", value: "major_F" },
        { label: "F#", value: "major_F#" },
        { label: "G", value: "major_G" },
        { label: "Ab", value: "major_Ab" },
        { label: "A", value: "major_A" },
        { label: "Bb", value: "major_Bb" },
        { label: "B", value: "major_B" },
        { label: "Cb", value: "major_Cb" },
    ];

    const minorKeys: KeyOption[] = [
        { label: "A", value: "minor_A" },
        { label: "Bb", value: "minor_Bb" },
        { label: "B", value: "minor_B" },
        { label: "C", value: "minor_C" },
        { label: "C#", value: "minor_C#" },
        { label: "D", value: "minor_D" },
        { label: "D#", value: "minor_D#" },
        { label: "E", value: "minor_E" },
        { label: "F", value: "minor_F" },
        { label: "F#", value: "minor_F#" },
        { label: "G", value: "minor_G" },
        { label: "G#", value: "minor_G#" },
    ];

    // 格式化显示的调性
    const formattedKey = currentKey.replace('_', ' ').replace(/^(\w+)\s(\w+)$/, (_, type, note) => {
        return `${note} ${type === 'major' ? '大调' : '小调'}`;
    });

    // 处理调性选择
    const handleKeySelect = (key: string) => {
        setSelectedKey(key);
        onKeySelect(key);
        setShowKeyDialog(false);
    };

    return (
        <div className="chord-control">
            <div className="chord-settings">
                <Space>
                    <span>调性：</span>
                    <Button onClick={() => setShowKeyDialog(true)}>
                        {formattedKey}
                    </Button>

                    <Modal
                        title="选择调性"
                        open={showKeyDialog}
                        onCancel={() => setShowKeyDialog(false)}
                        footer={null}
                        width={600}
                    >
                        <div className="key-section">
                            <h4>大调</h4>
                            <Radio.Group
                                value={selectedKey}
                                onChange={(e) => handleKeySelect(e.target.value)}
                                buttonStyle="solid"
                            >
                                <Space wrap>
                                    {majorKeys.map((key) => (
                                        <Radio.Button key={key.value} value={key.value}>
                                            {key.label}
                                        </Radio.Button>
                                    ))}
                                </Space>
                            </Radio.Group>
                        </div>

                        <div className="key-section" style={{ marginTop: '20px' }}>
                            <h4>小调</h4>
                            <Radio.Group
                                value={selectedKey}
                                onChange={(e) => handleKeySelect(e.target.value)}
                                buttonStyle="solid"
                            >
                                <Space wrap>
                                    {minorKeys.map((key) => (
                                        <Radio.Button key={key.value} value={key.value}>
                                            {key.label}
                                        </Radio.Button>
                                    ))}
                                </Space>
                            </Radio.Group>
                        </div>
                    </Modal>
                </Space>
            </div>
        </div>
    );
};

export default ChordControl;

import React, { useState } from 'react';
import { Modal, Select } from 'antd';
import styled from 'styled-components';

interface BeatPickerProps {
    show?: boolean;
    value?: [string, string];
    onClose?: () => void;
    onSure?: (value: [string, string]) => void;
}

const columns = {
    beats: [
        { text: "1", value: "1" },
        { text: "2", value: "2" },
        { text: "3", value: "3" },
        { text: "4", value: "4" },
        { text: "5", value: "5" },
        { text: "6", value: "6" },
        { text: "7", value: "7" },
        { text: "8", value: "8" },
        { text: "9", value: "9" },
        { text: "10", value: "10" },
        { text: "11", value: "11" },
        { text: "12", value: "12" },
        { text: "13", value: "13" },
        { text: "14", value: "14" },
        { text: "15", value: "15" },
        { text: "16", value: "16" },
    ],
    notes: [
        { text: "1", value: "1" },
        { text: "2", value: "2" },
        { text: "4", value: "4" },
        { text: "8", value: "8" },
        { text: "16", value: "16" },
        { text: "32", value: "32" },
    ],
};

const StyledModal = styled(Modal)`
  .ant-modal-content {
    position: fixed;
    bottom: 0;
    width: 100%;
    margin: 0;
    padding: 0;
    border-radius: 8px 8px 0 0;
  }

  .ant-modal-body {
    padding: 16px;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  color: #000;
`;

const SelectContainer = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  
  .ant-select {
    width: 120px;
  }
`;
type OptionType = Select["options"][number];

const BeatPicker: React.FC<BeatPickerProps> = ({
       show = false,
       value = ['4', '4'],
       onClose,
       onSure,
   }) => {

    const initialValue: [string, string] = value || ['4', '4'];
    const [selectedValue, setSelectedValue] = useState<[string, string]>(initialValue);

    const handleConfirm = () => {
        onSure?.(selectedValue);
        onClose?.();
    };

    return (
        <StyledModal
            open={show}
            onCancel={onClose}
            footer={null}
            closable={false}
            width="100%"
            style={{ top: 'auto' }}
        >
            <Title>
                <span onClick={onClose}>取消</span>
                <span>节拍/音符</span>
                <span onClick={handleConfirm}>确定</span>
            </Title>
            <SelectContainer>
                <Select
                    value={selectedValue[0] as any}
                    onChange={(value) => setSelectedValue([value, selectedValue[1]])}
                    options={columns.beats.map(item => ({ label: item.text, value: item.value })) as OptionType[]}
                />
                <Select
                    value={selectedValue[1] as any}
                    onChange={(value) => setSelectedValue([selectedValue[0], value])}
                    options={columns.notes.map(item => ({ label: item.text, value: item.value })) as OptionType[]}
                />
            </SelectContainer>
        </StyledModal>
    );
};

export default BeatPicker;

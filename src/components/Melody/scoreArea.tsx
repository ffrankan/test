import React, { useState, useCallback, useMemo } from 'react';
import { Radio } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { styled } from 'styled-components'

interface Note {
    value: string;
    position: number;
    staffPosition: number;
    symbol: string;
}

interface NoteValue {
    value: string;
    label: string;
}

interface KeySignature {
    count: number;
    type: 'sharp' | 'flat' | 'none';
}

interface ScoreAreaProps {
    timeSignature: string;
    notes: Note[];
    //availableNoteValues: NoteValue[];
    editLinePosition: number;
    currentPosition: number;
    noteLeft: number;
    getKeySignature: KeySignature;
    // onStaffClick: (event: React.MouseEvent) => void;
    onStaffDoubleClick: (event: React.MouseEvent) => void;
    onNoteValueChange: (value: string) => void;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
    padding: 10px;
    .note-values {
      height: fit-content;
      .ant-radio-group {
        width: 100%;
        display: flex;
        justify-content: left;
        align-items: center;
        label {
          width: 4%;
          height: 100%;
          margin-right: 10px;
        }
      }
      
      
    }
`

const ScoreArea: React.FC<ScoreAreaProps> = ({
     timeSignature,
     notes,
     //availableNoteValues,
     editLinePosition,
     currentPosition,
     noteLeft,
     getKeySignature,
     //onStaffClick,
     onStaffDoubleClick,
     onNoteValueChange,
 }) => {
    // 工具函数
    const getNoteImageStyle = useCallback((noteValue: string) => {
        switch (noteValue) {
            case 'dotted-half':
            case 'dotted-quarter':
                return {
                    width: '30px',
                    height: '40px',
                };
            case 'whole':
                return {
                    width: '40px',
                    height: '25px',
                };
            default:
                return {
                    width: '20px',
                    height: '40px',
                };
        }
    }, []);

    const getTrebleAccidentalPosition = useCallback((index: number, type: 'sharp' | 'flat' | 'none') => {
        const sharpPositions = [
            '-2px',   // F线
            '10px',   // C线
            '-8px',   // G线
            '4px',    // D线
            '-14px',  // A线
            '-2px',   // E线
            '10px'    // B线
        ];
        const flatPositions = [
            '10px',   // B线
            '-2px',   // E线
            '16px',   // A线
            '4px',    // D线
            '22px',   // G线
            '10px',   // C线
            '28px'    // F线
        ];

        return type === 'sharp'
            ? sharpPositions[index - 1]
            : flatPositions[index - 1];
    }, []);

    const getExtraLineClass = useCallback((staffPosition: number) => {
        if (staffPosition < 0 || staffPosition > 48) {
            return 'extra-line';
        }
        return '';
    }, []);

    const getNoteRotation = useCallback((staffPosition: number) => {
        return staffPosition > 24 ? 'rotate(180deg)' : 'none';
    }, []);

    const clefBeatStyle = useMemo(() => ({
        left: '50px'
    }), []);

    const handleNoteValueChange = (e: RadioChangeEvent) => {
        onNoteValueChange(e.target.value);
    };

    const availableNoteValues = useCallback((): NoteValue[] => {
        switch (timeSignature) {
            case "2/4":
                return [
                    { label: "/image/note/二分音符.png", value: "half" },
                    { label: "/image/note/四分音符.png", value: "quarter" },
                    { label: "/image/note/八分音符.png", value: "eighth" },
                ];
            case "3/4":
                return [
                    { label: "/image/note/符点二分音符.png", value: "dotted-half" },
                    { label: "/image/note/二分音符.png", value: "half" },
                    { label: "/image/note/四分音符.png", value: "quarter" },
                    { label: "/image/note/八分音符.png", value: "eighth" },
                ];
            case "4/4":
                return [
                    { label: "/image/note/全音符.png", value: "whole" },
                    { label: "/image/note/符点二分音符.png", value: "dotted-half" },
                    { label: "/image/note/二分音符.png", value: "half" },
                    { label: "/image/note/四分音符.png", value: "quarter" },
                    { label: "/image/note/八分音符.png", value: "eighth" },
                ];
            case "6/8":
                return [
                    { label: "/image/note/符点二分音符.png", value: "dotted-half" },
                    { label: "/image/note/符点四分音符.png", value: "dotted-quarter" },
                    { label: "/image/note/八分音符.png", value: "eighth" },
                ];
            default:
                return [];
        }
    }, [timeSignature]);



    return (
        <Container>
            <div className="note-values">
                <Radio.Group onChange={handleNoteValueChange}>
                    {availableNoteValues().map(note => (
                        <Radio.Button key={note.value} value={note.value}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <img src={note.label} style={getNoteImageStyle(note.value)}  alt={note.label}/>
                            </div>
                        </Radio.Button>
                    ))}
                </Radio.Group>
            </div>
            <div
                className="score-content"
                //onClick={onStaffClick}
                onDoubleClick={onStaffDoubleClick}
            >
                <div className="staff-container">
                    <div className="treble-clef staff">
                        <div className="clef-symbol">𝄞</div>
                        <div className="key-signature" style={clefBeatStyle}>
                            {Array.from({ length: getKeySignature.count }).map((_, index) => (
                                <div
                                    key={index}
                                    className={`accidental ${getKeySignature.type}`}
                                    style={{
                                        left: `${index * 10}px`,
                                        top: getTrebleAccidentalPosition(index + 1, getKeySignature.type),
                                    }}
                                >
                                    {getKeySignature.type === 'sharp' ? '♯' : '♭'}
                                </div>
                            ))}
                        </div>
                        <div className="clef-beat" style={clefBeatStyle}>
                            <span>{timeSignature.split('/')[0]}</span>
                            <span>{timeSignature.split('/')[1]}</span>
                        </div>
                        <div className="notes-container">
                            {notes.map((note, index) => (
                                <div
                                    key={index}
                                    className={`note ${note.value} ${getExtraLineClass(note.staffPosition)}`}
                                    style={{
                                        left: `${note.position + noteLeft}px`,
                                        top: `${note.staffPosition}px`,
                                        transform: getNoteRotation(note.staffPosition),
                                    }}
                                >
                                    <span className="note-symbol">{note.symbol}</span>
                                </div>
                            ))}
                            <div
                                className="edit-line"
                                style={{
                                    left: `${(editLinePosition === notes.length ? currentPosition : notes[editLinePosition]?.position || 0) + noteLeft}px`,
                                }}
                            />
                        </div>
                        <div className="staff-lines" />
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default ScoreArea;

import React, { FC } from'react';
import { styled } from 'styled-components';
import ToolBar from './toolBar';
import ScoreArea from './scoreArea';
import ChordControl from './chordControl';

const Melody = () => {

    const Container = styled.div`
    `

    return (
        <Container>
            <ToolBar></ToolBar>
            <ScoreArea></ScoreArea>
            <ChordControl></ChordControl>
        </Container>
    )
}

export default Melody;

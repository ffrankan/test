import React, { FC } from'react';
import { styled } from 'styled-components';
import ToolBar from './components/toolbar';
import ScoreArea from './components/scoreArea';
import ChordControl from './components/chordControl';

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

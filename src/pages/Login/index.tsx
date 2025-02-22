import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { styled } from "styled-components"; // 可以创建此文件来编写样式

const Container = styled.div`
    

`
const Login: React.FC = () => {
    const [isAccountLogin, setIsAccountLogin] = useState(true);
    return (
        <Container>

        </Container>
    );
};

export default Login;

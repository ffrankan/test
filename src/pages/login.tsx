import { useNavigate } from 'react-router-dom';
import { styled } from "styled-components";

import { Button } from 'antd';
import { getToken } from "@/router/loader";

const Wrapper = styled.div`
  width: fit-content;
  background-color: darkseagreen;
`

const Login = () => {
  const navigation = useNavigate();

  const login = async () => {
      const token = await getToken()
      localStorage.setItem('token', String(token))
      navigation('/user')
  }

  return (
    <Wrapper>
      <Button type="primary" onClick={ login }>
        登录
      </Button>
    </Wrapper>
  );
};



export default Login;



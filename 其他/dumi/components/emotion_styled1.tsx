import React, { useState } from "react";
import styled from "@emotion/styled";

// 写法一
const Container = styled.div`
  display: flex;
  justify-content: center;
`;

// 写法二
const Div_1 = styled.div({
  color: 'red'
})

// 写法三
const H1 = styled('h1')(
  {
    fontSize: '24px',
    fontWeight: 'lighter'
  },
  props => ({ color: props.color || '#333' })
)

export default function Index() {
  const [isRegister, setIsRegister] = useState(false);
  const [isRegisterStyled, setIsRegisterStyled] = useState(false);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={() => setIsRegister(!isRegister)}>
          原生-切换到{isRegister ? "登录" : "注册"}
        </button>
      </div>
      <hr />
      <Container>
        <button onClick={() => setIsRegisterStyled(!isRegisterStyled)}>
          styled-切换到{isRegisterStyled ? "登录" : "注册"}
        </button>
      </Container>
    </div>
  );
}

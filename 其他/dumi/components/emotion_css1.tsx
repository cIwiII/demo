import React from 'react';
import { css } from '@emotion/css';

const styles = css`
  color: red;
`;

function useStyle(){
  return {
    index:css`
      color: red;
    `
  }
}

export default () => {

  const style = useStyle();

  return (
    <>
      <div className={styles}>变量</div>
      <div className={style.index}>方法</div>
      <div className={css`color: red;`}>元素</div>
    </>
  );
};

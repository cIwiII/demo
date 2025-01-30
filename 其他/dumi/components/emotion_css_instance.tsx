import React from 'react';
import createEmotion from '@emotion/css/create-instance';

export const {
  flush,
  hydrate,
  cx,
  merge,
  getRegisteredStyles,
  injectGlobal,
  keyframes,
  css,
  sheet,
  cache
} = createEmotion({
  // 必须配置 prefix，增大 n * 1 个字节的体积
  key: 'x',
  speedy: false,
})

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

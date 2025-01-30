
import { css } from '@emotion/react';
import React from 'react';


const style = css`
  color: hotpink;
`;

export default () => {
  return <div>123123</div>
}

// const SomeComponent = ({ children }) => (
//   <div css={style}>
//     Some hotpink text.
//     {children}
//   </div>
// );

// const anotherStyle = css({
//   textDecoration: 'underline',
// });

// const AnotherComponent = () => <div css={anotherStyle}>Some text with an underline.</div>;

// const Meger = () => {
//   return (
//     <SomeComponent>
//       <AnotherComponent />
//     </SomeComponent>
//   );
// };


function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
}
const element = (
  <h1>
      Hello, {formatName(user)}!
  </h1>
)
ReactDOM.render(
  element,
  document.getElementById('react1')
)

// jsx
const elementf = (
  <span className="greeting">
    哈喽 哈喽 我是笨笨
  </span>
);
// jsx,转义为如下结构，最终转换为“React 元素（对象结构树）
const elementF = React.createElement(
  'span',
  {className: 'greating'},
  '哈喽 哈喽 我是笨笨'
);
ReactDOM.render(
  elementF, 
  document.getElementById('react2')
)


let tickTimer = null;
function tick() {
  if (tickTimer) {
      clearInterval(tickTimer)
  }
  const elementE = (
      <div>
          <h1>Hello, world</h1>
          <h2>It is {new Date().toLocaleDateString()}.</h2>
      </div>
  );
  console.log('1111111111', new Date());
  ReactDOM.render(elementE, document.getElementById('react3'));
}

tickTimer = setInterval(tick, 1000)


import React, { useTransition, useState } from "react";

function Transition() {
  const [isPending, startTransition] = useTransition(10000);
  const [count, setCount] = useState(0);

  function handleClick() {
    let cout = 0;
    startTransition(() => {
      while (cout > 150) {
        cout++;
        console.log(cout)
      }
      setCount(c => c + 1);
    });
  }

  return (
    <div>
      {isPending && (
        <>
          <React.Suspense fallback='Loading results...'>123</React.Suspense>
        </>
      )}
      <button onClick={handleClick}>点击执行handleClick: {count}</button>
    </div>
  );
}
function Transition2() {
  const [value, setValue] = useState('');
  const [searchQuery, setSearchQuery] = useState([]);
  const [loading, startTransition] = useTransition(2000);
 
  console.log(typeof loading)
  const handleChange = (e) => {
    // 立即更新
    setValue(e.target.value);
    // 延迟更新
    startTransition(() => {
      setSearchQuery(Array(20000).fill(e.target.value));
    });
  };
 
  return (
    <div className="App">
      <input value={value} onChange={handleChange} />
      {loading ? (
        <p>loading...</p>
      ) : (
        searchQuery.map((item, index) => <p key={index}>{index}{item}</p>)
      )}
    </div>
  );
}

export default Transition2
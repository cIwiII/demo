import React, { useId, useEffect } from "react";

function Checkbox() {
  const id = useId();
  const id2 = useId();
  return (
    <>
      <label htmlFor={id}>Do you like React?</label>
      <input id={id} type='checkbox' name='react' />
      <br />
      <label htmlFor={id2 + "-firstName"}>First Name</label>
      <input id={id2 + "-firstName"} type='text' />
      <br />
      <label htmlFor={id + "-lastName"}>Last Name</label>
      <div>
        <input id={id + "-lastName"} type='text' />
      </div>
    </>
  );
}

export default Checkbox;

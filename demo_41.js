import React, { useCallback } from 'react';
import ReactDOM from "react-dom";
import debounce from 'debounce';

function App() {

  const changeCode = useCallback(debounce(async (newCode) => {
    console.log(newCode);
  }, 600), []);

  return (
    <>
      <input
        placeholder='请输入'
        onChange={(e) => {
          e.persist();
          changeCode(e.target.value);
        }}
      />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

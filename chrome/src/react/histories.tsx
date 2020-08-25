import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>DMM Hitory</h1>
      <p>You clicked {count} times</p>
      <button onClick={(): void => setCount(count + 1)}>click</button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));

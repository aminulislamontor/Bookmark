import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Tree from 'react-animated-tree';

const treeStyles = {
  position: 'absolute',
  top: 40,
  left: 40,
  color: 'black',
  fill: 'black',
  width: '100%'
}

const TreeApp = () => (
  <Tree content="DashBoard" open style={treeStyles}>
    <Tree content="App Menu">
      <App />
      </Tree>
      <Tree content="Sub Menu">
        <App />
      </Tree>
      <Tree content="Link" >
      <App />
        </Tree>
  </Tree>
)



ReactDOM.render(
  <React.StrictMode>
    <h3 className="m-3 d-flex justify-content-center">
      BookMark
    </h3>
    <TreeApp />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

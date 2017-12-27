import * as React from "react";
import {Component} from "react";
import {render} from "react-dom";
import Button from 'antd/lib/button';
import 'antd/lib/button/style/index.css';
import {join} from 'lodash-es';
import './index.scss';

class App extends Component {
  render() {
    return (
      <Button>{join(['Hello', 'World1'], ',')}</Button>
    )
  }
}

render(<App/>, document.getElementById('app'));

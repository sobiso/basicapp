
import {AppRegistry} from 'react-native';
import App from './App/Containers/App'
import {name as appName} from './app.json';

  
console.disableYellowBox = true;

if (!__DEV__) {
    // console.log = () => {};
  }


App()

console.log("hello world");

var hello = require('./module1');
hello();

import hello2 from './module2';
hello2();

import hello4 from './module4';

new hello4().sayHello();

import('./sub-module1').then((module) => {
  module.hello5()
})

import '../css/test1.css';
import '../css/test2.scss';

import imageUrl from '../images/joinus-icons.png';
console.log(imageUrl);
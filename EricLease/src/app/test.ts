import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react';

const helloWorld = (text = "Hello world") => {
    const element = document.createElement("div");

    element.innerHTML = text;

    return element;
};

document.body.appendChild(helloWorld());

console.log('hey ho');
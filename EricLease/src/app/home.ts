'use strict';

function boot() {
    const text = document.createTextNode('Hello world!');
    const content = document.getElementById('content');
    
    if (content) {
        content.appendChild(text);
    }
}

boot();
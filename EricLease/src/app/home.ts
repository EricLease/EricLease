import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Vue, { VNode } from 'vue';

const Component = Vue.extend({});
//const Component = Vue.extend({
//    data() {
//        return {
//            msg: 'Hello'
//        }
//    },
//    methods: {
//        // need annotation due to `this` in return type
//        greet(): string {
//            return this.msg + ' world'
//        }
//    },
//    computed: {
//        // need annotation
//        greeting(): string {
//            return this.greet() + '!'
//        }
//    },
//    // `createElement` is inferred, but `render` needs return type
//    render(createElement): VNode {
//        return createElement('div', this.greeting)
//    }
//})

const helloWorld = (text = "Hello world") => {
    const element = document.createElement("div");

    //element.classList.add('text-danger');
    element.innerHTML = text;

    return element;
};

document.body.appendChild(helloWorld());

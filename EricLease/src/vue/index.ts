import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import Vue from 'vue';
import HelloComponent from './components/Hello.vue';

let v = new Vue({
    el: '#app',
    template: `
    <div>
        Name: <input v-model="name" type="text">
        <hello-component :name="name" :initialEnthusiasm="5" />
    </div>
    `,
    data: { name: 'World' },
    components: {
        HelloComponent
    }
});
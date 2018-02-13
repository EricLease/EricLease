import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import Vue from "vue";

let v = new Vue({
    el: "#app",
    template: `
    <div>
        <div>Hello {{name}}! <i class="fa fa-thumbs-up"></i></div>
        Name: <input v-model="name" type="text">
    </div>`,
    data: {
        name: "Eric"
    }
});
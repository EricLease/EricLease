import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import Vue from "vue";
import AppComponent from "./components/app.vue";

let v = new Vue({
    el: "#app",
    template: `<app-component />`,
    components: {
        AppComponent
    }
});
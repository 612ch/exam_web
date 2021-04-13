import Vue from 'vue'
import axios from 'axios'
import config from './config'

axios.defaults.baseURL = config.api;
axios.defaults.timeout = 5000;

axios.interceptors.request.use(function (config) {
  return config;
})

Vue.prototype.$http = axios;

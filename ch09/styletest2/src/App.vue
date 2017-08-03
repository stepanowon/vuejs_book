<template>
  <div id="app">
    <h2>{{msg}}</h2>
    <child1 />
    <child2 />
    <module1 />
  </div>
</template>

<script>
import Child1 from './components/Child1.vue'
import Child2 from './components/Child2.vue'
import Module1 from './components/Module1.vue'

console.log(Module1);

export default {
  name: 'app',
  components : { Child1, Child2, Module1 },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

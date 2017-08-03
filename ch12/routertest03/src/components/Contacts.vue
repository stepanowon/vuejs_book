<template>
  <div>
    <h1>연락처</h1>
    <div class="wrapper">
        <div class="box" v-for="c in contacts" :key="c.no">
            <!--<router-link v-bind:to="'/contacts/'+c.no">{{c.name}}</router-link>-->
            <router-link v-bind:to="{ name:'contactbyno', params:{no:c.no}}">{{c.name}}</router-link>
        </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import contactlist from '../ContactList';

export default {
  name : "contacts",
  data : function() {
      return {
          contacts : contactlist.contacts
      }
  }
}
</script>
<style>
.wrapper { background-color:#fff; clear:both; display:table; }
.box { float:left; background-color:aqua; border-radius:5px;
    padding: 10px; margin:3px; text-align:center; font-size:120%;
    width:100px; font-weight:bold; }
a:link, a:visited { text-align:center; text-decoration:none;
    display:inline-block; }
</style>

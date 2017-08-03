<template>
  <div id="container">
      <div class="page-header">
         <h1 class="text-center">연락처 관리 애플리케이션</h1>
         <p>(Dynamic Component + EventBus + Axios) </p>
      </div>
      <component :is="currentView" :contact="contact"></component>
      <contactList :contactlist="contactlist"></contactList>
      <paginate ref="pagebuttons"
        :page-count="totalpage"
        :page-range="7"
        :margin-pages="3"
        :click-handler="pageChanged"
        :prev-text="'이전'"
        :next-text="'다음'"
        :container-class="'pagination'"
        :page-class="'page-item'">
      </paginate>
  </div>
</template>

<script>
import Vue from 'vue';

import ContactList from './components/ContactList';
import AddContact from './components/AddContact';
import UpdateContact from './components/UpdateContact';
import UpdatePhoto from './components/UpdatePhoto';

import CONF from './Config.js';
import eventBus from './EventBus.js';
import Paginate from 'vuejs-paginate';

export default {    
    name: 'app',
    components : { ContactList, AddContact, UpdateContact, UpdatePhoto, Paginate },
    data: function() {
        return { 
            currentView : null, 
            //mode : 'add',
            contact : { no:0, name:'', tel:'', address:'', photo:'' },
            contactlist : {
                pageno:1, pagesize: CONF.PAGESIZE, totalcount:0, contacts:[]
            }
        }
    },
    computed : {
        totalpage : function() {
            return Math.floor((this.contactlist.totalcount - 1) / this.contactlist.pagesize) + 1;
        }
    },
    mounted : function() {
        this.fetchContacts();
        eventBus.$on("cancel", () => {
            this.currentView = null;
        });
        eventBus.$on("addSubmit", (contact) => {
            this.currentView = null;
            this.addContact(contact);
        });
        eventBus.$on("updateSubmit", (contact) => {
            this.currentView = null;
            this.updateContact(contact);
        });
        eventBus.$on("addContactForm", () => {
            this.currentView = 'addContact';
        });
        eventBus.$on("editContactForm", (no) => {
            this.fetchContactOne(no)
            this.currentView = 'updateContact';
        });
        eventBus.$on("deleteContact", (no) => {
            this.deleteContact(no);
        });
        eventBus.$on("editPhoto", (no) => {
            this.fetchContactOne(no)
            this.currentView = 'updatePhoto';
        });
        eventBus.$on("updatePhoto", (no, file) => {
            if (typeof file !=='undefined') {
                this.updatePhoto(no, file);
            }
            this.currentView = null;
        });      
    },
    methods : {
        pageChanged : function(page) {
            this.contactlist.pageno = page;
            this.fetchContacts();
        },
        fetchContacts : function() {
            this.$axios.get(CONF.FETCH, {
                params : { 
                    pageno:this.contactlist.pageno, 
                    pagesize:this.contactlist.pagesize 
                } 
            })
            .then((response) => {
                this.contactlist = response.data;
            })
            .catch((ex)=> {
                console.log('fetchContacts failed', ex);
                this.contactlist.contacts = [];
            })
        },
        addContact : function(contact) {
            this.$axios.post(CONF.ADD,  contact)
            .then((response) => {
                this.contactlist.pageno = 1;
                this.fetchContacts();
            })
            .catch((ex)=> {
                console.log('addContact failed : ', ex);
            })
        },
        updateContact : function(contact) {
            this.$axios.put(CONF.UPDATE.replace("${no}", contact.no), contact)
            .then((response) => {
                this.fetchContacts();
            })
            .catch((ex) => {
                console.log('updateContact failed : ', ex);
            })
        },
        fetchContactOne : function(no) {
            this.$axios.get(CONF.FETCH_ONE.replace("${no}", no))
            .then((response) => {
                this.contact = response.data;
            })
            .catch((ex)=> {
                console.log('fetchContactOne failed', ex);
            })
        },
        deleteContact : function(no) {
            this.$axios.delete(CONF.DELETE.replace("${no}", no))
            .then((response) => {
                this.fetchContacts();
            })
            .catch((ex) => {
                console.log('delete failed', ex);
            })
        },
        updatePhoto : function(no, file) {
            var data = new FormData();
            data.append('photo', file);

            this.$axios.post(CONF.UPDATE_PHOTO.replace("${no}", no), data)
            .then((response) => {
                this.fetchContacts();
            })
            .catch((ex) => {
                console.log('updatePhoto failed', ex);
            });
        }
    },
    watch : {
        ['contactlist.pageno'] : function() {
            this.$refs.pagebuttons.selected = this.contactlist.pageno-1;
        }
    },

}
</script>

<style scoped>
@import url("https://cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.css");

#container {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

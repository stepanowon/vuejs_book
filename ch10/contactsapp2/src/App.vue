<template>
  <div id="app">
      <h2>연락처 관리 애플리케이션</h2>
      <component :is="currentView" :contact="contact" :mode="mode"></component>
      <contactList :contacts="contactlist.contacts" :mode="mode"></contactList>
  </div>
</template>

<script>
import AddContact from './components/AddContact'
import UpdateContact from './components/UpdateContact'
import UpdatePhoto from './components/UpdatePhoto'
import ContactList from './components/ContactList'

import eventBus from './EventBus.js';
import axios from 'axios';

export default {
  name: 'app',
  created : function() {
    this.fetchContacts();
    eventBus.$on("cancel", () => {
      this.changeCurrentView(null);
    });
    eventBus.$on("addForm",() => {
      this.mode = 'add';
      this.changeCurrentView('addContact');
    });
    eventBus.$on("addContact", (contact) => {
      this.addContact(contact);
      this.changeCurrentView(null);
    });
    eventBus.$on("editForm",(no) => {
      this.mode = 'update';
      this.fetchContactOne(no);
      this.changeCurrentView('updateContact');
    });
    eventBus.$on("updateContact", (contact) => {
      this.updateContact(contact);
      this.changeCurrentView(null);
    });
    eventBus.$on("deleteContact", (no) => {
      this.deleteContact(no);
    });
    eventBus.$on("editPhoto", (no)=>{
      this.fetchContactOne(no);
      this.changeCurrentView('updatePhoto');
    });
    eventBus.$on("updatePhoto", (no, file)=> {
      this.mode = 'update';
      this.updatePhoto(no, file);
      this.changeCurrentView(null);
    });
  },
  components : { AddContact, UpdateContact, ContactList, UpdatePhoto },
  data: function() {
    return { 
        currentView : null, 
        contact : null,
        mode : '',
        contactlist : {}
    }
  },
  methods : {
    changeCurrentView : function(view) {
      this.currentView = view;
    },
    fetchContacts : function() {
      axios.get("/api/contacts")
      .then((response) => {
          this.contactlist= response.data;
      })
      .catch((ex)=> {
          console.log("fetchContacts failed : ", ex);
      })
    },
    fetchContactOne : function(no) {
      axios.get("/api/contacts/"+no)
      .then((response)=> {
        this.contact = response.data;  
      })
      .catch((ex)=> {
        console.log("fetchContactOne failed : ", ex);
      })
    },
    addContact : function(contact) {
      axios.post('/api/contacts',  contact)
      .then((response) => {
          this.fetchContacts();
      })
      .catch((ex)=> {
          console.log("addContact failed : " , ex);
      })
    },
    updateContact : function(contact) {
      axios.put('/api/contacts/' + contact.no, contact)
      .then((response) => {
          this.fetchContacts();
      })
      .catch((ex) => {
          console.log("update failed : " + ex);
      })
    },
    deleteContact : function(no) {
      axios.delete("/api/contacts/" + no)
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

        axios.post('/api/contacts/' + no + '/photo', data)
        .then((response) => {
            this.fetchContacts();
        })
        .catch((ex) => {
            console.log('updatePhoto failed', ex);
        });
    }
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h2 {
  text-decoration: underline;
}
</style>

<template>
    <div>
        <contactForm mode="update" :contact="contact" />
    </div>
</template>

<script>
import ContactForm from './ContactForm.vue';

export default {
    name : "updateContact",
    components : { ContactForm },
    props : {
        mode : { type : String },
        contact : {
            type : Object,
            default : function() {
                return { no:'', name:'', tel:'', address:'', photo:'' }
            }
        }
    }
}
</script>

<style>

</style>

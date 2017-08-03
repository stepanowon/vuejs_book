<template>
    <contactForm :mode="mode" />
</template>

<script>
import ContactForm from './ContactForm.vue';

export default {
    name : "addContact",
    props : ['mode'],
    components : { ContactForm }
}
</script>

<style scoped>
</style>

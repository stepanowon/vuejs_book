<template>
    <div class="child">
        X : <input type="text" v-model="x" /><br />
        Y : <input type="text" v-model="y" /><br />
        <slot name="type1" :cx="x" :cy="y"></slot>
        <slot name="type2" :cx="x" :cy="y"></slot>
    </div>
</template>
<script>
export default {
    data() {
        return { x:4, y:5 };
    }
}
</script>
<style scoped>
    .child { padding:5px; border:solid 1px gray; }
</style>
<template>
  <div>
    <button v-bind:class="$style.hand"> CSS Module을 적용한 버튼 </button>
    <div :class="[$style.box, $style.border]">Hello World</div>
  </div>
</template>

<script>
export default {
    created() {
        console.log(this.$style);
    }
}
</script>

<style module>
.hand { cursor:pointer; background-color:purple; color:yellow; }
.box { width:100px; height:100px; background-color:aqua; }
.border { border:solid 1px orange; }
</style>

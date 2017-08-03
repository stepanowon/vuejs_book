<template>
  <div class="container">
    <div class="header">{{headerText}}</div>
    <div class="content">
        <slot></slot>
    </div>
    <div class="footer">{{footerText}}</div>
  </div>
</template>

<script>
export default {
    props : [ 'headerText', 'footerText' ]
}
</script>

<style scoped>
.container { width:300px; margin:10px; padding:2px;
    border:solid 1px gray; float:left; }
.header { padding:4px 20px 4px 20px; background-color: orange;
    color:aqua; text-align: center; }
.footer { padding:4px 20px 4px 20px; background-color: aqua; 
    text-align:left; }
.content { padding: 10px; height:auto; min-height: 40px; 
    text-align:left; }
</style>

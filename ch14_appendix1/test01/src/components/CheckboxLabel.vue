<template>
  <div>
    <input type="checkbox" :checked="isChecked" @change="changeStatus">
    <label>{{msg}}</label>
  </div>
</template>

<script>
export default {
    name : "checkboxLabel",
    data : function() {
        return {
            isChecked : false,
            onMsg : "선택(O)",
            offMsg : "선택(X)"
        }
    },
    computed : {
        msg : function() {
            if (this.isChecked)
                return this.onMsg;
            else 
                return this.offMsg;
        }
    },
    methods : {
        changeStatus() {
            this.isChecked = !this.isChecked;
        }
    }
}
</script>

<style>

</style>

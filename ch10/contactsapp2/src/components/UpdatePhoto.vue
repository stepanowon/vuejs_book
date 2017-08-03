<template>
<div class="modal">
    <div class="form" @keyup.esc="cancelEvent">
        <form method="post" enctype="multipart/form-data">
        <h3 class="heading">:: 사진 변경</h3>
        <div>
            <label>현재 사진</label>
            <img class="thumb" :src="contact.photo" />
        </div>
        <div>
            <label>변경하려는 사진 파일</label>
            <input ref="photofile" type="file" name="photo" class="long"  />
        </div>
        <div>
            <div>&nbsp;</div>
            <input type="button" class="button" value="변 경" @click="photoSubmit()" />
            <input type="button" class="button" value="취 소" @click="cancelEvent" />
        </div>
        </form>
    </div>
</div>
</template>

<script>
import eventBus from '../EventBus.js';

export default {
    name : "updatePhoto",
    props : [ 'contact' ],
    methods : {
        cancelEvent : function() {
            eventBus.$emit('cancel');
        },
        photoSubmit : function() {
            var file = this.$refs.photofile.files[0];
            eventBus.$emit('updatePhoto', this.contact.no, file);
        }
    }
}
</script>

<style scoped>
.modal {
    z-index:10;
    display: block; 
    position: fixed; 
    z-index: 1; 
    left: 0;
    top: 0;
    width: 100%; 
    height: 100%;
    overflow: auto; 
    background-color: rgb(0,0,0); 
    background-color: rgba(0,0,0,0.4); 
}

.form {
    z-index:10;
    background-color: white;
    margin:100px auto;
    max-width: 400px;
    min-width: 200px;
    padding: 10px 10px 10px 10px;
    font: 13px "verdana";
}
.form div {
    padding: 0;
    display: block;
    margin: 10px 0 0 0;
}
.form label{
    text-align: left;
    margin:0 0 3px 0;
    padding:0px;
    display:block;
    font-weight: bold;
}
.form input, textarea, select{
    box-sizing: border-box;
    border:1px solid #BEBEBE;
    padding: 7px;
    margin:0px;
    outline: none;  
}
.form .long{
    width: 100%;
}
.form .button{
    background: #2B798D;
    padding: 8px 15px 8px 15px;
    border: none;
    color: #fff;
}

.form .button:hover{
    background: #4691A4;
}

.form .heading{
    background: #33A17F;
    font-weight: 300;
    text-align: left;
    padding : 20px;
    color: #fff;
    margin:5px 0 30px 0;
    padding: 10px;
    min-width:200px;
    max-width:400px;
}
img.thumb { width:160px; } 
</style>

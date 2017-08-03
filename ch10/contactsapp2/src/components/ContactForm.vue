<template>
<div class="modal">
    <div class="form">
        <h3 class="heading">:: {{headingText}}</h3>
        <div v-if="mode=='update'">
            <label>일련번호</label>
            <input type="text" name="no" class="long" disabled v-model="contact.no" />
        </div>
        <div>
            <label>이름</label>
            <input type="text" name="name" class="long" placeholder="이름을 입력하세요" v-model="contact.name" />
        </div>
        <div>
            <label>전화번호</label>
            <input type="text" name="tel" class="long" placeholder="전화번호를 입력하세요" v-model="contact.tel" />
        </div>
        <div>
            <label>주 소</label>
            <input type="text" name="address" class="long" placeholder="주소를 입력하세요" v-model="contact.address" />
        </div>
        <div>
            <div>&nbsp;</div>
            <input type="button" class="button" v-bind:value="btnText" @click="submitEvent()" />
            <input type="button" class="button" value="취 소" @click="cancelEvent()" />
        </div>
    </div>
</div>
</template>

<script>
import eventBus from '../EventBus.js';

export default {
    name : "contactForm",
    props : { 
        mode : { type:String },
        contact : {
            type : Object,
            default : function() {
                return { no:'', name:'', tel:'', address:'', photo:'' }
            }
        }
    },
    computed : {
        btnText : function() {
            if (this.mode != 'update') return '추 가';
            else return '수 정';
        },
        headingText : function() {
            if (this.mode != 'update') return '새로운 연락처 추가';
            else return '연락처 변경';
        }
    },
    methods : {
        submitEvent : function() {
            if (this.mode == "update") {
                eventBus.$emit("updateContact", this.contact);
            } else {
                eventBus.$emit("addContact", this.contact);
            }
        },
        cancelEvent : function() {
            eventBus.$emit("cancel");
        }
    }
}
</script>

<style scoped>
.modal {
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
    background-color: white;
    margin:100px auto;
    max-width: 400px;
    min-width: 200px;
    padding: 10px 10px 10px 10px;
    font: 13px "verdana"
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
</style>
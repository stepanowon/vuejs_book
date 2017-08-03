<template>
    <div>
    <p>
        이름 : <input type="text" v-model.trim="name" placeholder="두글자 이상 입력후 엔터!"
                @keyup.enter="keyupEvent" /><br />
    </p>
    <div>
        <div>  최근 검색이름 리스트 : </div>
        <div class="box">
            <div class="item" v-for="keyword in keywordlist">{{keyword}}</div>
        </div>
    </div>
    </div>
</template>
<script type="text/javascript">
import Constant from '../constant';
import { mapState } from 'vuex';

export default {
    name : 'search',
    data : function() {
        return { name: ''};
    },
    computed : mapState([
        'keywordlist'
    ]),
    methods : { 
        keyupEvent : function(e) {
            var val = e.target.value;
            if (val.length >= 2) {
                this.$store.dispatch(Constant.SEARCH_CONTACT, { name: val });
                this.name = "";
            } else {
                this.$store.dispatch(Constant.SEARCH_CONTACT, { name: '' })
            }
        }
    }
}
</script>
<style scoped>
div.box { width:200px; height:100px; overflow:auto;
        border:solid 1px #BBBBBB; margin:5px 0px 5px 0px; }
div.item { padding:3px; }
</style>


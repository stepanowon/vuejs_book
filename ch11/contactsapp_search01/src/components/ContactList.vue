<style scoped>
#list  { width: 600px; border:1px solid black; border-collapse:collapse; }
#list td, #list th { border:1px solid black;  text-align:center; }
#list > thead > tr { color:yellow; background-color: purple; }
</style>
<template>
    <div>
    <table id="list">
        <thead>
            <tr>
                <th>번호</th>
                <th>이름</th>
                <th>전화번호</th>
                <th>주소</th>
            </tr>
        </thead>
        <tbody id="contacts" >
            <tr v-for="contact in contacts">
                <td>{{contact.no}}</td>
                <td>{{contact.name}}</td>
                <td>{{contact.tel}}</td>
                <td>{{contact.address}}</td>
            </tr>
        </tbody>
    </table>
    </div>
</template>
<script type="text/javascript">
import { mapState } from  'vuex';

export default {
    name : "contact-list",
    computed : mapState([ 'contacts' ])
}
</script>
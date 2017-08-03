import Vue from 'vue'
import Vuex from 'vuex'
import store from '../../src/store'
import List from '../../src/components/List'
import constant from '../../src/constant'

describe('List.vue', () => {
    var vm;

    beforeAll(() => {
        vm = new Vue({
            store,
            render: h => h(List)
        }).$mount()
        vm.$store.dispatch(constant.ADD_TODO, { todo:'스쿼시'})
    })

    it('초기 렌더링 화면 테스트', () => {
        expect(vm.$el.querySelectorAll('li').length).toEqual(5);
    });

    it('스냅샷 테스트', (done)=> {
        Vue.nextTick()
        .then(() => {
            expect(vm.$el).toMatchSnapshot();
            done()
        })
        .catch(done);
    })
});
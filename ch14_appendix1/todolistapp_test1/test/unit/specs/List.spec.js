//예제 14-
import Vue from 'vue'
import Vuex from 'vuex'
import store from '@/store'
import List from '@/components/List.vue'
import InputTodo from '@/components/InputTodo.vue'
import constant from '@/constant'

const vm = new Vue({
  template: '<div><input-todo ref="a"></input-todo><list></list></div>',
  store,
  components: {
    'list': List, 
    'input-todo' : InputTodo,
  }
}).$mount()

describe('List.vue', () => {
  it('초기 렌더링 화면 테스트', (done) => {
    Vue.nextTick()
      .then(() => {
        console.log(vm.$el.querySelectorAll('li'))
        expect(vm.$el.querySelectorAll('li').length).to.equal(4)
        done()
      })
      .catch(done)
  })

  it('새로운 todo 추가후 목록 확인', (done) => {
    vm.$refs.a._data.todo = "수영강습";

    const evtClick = new window.Event('click');
    var addbutton = vm.$el.querySelector('span.addbutton');
    addbutton.dispatchEvent(evtClick);
    vm._watcher.run();

    Vue.nextTick()
        .then(() => {
            var list = vm.$el.querySelectorAll('li');
            expect(list[list.length-1].textContent).to.contain('수영강습')
            expect(list.length).to.equal(5)
            done()
        })
        .catch(done)
  })
})

// 예제 14-05~07까지 
/** 
import Vue from 'vue'
import Vuex from 'vuex'
import store from '@/store'
import List from '@/components/List.vue'
import constant from '@/constant'

describe('List.vue', () => {
  it('초기 렌더링 화면 테스트', (done) => {
    const vm = new Vue({
      template: '<div><list></list></div>',
      store,
      components: {
        'list': List
      }
    }).$mount()

    Vue.nextTick()
      .then(() => {
        expect(vm.$el.querySelectorAll('li').length).to.equal(4)
        done()
      })
      .catch(done)
  })

  it('새로운 todo 추가후 목록 확인', (done) => {
    const vm = new Vue({
      template: '<div><list></list></div>',
      store,
      components: {
        'list': List
      }
    }).$mount()

    vm.$store.dispatch(constant.ADD_TODO, { todo:'스쿼시'})
    vm.$store.dispatch(constant.ADD_TODO, { todo:'수영'})

    Vue.nextTick()
      .then(() => {
        var list = vm.$el.querySelectorAll('li');
        expect(list[list.length-1].textContent).to.contain('수영')
        expect(list[list.length-2].textContent).to.contain('스쿼시')
        expect(list.length).to.equal(6)
        done()
      })
      .catch(done)
  })
})

*/
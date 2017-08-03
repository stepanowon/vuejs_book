import Vue from 'vue'
import CheckboxLabel from '@/components/CheckboxLabel'

describe('CheckboxLabel.vue', () => {
  it('초기화면 -> 선택(X)', () => {
    const Constructor = Vue.extend(CheckboxLabel)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('label').textContent)
      .to.equal('선택(X)')
    
    vm.onMsg = "selected";
    vm.offMsg = "unselected";
    expect
  })

  it('버튼 클릭! -> 선택(O)', () => {
    const Constructor = Vue.extend(CheckboxLabel)
    const vm = new Constructor().$mount()
    const chkbox = vm.$el.querySelector('input[type=checkbox]');
    const changeEvent = new window.Event('change');
    chkbox.dispatchEvent(changeEvent);
    vm._watcher.run();
    
    expect(vm.$el.querySelector('label').textContent).to.contain('선택(O)');
  })
})

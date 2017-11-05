# Vuex?
* Vue.js 책을 쓰고 나서 이메일로 받았던 질문들 중의 상당수가 Vuex 가 어렵고 이해가 안된다는 의견이 많았습니다. 좀더 자세한 설명을 해달라는 분들이 계셔서 깊이 반성하면서 이 문서를 작성했습니다. 
* Vue 초보자를 위해 만든 Vuex 개념에 대한 문서입니다. 실력있는 분들은 읽으실 필요가 없을 겁니다.
* 이 컨텐츠는 제 책(Vue.js 퀵스타트)을 중심으로 설명합니다. 이 컨텐츠만 보셔서 내용을 이해하기에는 약간의 어려움이 있을수도 있습니다.

## 목차
1. **[왜 Vuex를 사용하는가?](#vuex)**
2. **[상태(state)와 변이(mutations)](#state_mutations)**
3. **[게터(Getters)](#getters)**
4. **[액션(Actions)](#actions)**
5. **[대규모 애플리케이션의 저장소](#store_modules)**



## 왜 Vuex를 왜 사용하는가?
Vue를 공부하면서 컴포넌트에 대한 내용을 학습했다면 각 컴포넌트가 자기자신만의 상태(data 옵션)를 가질 수 있다는 것을 알고 있을 겁니다. 다음 그림을 참조해보지요.

![로컬 컴포넌트 상태만을 이용](https://github.com/stepanowon/vuejs_book/blob/master/vuex/vuex_images/vuex01.jpg?raw=true)

하지만 이 구조대로라면 각 컴포넌트들이 관리하고 있는 상태를 props로 전달하는 것에도 한계가 있을 것이고, 상태를 변경하기 위해 event를 emit하는 것은 더더욱 복잡해집니다. 더 복잡한 애플리케이션이라면 유지 관리가 사실상 불가능할 정도가 됩니다.(310페이지 4번째 줄)

그래서 다음과 같은 구조로 바꾸어 볼 수 있죠. 모든 상태 정보를 최상위 부모 컴포넌트에 저장하고 자식 컴포넌트로 props를 이용해 전달하여 화면에 나타내고, 상태 정보를 변경할 때는 이벤트버스 객체를 이용해 Event를 발생시켜 최상위 부모 컴포넌트로 변경하고자 하는 정보를 전달하는 겁니다. 관련 예제는 제 책의 282페이지 그림을 생각하시면 됩니다. 

![enter image description here](https://github.com/stepanowon/vuejs_book/blob/master/vuex/vuex_images/vuex02.jpg?raw=true)

하지만 이 방법도 문제점이 있습니다. 자식 컴포넌트들의 계층 구조가 복잡해지면 일일이 부모 컴포넌트에 저장된 정보를 계층 구조를 따라 props로 전달해주어야 합니다. 특히 유지보수 중에 새로운 상태 정보가 추가되면(data 옵션 객체에 정보가 추가되면) 최종 자식 컴포넌트까지 전달되는 경로에 있는 모든 컴포넌들의 props 옵션이 모두 변경될 것입니다. 이것은 유지 보수 측면에서 보자면 정말 귀찮은 일이고 코드 관리도 힘들 것입니다.

그래서 또 한가지 생각해볼 수 있는 것이 전역 객체를 하나 만들어서 각 컴포넌트에서 참조해서 사용하는 방법입니다. 다음 그림을 보세요

![enter image description here](https://github.com/stepanowon/vuejs_book/blob/master/vuex/vuex_images/vuex03.jpg?raw=true)

앞의 그림에서 Global 상태 정보 객체는 단순하게 정보를 담은 객체입니다. 대략 아래와 같은 형태가 될 것입니다.
```
export default {
  name : "이몽룡", 
  scores : [
    { course : "국어", score: 100 },
    { course : "수학", score: 90 },
    ..
  ]
}
```

이 전역 상태 정보 객체를 각 컴포넌트에서는 다음과 같이 참조해서 사용할 수 있습니다.

**[ UIComponent.vue]**
```
......
<script type="text/javascript">
import globalState from './globalState.js'

export default {
  name : "ui-component',
  data : globalState,
  ...
}
</script>
```

이렇게 하면 모든 컴포넌트들이 동일한 상태 정보를 공유할 수 있겠지요. 그리고 한 컴포넌트에서 데이터를 변경하면 전역 상태가 변경될 것입니다.(객체는 참조형이니까요..)

얼핏 보면 괜찮아 보이지만 이 방법도 문제가 있습니다. 상태 정보는 애플리케이션 내부의 중요한 구성요소입니다. 이미 느끼셨겠지만 Vue는 데이터(상태)를 중심으로 움직입니다. MVVM 모델이기 때문에 상태(데이터)가 바뀌면 ViewModel 객체가 바라보고 있다가 감지하여 UI를 자동으로 변경합니다. 이렇게 중요한 상태가 어느 컴포넌트,어떤 메서드에 의해서 언제 변경되는지를 전혀 알 수 없게 됩니다.

이런 이유로 Vuex와 같은 상태관리 라이브러리를 사용하는 겁니다. 정리하자면 다음과 같습니다.

* **중앙 집중화된 상태 정보 관리가 필요하다.**
* **상태 정보가 변경되는 상황과 시간을 추적하고 싶다.**
* **컴포넌트에서 상태 정보를 안전하게 접근하고 싶다.**

그렇다고 모든 애플리케이션 개발시에 Vuex를 사용해야만 하는 것은 아닙니다. **간단한 구조의 애플리케이션이라면 EventBus 객체의 사용 정도로도 충분히 해결될 수 있습니다.** 지금까지 설명드린 내용이 제 책 309페이지에도 설명되어 있습니다.

지금까지 Vuex를 왜 사용하게 되었는지에 대해서 살펴보았습니다. Vuex의 기본 골격을 보고 다음 내용으로 넘어갈까요? 일단 310페이지 그림을 유심히 봐주세요. Vuex를 학습하는 동안은 항상 이 그림을 봐야 합니다.

**[ 310페이지 그림]**
![https://vuex.vuejs.org/en/intro.html 참조](https://github.com/stepanowon/vuejs_book/blob/master/vuex/vuex_images/vuex04.jpg?raw=true)

화살표가 한 방향으로만 흘러 다니지요? 그래서 "단방향 데이터 흐름" "단방향 데이터 바인딩" 이라는 용어를 씁니다. 

* 컴포넌트가 액션을 일으키면(예를 들면 버튼 클릭같은...)
* 액션에서는 외부 API를 호출한 뒤 그 결과를 이용해 변이를 일으키고(만일 외부 API가 없으면 생략)
* 변이에서는 액션의 결과를 받아 상태를 변경한다. 이 과정은 추적이 가능하므로 DevTools와 같은 도구를 이용하면 상태 변경의 내역을 모두 확인할 수 있다.
* 변이에 의해 변경된 상태는 다시 컴포넌트에 바인딩되어 UI를 갱신한다.

이런 흐름입니다. 단방향이죠? 자세한 내용은 다음 내용에서 봅시다.


## 상태(state)와 변이(mutations)

앞에서 상태(state)는 애플리케이션에서 관리되어야 할 중요한 구성요소이고 정보라고 설명했습니다. 이 중요한 정보가 함부로 컴포넌트에 의해 변경되는 것을 원하지 않을 것입니다. 변경을 하더라도 추적가능하게 변경되어야 합니다. 이 기능을 제공하는 변이(mutations)입니다.

Vuex가 지원하는 저장소(store)는 상태와 변이를 중앙집중화하여 관리할 수 있도록 하는 핵심 객체입니다. Store 객체의 코드를 살펴봅시다. 

**[ 313페이지 예제 11-02 ]**
```
01: import Vue from 'vue';
02: import Vuex from 'vuex';
03: import Constant from '../constant';
04: Vue.use(Vuex);
05: 
06: const store = new Vuex.Store({
07:     state: {
08:         todolist : [
09:             { todo : "영화보기", done:false },
10:             { todo : "주말 산책", done:true },
11:             { todo : "ES6 학습", done:false },
12:             { todo : "잠실 야구장", done:false }
13:         ]
14:     },
15:     mutations: {
16:         [Constant.ADD_TODO] : (state, payload) => {
17:             if (payload.todo !== "") {
18:                 state.todolist.push({ todo : payload.todo, done:false });
19:             }
20:         },
21:         [Constant.DONE_TOGGLE] : (state, payload) => {
22:             state.todolist[payload.index].done = !state.todolist[payload.index].done;
23:         },
24:         [Constant.DELETE_TODO] : (state, payload) => {
25:             state.todolist.splice(payload.index,1);
26:         }
27:     }
28: })
29: 
30: export default store;
```

313 페이지의 예제 11-02의 15~27행까지를 살펴보면 state는 같은 예제 7행의 state를 나타냅니다. payload는 전달된 변경하려는 값이구요. 18행의 코드를 보면 state의 todolist 배열 데이터에 새로운 배열값을 추가하고 있습니다. **이와 같은 작업은 단순하게 상태를 변경시키는 것처럼 보이지만 실제로는 그렇지 않습니다. 기존 상태의 사본을 만들어 저장한 후 상태를 변경합니다. 그렇기 때문에 318페이지처럼 시간 추적 디버깅이 가능한겁니다. 그림을 보면 시간 정보가 나타나지요? 언제 변경된 것인지까지도 내부에 정보를 다가지고 있는 겁니다. 이런 기능을 제공해주기 위해 우리는 예제 11-02의 6행에서 const store = new Vuex({ ...  }) 코드로 Vuex 객체를 생성한 것입니다.** 

**[ 318페이지 시간 추적 디버깅 ]**
![enter image description here](https://github.com/stepanowon/vuejs_book/blob/master/vuex/vuex_images/vuex05.jpg?raw=true)

이때 우리가 전달한 정보들(예제 11-02의 7~27행까지 전달한 정보)는 Vuex 객체 내부에 저장되고 관리되어 집니다. 310페이지 그림을 항상 살펴보셔야 해요. 310 페이지 그림에서 점선으로 묶여진 공간의 것들을 관리하는 객체가 바로 저장소(store) 객체니까요. 제 책 모든 예제에서 store 객체라고 하면 바로 이것을 가리킵니다. 이 그림을 보면 액션, 변이, 상태가 내부에 캡슐화된 것을 나타냅니다. 

이제 애플리케이션의 컴포넌트에서 Vuex 객체를 사용하려면 store객체를 주입해주어야 하지요? 그 코드가 315페이지 예제 11-03의 2,6번행이군요. main.js 의 Vue 인스턴스를 만들때 주입해주면 됩니다. 이제 main.js에 의해서 TodoList.vue와 그 하위의 모든 하위 컴포넌트들에서 store 객체를 사용할 수 있게 되었습니다. 컴포넌트에서 직접 store 객체에 접근할 때 this.$store를 이용할 수 있습니다.

**[ 315페이지 예제 11-03 ]**
```
01: import Vue from 'vue'
02: import store from './store'
03: import TodoList from './components/TodoList.vue'
04: 
05: new Vue({
06:   store,
07:   el: '#app',
08:   render: h => h(TodoList)
09: })
```

주입된 Vuex 객체의 상태(state)는 컴포넌트의 계산형 속성에 바인딩하여 사용할 수 있습니다. 예제 11-04처럼 직접 계산형 속성에 바인딩해도 되고, mapState 같은 헬퍼 메서드를 이용할 수도 있지요. 

**예제 11-04의 일부 : this.$store.state  직접 이용 ]**
```
<script type="text/javascript">
import Constant from '../constant'

export default {
    computed : {
        todolist() {
            return this.$store.state.todolist;
        }
    },
    ......
}
</script>
```

**[ 예제 11-06의 일부 : mapState 헬퍼 메서드 적용 ]**
```
<script type="text/javascript">
import Constant from '../constant'
import { mapState, mapMutations } from 'vuex'
import _ from 'lodash';

export default {
    computed : mapState([ 'todolist']),
    ......
}
</script>
```

여기서 한가지 궁금한 점이 있을 수 있습니다. 왜 data 옵션이 아니라 계산형 속성(computed)에 Vuex state를 바인딩하여 이용하는가? 입니다. 그것은 바로 컴포넌트 수준에서 상태를 직접 변경하지 않았으면 하기 때문입니다. 현재는 수정이 가능하긴 합니다. 직접 변경하는 것을 막을 때 쓰는 옵션이 364페이지의 strict:true 옵션입니다. 이 옵션을 사용하면 컴포넌트에서 직접 상태를 변경하려 할 경우 오류를 발생시킵니다.

**[ 364페이지 strict 옵션 적용 ]**
```
......
const store = new Vuex.Store({
    state,
    mutations,
    actions,
    strict : true
})

export default store;
```

이런 이유로 변이(mutation)를 사용합니다. 변이는 앞에서도 말씀드렸지만 변경의 이력을 남깁니다.(바로 직전의 볼드체로 표현된 부분을 참조하세요). 언제 무엇이 어떻게 변경되었는지 말이죠. 이것이 변이의 존재 이유입니다. 변이의 목적은 안전하고 추적가능하게 상태를 변경한다는 것입니다. 다른 기능은 수행하지 않습니다. 다른 기능을 수행하는 것은 변이의 목적에 어긋나는 것입니다.
컴포넌트나 액션에서 변이를 일으키기 위해서 store 객체의 commit() 메서드를 호출합니다. 
```
this.$store.commit(Constant.DONE_TOGGLE, { index: index }) 
```

예제 11-06까지의 코드의 작동 방식을 그림으로 나타내면 다음과 같습니다.

![enter image description here](https://github.com/stepanowon/vuejs_book/blob/master/vuex/vuex_images/vuex061.jpg?raw=true)

간혹 변이에 다른 비즈니스 로직(예를 들어 서버와의 통신 복잡한 알고리즘 계산 등)을 집어 넣은 경우가 있는데 이것은 바람직하지 않습니다. 바로 변이가 동기적으로만 작동하기 때문입니다.(322페이지 3번째줄) 

아무 문서에도 이런 내용은 나와 있지 않지만 "상태의 변경은 비동기를 지원할 필요가 없기 때문"입니다. 현재 앱의 메모리의 데이터를 변경하는데 비동기적으로 작업할 이유가 없기 때문이죠.(제 추정입니다. 추정이라고 뭐라 그러지 말아주세요. 어느 문서에도 나오지 않으니 저도 추정할 밖에요.)

동기와 비동기의 개념은 AJAX를 이용한 서버와의 통신을 생각하시면 됩니다. 서버로 데이터를 전송하고 나면 서버에서 응답을 수신할 수 있지요.. 그런데 이 작업에는 약간의 시간이 소요됩니다. 아래 그림과 같이 말입니다.(이 그림은 게을러서 다른 웹사이트를 따왔습니다)

**[ 참조: http://mohwaproject.tistory.com/entry/AJAXAsynchronous-JavaScript-and-XML%EB%9E%80 ]**
![enter image description here](https://github.com/stepanowon/vuejs_book/blob/master/vuex/vuex_images/vuex07.jpg?raw=true)

바로 위의 그림은 동기방식의 처리입니다. 이 처리 방법은 클라이언트에서 서버로 요청하고 약간의 지연시간이 발생하지요. 브라우저는 멀티쓰레드 환경을 지원하지 않기 때문에 이 시간동안 브라우저가 먹통이 됩니다. 응답이 오면 다시 활성화되지요? 다음은 비동기 처리 과정입니다.

![enter image description here](https://github.com/stepanowon/vuejs_book/blob/master/vuex/vuex_images/vuex08.jpg?raw=true)

비동기 처리 과정의 특징은 서버로 요청한 후 응답이 올 때까지 대기하지 않고 다른 작업을 수행할 수 있다는 겁니다. 

그런데 말입니다. 변이는 동기적으로만 작동한다고 말씀드렸습니다. 그런데 변이 코드 내부에 비동기로 서버와의 통신을 수행하는 코드를 집어넣으면 어떻게 될까요? 상태가 바뀌어 UI 화면은 제대로 나타나겠지만 Devtools로 추적해보면 추적이 불가능하게 됩니다. 

앱을 디버깅하면서 DevTools를 이용해 변이의 로그를 보고 있다고 상황을 가정해봅시다. DevTools는 기록된 모든 변이에 대해 상태(state)의 "이전" 및 "이후" 스냅샷을 저장해야 하지만 변이 내부에서 비동기 처리가 일어나면  변이가 커밋되었을 때 비동기 콜백 함수는 아직 호출되지 않은 상태이므로 스냅샷이 올바르게 기록되지 않는 것입니다.  따라서 비동기 콜백에서 일어나는 상태의 변경은 다음 그림처럼 추적이 불가능한 것입니다.

![enter image description here](https://github.com/stepanowon/vuejs_book/blob/master/vuex/vuex_images/vuex09.jpg?raw=true)

이 그림의 예제는 변이 내부에서 비동기로 외부 API를 호출하도록 한 것입니다. ja라는 검색어로 실행해서 최종적으로는 상태가 변경이 되었습니다. 그래서 화면도 변경되었구요. 하지만 DevTools 화면을 보면 state의 연락처 데이터가 0건인 것을 알 수 있지요? 추적이 불가능한 것입니다.

이런 문제점 때문에 액션이 필요한 겁니다. 액션은 비동기를 잘 지원합니다. ^^

## 게터(Getters)

게터는 Vuex Store 수준의 계산형 속성입니다. 게터는 필수가 아닙니다. 사용해야 하는 경우는 Vuex store의 상태를 이용한 연산이 여러 컴포넌트에서 반복적으로 사용되어지는 경우입니다. 

아래 그림을 보면 Vuex Store에는 상태만 존재합니다. 예제 11-08에서 상태(state)만 작성한 경우라고 생각해보세요. 그리고 이 Vuex를 사용해서 필터링된 데이터를 보여줘야 하는 컴포넌트가 하나가 아니라 여러개라고 상황을 가정해보세요. 예제 11-05와 같은 유사한 화면을 보여줘야 하는 컴포넌트가 여러개인 상황이죠.

![enter image description here](https://github.com/stepanowon/vuejs_book/blob/master/vuex/vuex_images/vuex10.jpg?raw=true)

이 때 컴포넌트쪽이 좀 복잡해보이지만 Vue Component를 만들어보았다면 그리 어렵지 않을 겁니다. 그림이 좀 어지럽긴 하네요. ㅜㅜ  우선 Vuex Store 객체를 살펴보면 state만 존재합니다. 이 Store를 이용하는 컴포넌트가 두개(test1.vue, test2.vue)입니다.  test1.vue, test2.vue 컴포넌트에 필터링하기 위한 코드가 중복된 것이 보이지요? 

Vuex Store에는 state만 존재하기 때문에 이것을 바인딩하여 사용하는 컴포넌트에서 직접 필터링하고 가공해야 합니다. 불편하지요 그래서 만든 예제가 323 페이지의 예제 11-08입니다. 

**[ 예제 11-08 ]**
```
import Vue from 'vue';
import Vuex from 'vuex';
import Constant from '../Constant';
import _ from 'lodash';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        currentRegion : "all",
        countries : [
            { no:1,  name : "미국", capital : "워싱턴DC", region:"america" },
            { no:2,  name : "프랑스", capital : "파리", region:"europe" },
            ......(생략)
           ]
    },
    getters : {
        countriesByRegion(state) {
            if (state.currentRegion == "all") {
                return state.countries;
            } else {
                return state.countries.filter(c => c.region==state.currentRegion);
            }
        },
        regions(state) {
            var temp = state.countries.map((c)=>c.region);
            temp = _.uniq(temp);
            temp.splice(0,0, "all");
            return temp;
        },
        currentRegion(state) {
            return state.currentRegion;
        } 
    }, 
    mutations: {
        [Constant.CHANGE_REGION] : (state, payload) => {
            state.currentRegion = payload.region;
        }
    }
})

export default store;
```

Vuex Store 객체내에 게터를 추가했지요? 그리고 이것을 이용하는 컴포넌트들은 다음과 같이 사용할 것입니다. 그림을 확인해보지요.

![enter image description here](https://github.com/stepanowon/vuejs_book/blob/master/vuex/vuex_images/vuex11.jpg?raw=true)

이전과 가장 큰 차이는 각 컴포넌트마다 작성해야 할 계산형 속성이 Vuex store 내부에 getters에 작성된 것입니다. 이로써 각 컴포넌트에서는 계산형 속성을 일일이 작성하지 않아도 됩니다. 
컴포넌트에서는 두가지 방법으로 접근이 가능합니다. 책의 예제에서는 mapGetters만 사용했지만 실제로는 this.$store.getters.currentRegion과 같이 직접 계산형 속성에 연결할 수 있습니다. 하지만 이것보다는 test2.vue에 작성한 것처럼 mapGetters 헬퍼 메서드를 사용하는 편이 간편할 것입니다.

어쨌든 이전보다 컴포넌트에서의 코드가 훨씬 간결합니다. 특히 상태(state)를 가공해서 보여줘야 하는 작업이 여러 컴포넌트에서 사용된다면 그 부분을 게터로 Vuex store 객체로 옮기고 컴포넌트쪽에서는 간편하게 바인딩하여 사용할 수 있는 것입니다.

**이러한 성격은 컴포넌트 수준이라면 계산형 속성(computed property)와 유사한 것입니다.**


## 액션(Actions)

이미 앞에서 변이(mutations)에 대해 다룬바 있습니다. 변이의 목적은 '상태의 추적 가능한 변경'입니다. 이 이외의 용도로는 사용하지 말자는 것입니다. 그래서 동기적으로 작동하도록 하고 있는 것이라고 이미 앞에서 설명했지요? 상태가 동기적으로 순차적으로 변경되어야 시간 순으로 추적이 가능할 것입니다.

만일 애플리케이션이 외부 데이터(예를 들자면 외부 서버의 응답 결과, 파일 액세스 결과)에 의존하지 않고 개발하고 있는 앱의 메모리상의 데이터만 이용한다면 액션을 만들지 않아도 될 것입니다. 

물론 액션을 미리 만들어 주실 것을 권장해드립니다. 왜냐하면 우리가 만들 애플리케이션은 어떻게 변경될 지 아무도 모르기 때문입니다. 고객님(?)들의 요구 사항에 따라 새로운 기능의 추가가 일어날 수도 있지 않겠습니까? 미리 액션을 만들어 두시면 더 유지관리가 쉬울 겁니다. 

어쨌든 이런 외부 리소스를 이용할 때 비동기적으로 액세스해야 하기 때문에 대부분의 웹 검색이나 자료, 책들이 '액션이 비동기를 지원한다'라는 부분을 강조하는 것입니다. 

액션이 추가되면 다음과 같은 구조로 작동하게 됩니다.

![enter image description here](https://github.com/stepanowon/vuejs_book/blob/master/vuex/vuex_images/vuex12.jpg?raw=true)

하지만 이 그림은 변이만 사용할 때와 비교하면 컴포넌트와 변이 사이에 액션이 삽입된 것으로만 보입니다. 이제 다음 그림을 보겠습니다.

![enter image description here](https://github.com/stepanowon/vuejs_book/blob/master/vuex/vuex_images/vuex13.jpg?raw=true)

두번째 그림은 예제 11-16~22까지의 상황을 그림으로 나타낸 것입니다. 이 그림에서 액션이 외부 API를 호출하고 있는 것으로 보이죠? 그리고 그 결과(수신한 응답 데이터)를 payload로 전달하면서 변이를 일으킵니다. 이 때 외부 API를 호출하는 작업은 앞에서 동기, 비동기를 설명할 때 말씀드린 약간의 시간(지연 시간)이 소요됩니다. 만일 동기적으로 처리하게 되면 이 시간동안 브라우저 앱은 먹통이 됩니다. 

비동기 처리로 외부 API를 호출하면서도 상태 변경을 동기적으로 안전하고 추적 가능하게 수행하려면 외부 API 호출 기능을 액션으로 분리시켜야 합니다. 액션은 비동기를 잘 지원하므로 비동기 처리한 결과를 이용해 변이를 일으킬 때만 동기적으로 처리하는 것입니다. 

이번에는 변이는 state만 전달하는데 액션은 왜 store를 인자로 전달하는지와 액션으로 왜 복잡한 로직을 구성할 수 있는지에 대해 얘기해보겠습니다. 

**[ 예제 11-13 ]**
```
01: import Vue from 'vue';
02: import Vuex from 'vuex';
03: import Constant from '../constant';
04: Vue.use(Vuex);
05: 
06: const store = new Vuex.Store({
07:     state: {
08:         ......
09:     },
10:     mutations: {
11:         ......
12:     },
13:     actions : {
14:         [Constant.ADD_TODO] : (store, payload) => {
15:             console.log("### addTodo!!!");
16:             store.commit(Constant.ADD_TODO, payload);
17:         },
18:         [Constant.DELETE_TODO] : (store, payload) => {
19:             console.log("### deleteTodo!!!");
20:             store.commit(Constant.DELETE_TODO, payload);
21:         },
22:         [Constant.DONE_TOGGLE] : (store, payload) => {
23:             console.log("### doneToggle!!!");
24:             store.commit(Constant.DONE_TOGGLE, payload);
25:         }
26:     }
27: 
28: })
29: 
30: export default store;
```
예제 11-13의 14,18, 22행을 보면 액션 핸들러 메서드가 store, payload 두개의 인자를 사용하고 있음을 알 수 있습니다.  313페이지 예제 11-02에서 변이 메서드는 state, payload 인자를 전달하지요. 

다시 한번 얘기하지만 변이는 '상태의 변경' 만을 수행합니다. 이 작업을 위해 필요한 인자는 state, payload만 있으면 됩니다. 하지만 액션은 좀 다르죠.. 왜 액션은 state 대신에 store를 인자로 전달해야 하는지를 알아보자는 것입니다.

어떤 은행 앱이 있다고 상황을 가정해봅시다. 이 앱에는 입금과 인출 기능이 있다고 가정해봅니다. 외부 데이터를 이용해야 하는 상황이라면 인출 액션, 입금 액션을 작성할 것입니다. 

![enter image description here](https://github.com/stepanowon/vuejs_book/blob/master/vuex/vuex_images/vuex14.jpg?raw=true)

그런데 이제 계좌 이체 기능이 필요한 상황이 되었습니다. 어떻게 해야 할까요? 이체 액션을 정의하고 독립적으로 이체 로직을 구현할까요? 물론 그래도 되겠지만 잘 아시다시피 이체는 인출 -> 입금으로 이어지는 작업이므로 기존 액션을 이용하는 것이 효율적이지 않을까요? 다음 그림과 같이 말입니다.

![enter image description here](https://github.com/stepanowon/vuejs_book/blob/master/vuex/vuex_images/vuex15.jpg?raw=true)

이런 이유 때문에 액션 메서드의 인자로 state, payload 가 아니라 store, payload를 전달합니다. 이 store는 당연히 Vuex Store 객체입니다. 액션은 떄로는 변이를 일으키기도 하고 때로는 다른 액션을 일으키기도 하는 겁니다. 그림과 같이 한 액션이 여러 개의 액션을 일으키기도(dispatch) 하는 상황이 있을 수 있습니다. 이에 대한 자세한 얘기는 잠시 뒤로 미뤄두고 교재의 예제 얘기를 한번 더 해보도록 하지요.

이제 354-356 페이지의 예제 11-31~35로 이동하여 코드를 살펴보겠습니다. 이 예제는 연락처 앱의 Vuex Store 객체입니다. 연락처를 추가, 삭제, 변경하는 액션을 생각해보면 이것은 외부 리소스를 변경하기만 합니다. 상태는 다시 외부 리소스를 읽어와야 갱신이 가능합니다. 어차피 연락처 정보를 조회하는 액션(FETCH_CONTACTS)이 있으므로 굳이 조회 API를 다시 호출하고 변이를 일으키는 코드를 다시 작성할 필요가 없는 겁니다. 단지 추가,변경,삭제가 비동기로 실행되고 성공적으로 수행되고 나면 연락처 조회(FETCH_CONTACTS) 액션만 다시 호출하면 되는 것입니다. 다음 그림과 같이 말이죠.

![enter image description here](https://github.com/stepanowon/vuejs_book/blob/master/vuex/vuex_images/vuex16.jpg?raw=true)

이렇게 되면 비동기로 연락처를 추가하고 작업이 완료되어진 후에 연락처 조회 액션을 실행합니다. 즉 실행의 순서를 보장받을 수 있고, 이미 만들어져 있는 액션을 재활용할 수 있는 것입니다. 이와 관련한코드를 살펴보면 다음과 같습니다.

**[ 예제 11-34의 8~18행까지 ]**
```
[Constant.ADD_CONTACT] : (store) => {
   contactAPI.addContact(store.state.contact)
   .then((response)=> {
      if (response.data.status == "success") {
         store.dispatch(Constant.CANCEL_FORM);
         store.dispatch(Constant.FETCH_CONTACTS, { pageno: 1});                
      } else {
         console.log("연락처 추가 실패 : " + response.data);
      }
   })
}
```

예제 11-31의 ContactsAPI.js 에서 axios를 이용해 서버로 요청한 후에 Promise 객체를 리턴합니다. 리턴된 Promise 객체를 예제 11-34의 액션 메서드들이 이용하는 겁니다. 앞의 코드는 연락처를 추가하는 액션하나만을 소개한 겁니다. 연락처 추가가 성공적으로(success) 완료되고 난 후에 다시 FETCH_CONTACTS 액션을 호출해 데이터를 조회하고 FETCH_CONTACTS 액션에서 조회된 데이터를 이용해 변이를 일으켜 상태를 변경합니다. 이를 위해 예제 11-34의 61행에서 store.commit() 메서드를 호출하는 것입니다. 다음 그림과 같은 구조라 할 수 있습니다.

![enter image description here](https://github.com/stepanowon/vuejs_book/blob/master/vuex/vuex_images/vuex17.jpg?raw=true)

여기까지의 내용을 정리하자면 각각의 액션은 비동기적으로 실행되도록 작성하지만 여러개의 액션을 순차적으로 실행한 다음 상태를 변경하고자 하면 다음과 같이 액션이 액션을 dispatch 할 수 있는 겁니다.
```
 액션1 --> 액션2 --> 변이!!
 ```

액션1과 액션2의 처리 결과를 취합해 변이를 일으킬 수도 있는 것이구요. 앞의 예제에서는 추가 액션이 완료되면 입력폼을 닫아주는 액션(CANCEL_FORM)과  연락처 조회 액션(FETCH_CONTACTS)이 동시에 일어납니다. 다음과 같이 말이죠.
```
액션1 ------> 액션2 --> 변이2
     |------> 액션3 --> 변이3
```
지금 살펴본 상황도 아주 복잡한 경우는 아닙니다. 실제로는 더 많은 액션들이 조합될 수 있고, 하나의 액션이 다시 여러 액션을 dispatch 하고 그 결과 여러 개의 변이가 일어날 수 있는 것입니다. 이런 경우를 책 333페이지 첫문단에서  '상당히 복잡한 비즈니스 로직'이라고 설명한 것입니다.



 ### 📖 dispatch() 에 대해

Vuex에서 dispatch() 메서드는 액션을 일으키는 메서드입니다. dispatch 라는 말은 '메시지를 전송한다'라는 의미입니다. 일반적으로 객체 지향 언어에서 프로그램 메인 루틴에서 '특정 객체의 메서드를 호출하기 위해 메시지를 전달한다' 라는 표현을 사용하곤 합니다.  다음 웹 문서에서 메시지라는 키워드를 참조해보세요

**[http://aventure.tistory.com/56 에서 참조]**

※ 메시지(message)
- 객체에게 일을 시키는 행위.
- 메시지를 받을 객체의 이름, 메소드 이름, 메소드의 수행에 필요한 인자(argument)를 포함.
- 메시지를 전달받은 객체는 메시지의 내용을 분석하여 메시지에 지정된 메소드를 수행하여 결과를 반환.

액션이 알고 보면 어떤 일을 수행하는 메서드로써의 역할이라고 보았기 떄문에 dispatch 라는 용어의 메서드로 액션을 일으키도록 Vuex를 만든것으로 추정됩니다.(제가 만들지 않았기 때문에 dispatch 라는 메서드 이름을 사용한 이유를 정확히는 알 수 없습니다만 이렇게 추정해볼 수 있지요)

자 이제 다시 액션 메서드의 파라미터 얘기를 해보지요. 왜 store를 전달하는가는 이미 눈치채셨을 수 있을 것 같습니다. 그 이유는 액션에서 할 수 있어야 하는 작업의 종류가 다양하기 때문입니다.

* 액션이 다른 액션을 호출할 수도 있다.
* 액션이 변이를 일으킬 수도 있다.
* 때로는 액션이 직접 상태의 정보를 이용할 수도 있다.

앞의 연락처 추가 액션(ADD_CONTACT)를 보면 두번째 인자 payload 가 없네요. 추가할 연락처 정보가 필요할텐데 말이죠. 이것은 state를 직접 이용하기 때문에 두번째 인자 payload를 사용하지 않은 것입니다. 
어쨌든 액션에서는 이런 저런 다양한 작업을 할 수 있어야 합니다. 그러니 store 객체 자체를 전달할 수 밖에 없는 것입니다. 



 ### 📖 액션의 구조 분해 할당에 대해서...
store 객체는 책 347페이지의 표에 나오는 속성을 가지고 있습니다. 이중 commit, dispatch는 각각 변이, 액션을 일으키는 메서드이고 getters, state는 직접 참조하여 사용할 수 있습니다. store 객체 전체를 인자로 전달받아 store.dispatch() 와 같이 사용할 수도 있지만 이것이 귀찮다면 구조분해 할당으로 인자를 전달받을 수 있습니다. { dispatch } 와 같이 인자를 전달받으면 store 객체의 다른 속성은 전달받지 않고 오로지 dispatch 메서드만 인자로 전달받아 사용할 수 있는 것입니다.

**[ 참고 : 347 페이지 표 ]**

| 속성명 | 설명 |
|--|--|
| commit | 변이를 일으키기 위한 메서드입니다. |
| dispatch| 액션을 호출하기 위한 메서드입니다. 한 액션에서 다른 액션을 호출할 수 있습니다. |
| getters| 모듈 자기 자신의 게터입니다. |
| rootGetters| 루트 저장소의 게터입니다. |
| state| 모듈 자기 자신의 상태 데이터입니다. |
| rootState| 루트 저장소의 상태 데이터입니다. |


## 대규모 애플리케이션의 저장소(Store) 파일

제 책의 Vuex 내용 중 책에서 첫번째 만들었던 예제는 단하나의 .js 파일에 저장소(store) 객체 코드를 작성했습니다. 이것은 아주 간단한 예제니 가능한 일입니다. 저장소의 상태, 변이, 액션, 게터 등의 코드의 양이 많아지면 하나의 파일로 작성, 관리하기 힘들어집니다.

그래서 여러개 파일로 분리할 수 있는데 가장 간단한 방법이 역할 별로 분리시키는 겁니다. 예제 11-23~ 25까지는 각각 state, mutations, actions 이고 예제 11-26에서 이 객체들을 import 하여 vuex store 객체를 완성하는 형태를 볼 수 있습니다. 이 방식이 일반적으로 사용될 것입니다. 만들기도 쉽고요.

그 다음으로 책에서 제시하고 있는 방법이 모듈별 분리입니다.  그런데 이 부분은 책에 전체 코드를 싣지 않았습니다. 아주 중요한 내용은 아니라고 판단했습니다. 대규모 애플리케이션이 될 때 그리고 Vue, Vuex에 익숙해졌을 때 적용할 만한 내용이라고 보여지거든요.

대신에 https://github.com/stepanowon/vuejs_book 을 통해 제공하는 예제 파일에 포함시켰습니다. 11장 예제중 contactsapp_search2 라는 프로젝트를 다운로드하여 npm install 하신 다음 실행해보실 수 있고 책에 실린 일부 코드뿐만 아니라 전체 코드를 볼 수 있도록 한 겁니다.

자 이제 Store 객체를 만들기 위해 Module을 사용했을 때의 구조를 살펴보겠습니다. 우선 애플리케이션의 규모가 크고 복잡한 구조를 가지고 있다고 가정하고 다음 그림을 보겠습니다.

![enter image description here](https://github.com/stepanowon/vuejs_book/blob/master/vuex/vuex_images/vuex18.jpg?raw=true)

규모 있는 애플리케이션은 이와 같이 여러개의 서브 모듈로 구분하여 개발할 수도 있습니다. SPA(Single Page Application) 구조에서 아주 많은 수의 화면이 존재한다면 같은 종류의 기능을 제공하는 화면들의 집합라고 생각하셔도 좋습니다. 어쨌든 큰 애플리케이션을 여러개의 서브 모듈로 계층화시켜서 개발할 수 있는 것입니다.
보통 이렇게 서브 모듈을 나눠서 개발할 정도라면 어느 정도 독립적인 성격을 가지고 다른 서브 모듈에 영향을 주지 않는 상태(state)를 사용할 겁니다. 그렇다면 분리하는 것이 더 바람직하지 않을까요? 그래서 Store 수준에서 하위에 Module을 나눠서 계층구조로 관리해보자는 것입니다. 다음과 같이 말이죠.(이 그림이 346페이지 그림입니다)

![enter image description here](https://github.com/stepanowon/vuejs_book/blob/master/vuex/vuex_images/vuex19.jpg?raw=true)

보통 서브 모듈에서 루트 애플리케이션의 정보는 공유하는 경우가 많겠지요? 그래서 347페이지와 같이 Store 객체에서 RootGetters와 RootState는 직접 접근할 수 있도록 하고 있는 거라고 생각됩니다.(어떤 문서에도 이런 내용이 나오지 않지만 논리적으로 추정해볼 수 있죠) 

이와는 반대로 RootStore에서 하위 모듈의 State, Getters를 직접 접근하는 것은 제한하고 있습니다. 아까 말씀드린 서브 모듈의 독립성이라는 측면을 훼손시킬 여지가 있다라고 생각한게 아닌가 판단됩니다. 

다만 다른 모듈, 서브 모듈의 변이, 액션은 서로 간에 호출할 수 있도록 하고 있습니다. dispacth(), commit() 메서드를 이용해서요. 이건 그다지 문제가 되지 않을 것 같습니다. 이미 말씀드린 변경 추적이 가능하니까요. 추적이 가능하므로 상위 모듈 또는 루트 Store에서 하위 모듈의 변이나 액션은 일으킬 수 있다라고 생각하시면 될 듯합니다.

예를 들어 보면 서브 모듈1이 입금, 인출 기능이고, 서브모듈2가 계좌 조회 기능이라고 가정해보겠습니다.(너무 작은 애플리케이션의 예이긴 합니다) 입금하는 화면에서 상태를 변경한 후에 서브 모듈2의 계좌 잔고도 같이 변경해야 하지 않을까요? 입금을 하고 나서 입금 액션이 성공적으로 완료되면 Module2의 액션을 dispatch() 해서 서버에서 계좌 잔고 정보를 읽어와서 Module2의 state를 변경해주는 것이 당연한 일이겠지요. 

이런 이유로 모듈 간에는 상하위 계층 구조를 따지지 않고 액션, 변이는 가능하도록 dispatch(), commit() 메서드를 지원하는 거라고 생각됩니다.

하지만 Module을 위 그림과 같이 꽤 복잡한 규모로 사용할 정도라면 상당히 복잡한 애플리케이션일 겁니다. 공부하는 단계에서는 시기상조라고 생각됩니다. 그래서 전체 코드를 싣지 않고 설명도 간략하게 마무리한 겁니다. (양해를 부탁드려요..)

책에 있는 예제에 대해서 잠깐 설명드리면 예제에는 Module(예제11-28)을 하나만 만들고 그것을 하위 모듈로 참조하는 RootStore(예제 11-29)를 작성합니다. Module1은 이름 검색 기능과 조회된 연락처 리스트를 상태로 가집니다. RootStore는 이름을 검색할 때마다 검색했던 이름 내역 리스트를 관리하는 역할을 담당합니다. 

![enter image description here](https://github.com/stepanowon/vuejs_book/blob/master/vuex/vuex_images/vuex20.jpg?raw=true)

부족하지만 Vuex 에 대한 추가적인 내용을 작성해보았습니다. 입문자분들의 Vuex 이해에 도움이 되었으면 합니다.

감사합니다.
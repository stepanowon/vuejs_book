# Vue.js 퀵 스타트 : 빠르게 배워서 바르게 적용하는
- 2번째 에디션이 출간되었습니다.
- 저자: 원형섭
- 페이지: 520쪽
- 발행일: 2017-09-05
- 출판사: 루비페이퍼
<img src="cover_vuejs_quickstart.png" data-canonical-src="cover_vuejs_quickstart.png" width="300" height="300" />

## 구입처
- [yes24](http://www.yes24.com/24/goods/45091747?scode=032&OzSrank=3)
- [interpark](http://book.interpark.com/product/BookDisplay.do?_method=detail&sc.shopNo=0000400000&sc.prdNo=269077392&sc.saNo=003002001&bid1=search&bid2=product&bid3=title&bid4=001)

## 오탈자, 공지사항
* 오탈자는 [여기](오탈자.MD)를 확인합니다.
* 입문자들의 이해를 돕기 위해 [Vuex에 대한 추가설명 문서](vuex/about_vuex.md)를 작성하였습니다.

## 예제파일
* 각 장별로 예제를 분류하였습니다.
* 장별로 여러개의 프로젝트가 있는 경우는 장별로 Readme파일이 있습니다. 각 절마다 어떤 프로젝트를 사용하는지 명시되어 있습니다.
* 예제 파일을 압축파일로 받고 싶다면 [여기](https://github.com/stepanowon/vuejs_book/archive/master.zip)를 클릭하세요.
* 이 책에서 사용하는 서비스 API 예제는 다음을 확인하세요.    
   * API 다운로드 : https://github.com/stepanowon/contactsvc 
   * API 사용법 : http://sample.bmaster.kro.kr

## 버전 업그레이드 사항
### 1. babel-preset 관련 버전 
* webpack에서 사용하던 babel-preset-es2015는 최근에 deprecated로 공지되었습니다. 따라서 이제는 babel-preset-env를 사용해야 합니다. env를 사용하면 ES2017+ 문법을 모두 사용할 수 있습니다. 코드에서 변경해야 할 부분은 [여기](http://babeljs.io/env#upgrading-to-babel-preset-env)를 참조하세요.
* babel-preset 변경사항은 7장의 내용부터 적용할 수 있습니다.  
* 최신 버전의 Vue-CLI (2017-11-10 현재 2.9.1 버전)를 이용하면 자연스럽게 babel-preset-env를 사용하게 됩니다. 

### 2. Rest Operator를 이용해 Vuex 헬퍼메서드와 다른 메서드 함께 사용하기

* babel-preset-env를 사용하면 319 페이지의 예제 11-06과 같이 Vuex 헬퍼메서드와 다른 메서드를 함께 사용하기 위해 lodash 라이브러리를 이용하지 않고 ES6의 Rest Operator를 이용해 더 간단하게 표현할 수 있습니다. 예제 11-06의 20~30행까지의 코드는 다음과 같이 변경될 수 있습니다. 이와 같은 변경은 mapMutations뿐만 아니라 mapActions, mapGetters 등의 모든 헬퍼 메서드에 적용할 수 있습니다.

**[ 기존코드 ]**
~~~
<script type="text/javascript">
import Constant from '../constant'
import { mapState, mapMutations } from 'vuex'
import _ from 'lodash';

export default {
    computed : mapState([ 'todolist']),
    methods : _.extend({
            checked : function(done) {
                if(done) return { checked:true };
                else return { checked:false };
            }
        }, 
        mapMutations([
            Constant.DELETE_TODO ,
            Constant.DONE_TOGGLE
        ])
    )
}
</script>
~~~

**[babel-preset-env 기반에서 rest operator를 적용하여 변경]**
~~~
<script type="text/javascript">
import Constant from '../constant'
import { mapState, mapMutations } from 'vuex'

export default {
    computed : mapState([ 'todolist']),
    methods : {
        checked : function(done) {
            if(done) return { checked:true };
            else return { checked:false };
        },
        ...mapMutations([
            Constant.DELETE_TODO ,
            Constant.DONE_TOGGLE
        ])
    }
}
</script>
~~~

### 3. async ~ await 적용 (338~339 페이지)

338~339 페이지에서 Promise 객체 대신에 async ~ await 을 적용한 코드를 볼 수 있습니다.
이것을 사용하기 위해서 책에서는 npm install 명령어로 다음과 같이 패키지를 설치한다고 적었습니다.
~~~
npm install --save-dev babel-preset-stage-2 babel-plugin-transform-runtime
~~~
하지만 babel-preset-env를 사용한다면 위의 npm install 설치 과정 없이 바로 async ~ await 구문을 사용할 수 있습니다.

### 4. vue-cli에서 가장 많이 사용되는 webpack 템플릿의 내용이 변경되었습니다.
- https://slack-files.com/T3RLXCU0N-F7ZTZAQ14-09884d82e9
- https://github.com/vuejs-templates/webpack/releases/tag/1.2.0

Vue.js Korea 박창주님의 게시물을 참조하였습니다.

일단 변경된 내용에 의하면 autoOpenBrowser의 기본값이 true에서 false로 변경되었습니다. 이로 인해 npm run dev 명령어로 실행했을 때 브라우저가 자동으로 시작되지 않습니다. 자동으로 시작되도록 하려면 config/index.js 파일에서 autoOpenBrowser 옵션을 true로 변경하세요.

나머지 자세한 내용은 박창주님의 게시물을 참조해주세요.

### 5. Vue Devtools가 실행되지 않는 문제
&lt;script&gt; 태그를 이용해 CDN 참조 방식으로 Vue.js 앱을 개발할 때 Vue.js 2.5.1버전까지는 production 버전의 vue.min.js를 참조하더라도 Vue.config.devtools = true; 코드를 추가하면 Vue Devtools를 사용할 수 있었습니다. 하지만 2.5.2버전부터는 development 버전의 vue.js를 참조해야만 Vue Devtools를 사용할 수 있도록 변경되었습니다.

따라서 1~6장까지의 코드에서 Vue Devtools를 사용하시려면 CDN으로 참조하는 경로를 다음과 같이 바꿔주세요.

**[변경전]**
~~~
<script src="https://unpkg.com/vue/dist/vue.min.js"></script>
~~~

**[변경후]**
~~~
<script src="https://unpkg.com/vue/dist/vue.js"></script>
~~~

실행시에는 두가지 방법을 사용할 수 있습니다.

1. 웹서버를 기반으로 실행
  - 124p를 참조하여 live-server를 설치한 후 실행합니다.

2. 크롬브라우저의 '확장 프로그램 관리'에서 '파일 URL에 대한 액세스 허용'을 체크후 파일로 실행
  - 브라우저에서 더보기 버튼(크롬 브라우저 상단의 ...버튼)을 클릭합니다.
  - 도구 더보기 다음 확장 프로그램을 선택합니다.
  - Vue.js Devtools를 찾아서  '파일 URL에 대한 액세스 허용'을 체크합니다.
  - View In Browser로 실행합니다.(CTRL + F1)

### 6. webpack 버전 업그레이드
webpack이 3.x에서 4.x 버전으로 업그레이드되면서 몇가지 변경된 부분이 있습니다. 그러므로 책의 예제중 8장의 예제에서 오류가 발생합니다.

이 문제를 해결하기 위해서 webpack과 webpack-dev-server를 참조하기 위해 각각 3.11.0, 2.11.2 버전을 사용해야 합니다. 206페이지의 npm install 커맨드로 패키지를 참조하는 부분을 다음과 같이 변경합니다. 더불어서 babel-preset-es2015 대신에 babel-preset-env로 변경되었음은 앞에서 이미 말씀드린바 있습니다. 이것도 반영하는게 좋겠습니다.

~~~
npm install -g webpack@3.11.0

npm install --save-dev webpack@3.11.0
~~~

~~~
npm install --save-dev babel-cli babel-core babel-loader babel-preset-env
~~~

**[.babelrc 파일 ]**
```
{
  "presets" : ["env"]
}
```
211페이지 마지막 줄의 webpack-dev-server 참조시에도 버전을 명시적으로 지정해주세요. 

npm install --save-dev webpack-dev-server@2.11.2




  
## 목차
- CHAPTER 01 시작하기
  - 1.1 Vue.js란?
  - 1.2 개발 환경 설정
    - 1.2.1 Node.js 설치
    - 1.2.2 Visual Studio Code 설치
    - 1.2.3 크롬 브라우저 및 Vue.js devtools 설치 
    - 1.2.4 Vue-CLI 설치 
  - 1.3 첫 번째 Vue.js 애플리케이션

- CHAPTER 02 Vue.js 기초
  - 2.1 hellovuejs 예제 분석
  - 2.2 기본 디렉티브
    - 2.2.1 v-text, v-html 디렉티브
    - 2.2.2 v-bind 디렉티브
    - 2.2.3 v-model 디렉티브
    - 2.2.4 v-show, v-if, v-else, v-else-if 디렉티브
  - 2.3 반복 렌더링 디렉티브
  - 2.4 기타 디렉티브
  - 2.5 계산형 속성

- CHAPTER 03 Vue 인스턴스
  - 3.1 el, data, computed 옵션
  - 3.2 메서드
  - 3.3 관찰 속성
  - 3.4 v-cloak 디렉티브
  - 3.5 Vue 인스턴스 라이프 사이클

- CHAPTER 04 이벤트 처리
  - 4.1 인라인 이벤트 처리
  - 4.2 이벤트 핸들러 메서
  - 4.3 이벤트 객체
  - 4.4 기본 이벤트 
  - 4.5 이벤트 전파와 버블링
  - 4.6 이벤트 수식어
    - 4.6.1 once 수식어
    - 4.6.2 키코드 수식어
    - 4.6.3 마우스 버튼 수식어

- CHAPTER 05 스타일
  - 5.1 스타일 적용
  - 5.2 인라인 스타일
  - 5.3 CSS 클래스 바인딩
  - 5.4 계산형 속성, 메서드를 이용한 스타일 적용
  - 5.5 컴포넌트에서의 스타일 적용
  - 5.6 스타일 예제

- CHAPTER 06 컴포넌트 기초
  - 6.1 컴포넌트 조합
  - 6.2 컴포넌트의 작성
  - 6.3 DOM 템플릿 구문 작성 시 주의 사항
  - 6.4 컴포넌트에서의 data 옵션
  - 6.5 props와 event
    - 6.5.1 props를 이용한 정보 전달
    - 6.5.2 event를 이용한 정보 전달
    - 6.5.3 props와 event 예제
  - 6.6 이벤트 버스 객체를 이용한 통신

- CHAPTER 07 ECMAScript 2015
  - 7.1 ES2015를 사용하기 위한 프로젝트 설정
  - 7.2 let과 const
  - 7.3 기본 파라미터와 가변 파라미터
  - 7.4 구조분해 할당(destructuring assignment)
  - 7.5 화살표 함수(Arrow function)
  - 7.6 새로운 객체 리터럴
  - 7.7 템플릿 리터럴
  - 7.8 컬렉션
  - 7.9 클래스
  - 7.10 모듈
  - 7.11 Promise

- CHAPTER 08 Webpack
  - 8.1 Webpack 구성
  - 8.2 간단한 Webpack 구성 예제
  - 8.3 Webpack 개발 서버 설정
  - 8.4 Vue-CLI 보일러플레이트
  
- CHAPTER 09 컴포넌트 심화
  - 9.1 단일 파일 컴포넌트
  - 9.2 컴포넌트에서의 스타일
    - 9.2.1 범위 CSS(Scoped CSS)
    - 9.2.2 CSS 모듈(CSS Module)
  - 9.3 슬롯
    - 9.3.1 슬롯의 기본 사용법
    - 9.3.2 명명된 슬롯
    - 9.3.3 범위 슬롯
  - 9.4 동적 컴포넌트
  - 9.5 재귀 컴포넌트

- CHAPTER 10 axios를 이용한 서버통신
  - 10.1 서비스 API 소개
  - 10.2 axios 기능 테스트
    - 10.2.1 http 프록시 설정
    - 10.2.2 axios 사용
    - 10.2.3 axios 요청 방법
    - 10.2.4 axios 응답 형식
    - 10.2.5 기타 메서드
    - 10.2.6 파일 업로드 처리
    - 10.2.7. axios 요청과 config 옵션
    - 10.2.8 Vue 인스턴스에서 axios 이용하기
    - 10.2.9 axios 사용 시 주의 사항
  - 10.3. 연락처 애플리케이션 예제
    - 10.3.1 기초 작업
    - 10.3.2 App.vue 작성
    - 10.3.3 ContactList.vue 작성
    - 10.3.4 입력폼, 수정폼 작성
    - 10.3.5 사진 변경폼 작성
  - 10.4 정리

- CHAPTER 11 Vuex를 이용한 상태 관리
  - 11.1 Vuex란?
  - 11.2 상태와 변이
  - 11.3 게터
  - 11.4 액션
  - 11.5 대규모 애플리케이션의 저장소 파일
    - 11.5.1 역할별 분리
    - 11.5.2 모듈 이용하기
  - 11.6 Vuex를 이용하도록 연락처 애플리케이션 작성

- CHAPTER 12 vue-router를 이용한 라우팅
  - 12.1 vue-router란?
  - 12.2 vue-router 기초
  - 12.3 동적 라우트
  - 12.4 중첩 라우트
  - 12.5 명명된 라우트
  - 12.6 프로그래밍 방식의 라우팅 제어
    - 12.6.1 라우터 객체의 push 메서드
    - 12.6.2 내비게이션 보호
  - 12.7 라우팅 모드
  - 12.8 라우트 정보를 속성으로 연결하기
  - 12.9 연락처 애플리케이션에 라우팅 기능 적용
    - 12.9.1 초기 설정 작업
    - 12.9.2 vuex 상태 관리 기능 변경
    - 12.9.3 main.js에 라우팅 기능 추가
    - 12.9.4 App.vue 파일 변경
    - 12.9.5 ContactList.vue 컴포넌트 변경
    - 12.9.6 ContactForm.vue, UpdatePhoto.vue 컴포넌트 수정
  - 12.10 지연 시간에 대한 처리
    - 12.10.1 API 호출 지연 시간 발생
    - 12.10.2 스피너 컴포넌트 작성
    - 12.10.3 상태와 변이, 액션 변경

- CHAPTER 13 트랜지션 효과
  - 13.1 CSS 트랜지션 기초
  - 13.2 트랜지션 컴포넌트 기초
  - 13.3 CSS 애니메이션 처리
  - 13.4 트랜지션 이벤트 훅
  - 13.5 리스트에 대한 트랜지션
  - 13.6 연락처 애플리케이션에 트랜지션 적용하기

- 부록 A 단위 테스트
  - A.1 webpack 템플릿을 이용한 테스트
    - A.1.1 기본 기능 테스트
    - A.1.2 Vue 컴포넌트 테스트
    - A.1.3 이벤트 시뮬레이션
  - A.2 Jest를 이용한 테스트
    - A.2.1 Jest 설정
    - A.2.2 간단한 테스트 코드 작성 
    - A.2.3 Vue 컴포넌트에 대한 테스트

- 부록 B 서버 사이드 렌더링
  - B.1 프로젝트 생성과 초기화

---------------------------------------
### 문의사항은 [Facebook vuejs 퀵스타트 그룹](https://www.facebook.com/groups/555721098107321/)
이메일로는 질문을 받지 않습니다. Facebook의 그룹에서 질문해주세요.


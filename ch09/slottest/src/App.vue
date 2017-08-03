<template>
  <div id="app">
    <speech-box :headerText="A.header" :footerText="A.footer">
      <div>
        <p>
          {{A.message}}
        </p>
      </div>
    </speech-box>

    <speech-box class="sanders" :headerText="B.header" :footerText="B.footer">
      <div>
        <p class="sanders-content">
          {{B.message}}
        </p>
      </div>
    </speech-box>
  </div>
</template>

<script>
import SpeechBox from './components/SpeechBox.vue'

export default {
  name: 'app',
  components : { SpeechBox },
  data : function() {
    return { 
      A : {
        header : "오바마 대통령 고별 연설문",
        footer : "2017.01.10 - 시카고",
        message : `저의 동료 국민 여러분, 미셸과 저는 지난 몇 주간 우리가 받은 모든
            축복의 인사에 너무 감동받았습니다. 하지만 오늘 밤은 제가 감사의 인사를 할 
            차례입니다. 우리가 의견을 같이 했거나 혹은 거의 생각이 일치하지 않았든 
            미국 국민 여러분과의 대화는, 거실이든 학교든 농장이든 공장 바닥이든, 
            식당이든 먼 군사 전초 기지이든 이런 대화는 저를 정직하게 해주며 영감을 
            주었고 제가 계속 전진하도록 했습니다. ...(생략)`
      },
      B : {
        header : "버니샌더스 경선 패배 연설문",
        footer : "2016.07.25-필라델피아 웰스파고",
        message : `감사합니다. 여러분 정말 감사합니다. 오늘밤 이 자리에 서게 돼 
          영광입니다. 제 훌륭한 친구인 엘리자베스 워렌의 다음 순서에 발언할 수
          있어서, 그리고 미셸 오바마의 놀라운 업적을 축하할 기회를 얻게 돼서 또
          한번 영광이라고 생각합니다. 미셸은 우리 모두가 자랑스러움을 느끼도록
          해주었습니다. ...(생략)`
      }
    };
  }
}
</script>

<style scoped>
  .sanders { background-color:antiquewhite; }
  .sanders-content { font-family: 굴림; text-decoration: underline; }
</style>

<template>
  <v-app>
    <!--<div class="v-toolbar__content orange"
        style="height: 64px;" >

        <v-btn icon @click="$router.push('/')" >
            <v-icon >mdi-arrow-left</v-icon>
        </v-btn>

        <div v-bind:style="styleObject" class="v-toolbar__title">Задание</div>
    </div>-->
    <v-container grid-list-xl v-bind:style="styleObject">
      <v-layout >
        <v-flex xs12 sm10 md8 offset-sm2 offset-md-4 offset-xs-6 >
          <v-card style="top:5%" max-width="750" class="mx-auto"  outlined>
            <v-card-text v-bind:style="styleObject">
              На рабочем столе появился список слов, перетаскивая, нужно восстановить их порядок.</v-card-text>
            <v-row class="text-center" justify="center">
              <div v-bind:style="styleObject" class="col-3">
                <div style=""><v-icon>mdi-timer-outline</v-icon>{{formatTimer(pageOption.timeReading)}}</div></div>
            </v-row>
            <v-divider></v-divider>
            <!--<v-container fluid v-bind:style="styleObject">-->
            <v-row class="text-center" justify="center">
              <!--<div class="row " class="text-center">-->
              <div class="col-3">
                <h3>Варианты</h3>
                <draggable class="list-group" :list="list1" group="people" @change="log">
                  <div style="border-radius: 10px; background:#FFDEAD; text-align: center; margin-top: 5px"
                       class="list-group-item"
                       v-for="(element) in list1"
                       :key="element.text">
                    <strong style="font-size: 30px; ">{{ element.text }}</strong>
                  </div>
                </draggable>
              </div>
              <div class="col-3">

                <h3>Ответ</h3>
                <draggable class="list-group" :list="list2" group="people" @change="log">
                  <div style="border-radius: 10px; background:#FFDEAD; text-align: center; margin-top: 5px"
                       class="list-group-item"
                       v-for="(element) in list2"
                       :key="element.text">
                    <strong style="font-size: 30px; ">{{ element.text }}</strong>
                  </div>
                </draggable>
              </div>
            </v-row><v-divider/>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-dialog
                  v-model="dialog"
                  persistent
                  max-width="600px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                      color="primary"
                      dark
                      outlined
                      v-bind="attrs"
                      v-on="on"
                      @click="stopTimer(); ComparingArrays();"
                  >
                    проверить
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title class="text-h5 grey lighten-2">
                    <span class="text-h5">Результаты тренинга</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-list-item>

                          <v-list-item-title
                              v-bind:style="styleObject">Результат: {{result}}/10</v-list-item-title>
                          <v-list-item-title
                              v-bind:style="styleObject">Время выполнения:  {{formatTimer(pageOption.timeReading)}}
                          </v-list-item-title>
                        </v-list-item>
                        <v-btn
                            color="primary"
                            text
                            @click="dialog = false; result = 0">
                          Далее
                        </v-btn>
                      </v-row>
                    </v-container>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import draggable from "vuedraggable";
export default {
  data: () => ({
    dialog: false,
    styleObject: {
      fontSize: '20px'
    },
    pageOption: {
      timeReading: 0,
      timer: null,
    },
    selectedItem: 1,
    TrueAnswer: [
      { text: 'Мышка'},
      { text: 'Краска'},
      { text: 'Стена'},
      { text: 'Воробей'},
      { text: 'Флаг'},
      { text: 'Заря'},
      { text: 'Свеча'},
      { text: 'Банк'},
      { text: 'Лесник'},
      { text: 'Парус'}
    ],
    list1: [],
    list2: [],
    shuffleList: [],
    result: 0,
  }),
  name: "two-lists",
  display: "Two Lists",
  order: 1,
  components: {
    draggable
  },
  mounted() {
    this.startTimer()
    this.ShuffleWords();
  },

  computed: {
    getArrayForWord(){
      return this.$store.getters.getArrayForWord;
    },
  },
  methods: {
    ShuffleWords(){
      this.shuffleList = this.getArrayForWord;
      this.shuffleList.sort(() => Math.random() - 0.5)
      this.list1 = this.shuffleList;
    },
    ComparingArrays(){
        for(let i = 0; i < this.TrueAnswer.length; i++){
          if(this.TrueAnswer[i].text === this.list2[i].text){
            this.result++;
          }
        }
    },
    startTimer() {
      this.pageOption.timer = setInterval(() => {
        this.pageOption.timeReading++;
      }, 1000);
    },
    stopTimer(){
      clearTimeout(this.pageOption.timer);
    },

    formatTimer: function (times) {
      let sec_num = parseInt(times, 10);
      let hours = Math.floor(sec_num / 3600);
      let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
      let seconds = sec_num - (hours * 3600) - (minutes * 60);

      if (minutes < 10) { minutes = "0" + minutes; }
      if (seconds < 10) { seconds = "0" + seconds; }
      return minutes + ':' + seconds;
    },
    log: function(evt) {
      window.console.log(evt);
    },
  },
}
</script>
<style scoped></style>
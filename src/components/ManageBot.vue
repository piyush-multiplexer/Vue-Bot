<template>
  <div @keypress.enter.native="getBotData" id="ManageBot">
    <v-dialog v-model="logDialog">
      <v-card>
        <v-card-title>Logs</v-card-title>
        <v-card-text>
          <div v-for="log in logs">{{log}}</div>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-card :key="index" class="elevation-2" style="margin: 5px" v-for="(bot, index) in botData">
      <v-card-text>
        <v-layout row wrap>
          <template v-for="(cn, indx) in bot.convs" v-if="bot.convs">
            <v-flex class="text-xs-left" md2 xs5>{{cn.name}}</v-flex>
            <v-flex class="text-xs-left" md10 v-if="cn.name!= 'Selfie'&& cn.name!='selfie'" xs7>{{cn.val}}</v-flex>
            <v-flex class="text-xs-left" md10 v-if="cn.name=='Selfie'||cn.name=='selfie'" xs7>
              <v-avatar :size="100">
                <img :alt="cn.val" :src="cn.val">
              </v-avatar>
            </v-flex>
          </template>
          <v-flex>
            <v-btn @click="getLogs(bot.tempdocid)">Logs</v-btn>
          </v-flex>
          <template v-if="bot.convs==null">
            <v-flex class="text-xs-left" xs12>No Data</v-flex>
          </template>
        </v-layout>
      </v-card-text>
    </v-card>

    <v-dialog persistent v-model="promptDialog" width="320">
      <v-card>
        <v-card-text>
          <v-text-field :error-messages="errMessage" label="Enter Pin" v-model="pin"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-flex class="text-xs-center" xs12>
            <v-progress-circular color="primary" indeterminate style="float: right" v-if="loader">
            </v-progress-circular>
            <v-btn @click="getBotData()" color="primary">OK</v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
  import Constants from '../Constant'
  import NetworkCommunicator from '../plugins/NetworkResourceHandler'

  export default {
    name: 'ManageBot',
    data: function () {
      return {
        botData: [],
        pin: '',
        promptDialog: true,
        errMessage: '',
        loader: false,
        logs: [],
        logDialog: false,
      }
    },
    methods: {
      async getBotData () {
        if (this.pin == '') {
          this.errMessage = 'Please enter Pin'
        }
        this.loader = true
        let response = await NetworkCommunicator('GET',
          `${Constants.base_url}botData/${this.$route.params.botId}/${this.pin}`)
        this.loader = false
        if (response.flag) {
          this.promptDialog = false
          this.botData = response.data
        } else {
          this.errMessage = 'Invalid Pin'
        }
        this.$forceUpdate()
      },
      async getLogs (historyId) {
        let response = await NetworkCommunicator('GET', `${Constants.base_url}log/${historyId}`)
        this.logs = response.data
        this.logDialog = true
      },
    },
  }
</script>

<style scoped>
  .v-content__wrap {
    background-color: white;
  }
</style>

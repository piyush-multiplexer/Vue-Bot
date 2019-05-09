<template>
  <div id="ManageBot">
    <v-card v-for="(bot, index) in botData" :key="index" style="margin: 5px" class="elevation-2">
      <v-card-text>
        <v-layout row wrap>
          <template v-if="bot.convs" v-for="(cn, indx) in bot.convs">
            <v-flex xs5 md2 class="text-xs-left">{{cn.name}}</v-flex>
            <v-flex xs7 md10 class="text-xs-left" v-if="cn.name!= 'Selfie'&& cn.name!='selfie'">{{cn.val}}</v-flex>
            <v-flex xs7 md10 class="text-xs-left" v-if="cn.name=='Selfie'||cn.name=='selfie'">
              <v-avatar :size="100">
                <img :src="cn.val" alt="pic">
              </v-avatar>
            </v-flex>
          </template>
          <template v-if="bot.convs==null">
            <v-flex xs12 class="text-xs-left">No Data</v-flex>
          </template>
        </v-layout>
      </v-card-text>
    </v-card>

    <v-dialog persistent v-model="promptDialog" width="320">
      <v-card>
        <v-card-text>
          <v-text-field label="Enter Pin" v-model="pin" :error-messages="errMessage"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-flex xs12 class="text-xs-center">
            <v-progress-circular v-if="loader" indeterminate color="primary" style="float: right">
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
        data: function(){
            return {
                botData: [],
                pin: '',
                promptDialog: true,
                errMessage: '',
                loader: false
            }
        },
        methods: {
            getBotData: async function(){
                if(this.pin == ''){
                    this.errMessage = 'Please enter Pin'
                }
                this.loader = true;
                let response = await NetworkCommunicator('GET', `${Constants.base_url}botData/${this.$route.params.botId}/${this.pin}`)
                this.loader = false;
                if(response.flag) {
                    this.promptDialog = false;
                    this.botData = response.data;
                } else {
                    this.errMessage = 'Invalid Pin'
                }
                this.$forceUpdate()
            }
        },
        created () {
            // this.$loading.start()

        },
        mounted () {

        },
    }
</script>

<style>


</style>
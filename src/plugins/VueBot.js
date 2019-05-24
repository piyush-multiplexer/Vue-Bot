import BotData from '../data/BotMetaData'
import NetworkCommunicator from './NetworkResourceHandler'
import Constants from '../Constant'

let logs = []
window.onerror = function (a, b, c) {
  logs.push({ errorMessage: a, errorPath: b, errorLine: c })
}
let nextUrl = 'https://manage.bots.bizbrain.in/api/getJsonById/'
// method, url, loading, postData, headers
export default class VueBot {
  constructor (botID, hashId) {
    this.messages = BotData
    this.historyId = ''
    this.currentId = ''
    // this.convid = '087f5c' // //HyT2ac //Syrk3f //HkJrB4 //087f5c //40cb22
    this.convid = botID // //HyT2ac //Syrk3f //HkJrB4 //087f5c //40cb22
    this.botHashId = hashId
    this.rsp_gid = ''
    this.originalGambit = []
  }

  async getConfig () {
    let response = await NetworkCommunicator('GET',
      `${Constants.base_url}get/${this.convid}`)
    this.setConfig({
      convid: this.convid,
      historyId: response.historyId,
      currentId: response.json.id,
      rsp_gid: response.json.input.args.rsp_gid,
      originalGambit: response.originalGambit,
    })
    return response.json
  }

  setLogs () {
    let self = this
    NetworkCommunicator('POST', `${Constants.base_url}log/${this.historyId}`,
      false, { log: logs })
  }

  async getBotHashData () {
    if (this.botHashId) {
      let response = await NetworkCommunicator('POST',
        `${Constants.base_url}getMetaData`, false,
        { botId: this.convid, hashId: this.botHashId })
      if (response.flag)
        return response.data.data
      else
        return {}
    } else {
      return {}
    }
  }

  setConfig (config) {
    this.convid = config.convid
    this.historyId = config.historyId
    this.currentId = config.currentId
    this.rsp_gid = config.rsp_gid
    this.originalGambit = config.originalGambit
  }

  async getNextMessage (metaInput, userInput) {
    let postData = {
      gambits: this.originalGambit,
      userInput: userInput,
      metaInput: metaInput,
      currentId: this.currentId,
      convid: this.convid,
      historyId: this.historyId,
    }
    this.setLogs()
    let response = await NetworkCommunicator('POST',
      `${Constants.base_url}getJsonById/${this.rsp_gid}`,
      '', postData)
    this.setConfig({
      convid: this.convid,
      historyId: this.historyId,
      currentId: response.id,
      rsp_gid: response.input.args.rsp_gid,
      originalGambit: this.originalGambit,
    })
    return response
  }

  async getHistoryId () {
    return this.historyId
  }
}

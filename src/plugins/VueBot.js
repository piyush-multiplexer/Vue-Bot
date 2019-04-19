import BotData from '../data/BotDataTwo'
import NetworkCommunicator from './NetworkResourceHandler'
import Constants from '../Constant'

let nextUrl = 'https://manage.bots.bizbrain.in/api/getJsonById/'
// method, url, loading, postData, headers
export default class VueBot {
  constructor (botID) {
    this.messages = BotData
    this.historyId = ''
    this.currentId = ''
    // this.convid = '087f5c' // //HyT2ac //Syrk3f //HkJrB4 //087f5c //40cb22
    this.convid = botID // //HyT2ac //Syrk3f //HkJrB4 //087f5c //40cb22
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

  setConfig (config) {
    this.convid = config.convid
    this.historyId = config.historyId
    this.currentId = config.currentId
    this.rsp_gid = config.rsp_gid
    this.originalGambit = config.originalGambit
  }

  async getNextMessage (userInput) {
    let postData = {
      gambits: this.originalGambit,
      userInput: userInput,
      currentId: this.currentId,
      convid: this.convid,
      historyId: this.historyId,
    }
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
}

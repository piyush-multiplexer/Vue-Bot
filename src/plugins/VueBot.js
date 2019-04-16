import BotData from '../data/BotDataTwo'
import NetworkCommunicator from './NetworkResourceHandler'

let initUrl = 'http://bots.bizbrain.in/api/get/'
let nextUrl = 'http://bots.bizbrain.in/api/getJsonById/'
// method, url, loading, postData, headers
export default class VueBot {
  constructor () {
    this.messages = BotData
    this.historyId = ''
    this.currentId = ''
    this.convid = 'Syrk3f' // //HyT2ac
    this.rsp_gid = ''
    this.originalGambit = []
  }

  async getConfig () {
    let response = await NetworkCommunicator('GET', `${initUrl}${this.convid}`)
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
      `${nextUrl}${this.rsp_gid}`,
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

import BotData from '../data/BotData'

export default class VueBot {
  constructor () {
    this.bot_messages = BotData.bot
    this.user_messages = BotData.user
    this.bot_index = 0
    this.user_index = 0
  }

  initialize () {
    this.bot_index = 0
    this.user_index = 0
  }

  addMessage () {

  }

  setData (value) {
    this.user_messages[this.user_index].data.inputText = value
  }

  getNextUserData () {
    return this.user_messages[this.user_index++]
  }

  getNextBotData () {
    return this.bot_messages[this.bot_index++]
  }

}

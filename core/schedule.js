const Discord = require('discord.js')

const { sequelize, Sequelize } = require('../db/models')
const scheduleModel = require('../db/models/schedule')

const Schedule = scheduleModel(sequelize, Sequelize)

const PREFIX = '-'

const index = (message) => {
  Schedule.findAll({ where: { guildId: message.guild.id } })
    .then((res) => {
      const reply = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('All Schedules')
        .setTimestamp()
      Object.keys(res).forEach((i) => {
        reply.addField(
          res[i].dataValues.name.toUpperCase(),
          `${res[i].dataValues.description}\n${res[i].dataValues.date}`
        )
      })

      message.channel.send(reply)
    })
    .catch((err) => {
      console.error(err)
    })
}

const create = (message) => {
  let raw
  raw = message.content.replace('!schedule ', '')
  raw = raw.split(PREFIX)

  const value = {}
  value.guildId = message.guild.id

  Object.keys(raw).forEach((index) => {
    if (raw[index].includes('name')) {
      value.name = raw[index].replace('name ', '')
    }
    if (raw[index].includes('description')) {
      value.description = raw[index].replace('description ', '')
    }
    if (raw[index].includes('date')) {
      value.date = raw[index].replace('date ', '')
    }
  })

  Schedule.create(value)
    .then((res) => {
      message.reply(`Schedule created with id - ${res.id}`)
    })
    .catch((err) => {
      console.error(err)
      message.reply('Oops! Something went wrong.')
    })
}

const update = (message) => {
  let raw
  raw = message.content.replace('!schedule ', '')
  raw = raw.split(PREFIX)

  let id
  const value = {}
  value.guildId = message.guild.id

  Object.keys(raw).forEach((index) => {
    if (raw[index].includes('id')) {
      id = raw[index].replace('id ', '')
    }
    if (raw[index].includes('name')) {
      value.name = raw[index].replace('name ', '')
    }
    if (raw[index].includes('description')) {
      value.description = raw[index].replace('description ', '')
    }
    if (raw[index].includes('date')) {
      value.date = raw[index].replace('date ', '')
    }
  })

  Schedule.update(value, { where: { id } })
    .then((res) => {
      message.reply(`Schedule with id - ${res.id} - updated`)
    })
    .catch((err) => {
      console.error(err)
      message.reply('Oops! Something went wrong.')
    })
}

const destroy = (message) => {
  let raw
  raw = message.content.replace('!schedule ', '')
  raw = raw.split(PREFIX)

  let id

  Object.keys(raw).forEach((index) => {
    if (raw[index].includes('id')) {
      id = raw[index].replace('id ', '')
    }
  })

  Schedule.destroy({ where: { id } })
    .then((res) => {
      message.reply(`Schedule with id - ${id} - deleted`)
    })
    .catch((err) => {
      console.error(err)
      message.reply('Oops! Something went wrong.')
    })
}

const schedule = (message) => {
  if (message.content.includes(`${PREFIX}create`)) {
    create(message)
  } else if (message.content.includes(`${PREFIX}update`)) {
    update(message)
  } else if (message.content.includes(`${PREFIX}delete`)) {
    destroy(message)
  } else {
    index(message)
  }
}

module.exports = schedule

const { sequelize, Sequelize } = require('../db/models')
const guildModel = require('../db/models/guild')

const Guild = guildModel(sequelize, Sequelize)

const addGuild = (guild) => {
  const input = {
    name: guild.name,
    discordID: guild.id,
  }

  Guild.create(input)
    .then((res) => {
      console.log(
        `Server registered with discord id - ${guild.id} - as id - ${res.id}`
      )
    })
    .catch((err) => {
      console.error(err)
    })
}

const delGuild = (guild) => {
  const discordID = guild.id

  Guild.destroy({ where: { discordID } })
    .then((res) => {
      console.log(`Server with id - ${guild.id} removed from list.`)
    })
    .catch((err) => {
      console.error(err)
    })
}

module.exports = {
  addGuild,
  delGuild,
}

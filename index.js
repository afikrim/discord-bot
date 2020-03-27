const Discord = require('discord.js')

const { token } = require('./.env')

const client = new Discord.Client()

client.on('ready', async () => {
  console.log('Invite link: ')
  await client.generateInvite(['ADMINISTRATOR']).then((link) => {
    console.log(`${link}\n`)
  })

  if (client.guilds.cache.size === 0) {
    console.log('Bot is not in any server.')
    return
  }

  console.log('Servers:')

  client.guilds.cache.forEach((guild) => {
    console.log(` - ${guild.name}`)

    console.log('   Channels:')
    guild.channels.cache.forEach((channel) => {
      console.log(`    - ${channel.name} (${channel.type}) - ${channel.id}`)
    })
  })
})

client.login(token)

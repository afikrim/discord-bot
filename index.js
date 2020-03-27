const Discord = require('discord.js')

require('./server')

const { token } = require('./.env')
const { message } = require('./core')
const { createFolder, deleteFolder } = require('./lib')

const client = new Discord.Client()

const printServers = () => {
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
}

client.on('ready', async () => {
  console.log('Invite link: ')
  await client.generateInvite(['ADMINISTRATOR']).then((link) => {
    console.log(`${link}\n`)
  })

  printServers()
})

client.on('guildCreate', (guild) => {
  console.log(`Bot added to new guild - ${guild}.`)

  const embedMessage = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Hello there!')
    .setAuthor(
      "Afikrim's",
      'https://i.ibb.co/S5BgFwm/VmyUAs-k.jpg',
      'https://github.com/afikrim'
    )
    .setDescription("This is a bot for managing Afikrim's discord server.")
    .setThumbnail('https://i.ibb.co/S5BgFwm/VmyUAs-k.jpg')
    .addFields({
      name: 'How to',
      value: 'If you want to list all command, you can type !help',
    })
    .setTimestamp()
    .setFooter(
      'afikrim <afikrim10@student.ub.ac.id>',
      'https://i.ibb.co/S5BgFwm/VmyUAs-k.jpg'
    )

  guild.channels.cache.forEach((channel) => {
    if (channel.type.toString() === 'text') {
      console.log('Sending greeting message.')
      channel.send(embedMessage)
      console.log('Message sent.')
      return
    }
  })

  createFolder(guild)

  printServers()
})

client.on('guildDelete', (guild) => {
  console.log(`Bot kicked from a guild - ${guild}.`)

  deleteFolder(guild)

  printServers()
})

client.on('message', message)

client.login(token)

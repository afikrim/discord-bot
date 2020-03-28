const Discord = require('discord.js')

const schedule = require('./schedule')

const PREFIX = '!'

const embedMessage = new Discord.MessageEmbed()
  .setColor('#0099ff')
  .setTitle('How to use this?')
  .setAuthor(
    "Afikrim's",
    'https://i.ibb.co/S5BgFwm/VmyUAs-k.jpg',
    'https://github.com/afikrim'
  )
  .setDescription('Commands to manage schedule.')
  .setThumbnail('https://i.ibb.co/S5BgFwm/VmyUAs-k.jpg')
  .addFields(
    {
      name: 'Show all schedules',
      value: '!schedule',
    },
    {
      name: 'Create a schedule',
      value:
        '!schedule --create --name <name> --description <description> --date <date>',
    },
    {
      name: 'Update a schedule',
      value:
        '!schedule --update --id <id> --name <name> --description <description> --date <date>',
    },
    {
      name: 'Delete a schedule',
      value: '!schedule --delete --id <id>',
    }
  )
  .setTimestamp()
  .setFooter(
    'afikrim <afikrim10@student.ub.ac.id>',
    'https://i.ibb.co/S5BgFwm/VmyUAs-k.jpg'
  )

const command = (msg, cmd) => {
  switch (cmd) {
    case 'schedule':
      schedule(msg)
      break
    case 'help':
      msg.channel.send(embedMessage)
      break
    default:
      return
  }
}

const message = (msg) => {
  const raw = msg.content

  if (raw.charAt(0) !== PREFIX) return

  let cmd = raw.replace('!', '')
  cmd = cmd.split(' ')

  command(msg, cmd[0])
}

module.exports = message

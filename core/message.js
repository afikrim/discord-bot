const PREFIX = '!'

const command = (msg, cmd) => {
  switch (cmd) {
    case 'help':
      msg.channel.send('This is a help.')
      break
    default:
      return
  }
}

const message = (msg) => {
  const raw = msg.toString()

  if (raw.charAt(0) !== PREFIX) return

  const cmd = raw.replace('!', '')

  command(msg, cmd)
}

module.exports = message

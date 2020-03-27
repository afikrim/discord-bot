const fs = require('fs')

const checkFile = (server, file) => {
  if (fs.existsSync(`./data/guilds/${server}/${file}`)) {
    return true
  }

  return false
}

const createFolder = (server) => {
  if (!fs.existsSync(`./data/guilds/${server}`)) {
    console.log(`Folder ${server} not exists.\nCreate new folder.`)
    fs.mkdirSync(`./data/guilds/${server}`)
    console.log('Folder created.')
    return
  }
  console.log(`Folder ${server} already exists, nothing to do.`)
}

const deleteFolder = (server) => {
  console.log(`Deleting folder ${server}`)
  fs.rmdirSync(`./data/guilds/${server}`)
  console.log(`Folder ${server} deleted.`)
}

module.exports = {
  checkFile,
  createFolder,
  deleteFolder,
}

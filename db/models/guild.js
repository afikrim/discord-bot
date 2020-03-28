module.exports = (sequelize, DataTypes) => {
  const guild = sequelize.define(
    'guild',
    {
      name: DataTypes.STRING,
      discordID: DataTypes.STRING,
    },
    {}
  )
  guild.associate = (models) => {
    guild.hasMany(models.schedule, { as: 'schedule' })
  }
  return guild
}

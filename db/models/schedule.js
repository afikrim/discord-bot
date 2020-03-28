module.exports = (sequelize, DataTypes) => {
  const schedule = sequelize.define(
    'schedule',
    {
      guildId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      date: DataTypes.DATE,
    },
    {}
  )
  schedule.associate = (models) => {
    schedule.belongsTo(models.guild, { foreignKey: 'guildId', as: 'guild' })
  }
  return schedule
}

import { DATE } from 'sequelize';
import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class LastAirportRequest extends Model {
  declare id: number;
  declare last_update: string;
}
LastAirportRequest.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  last_update: {
    type: STRING(30),
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'last_airports_request',
  timestamps: false,
});

export default LastAirportRequest;
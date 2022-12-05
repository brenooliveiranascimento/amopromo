import { BOOLEAN } from 'sequelize';
import { Model, INTEGER, STRING, DECIMAL } from 'sequelize';
import db from '.';

class AirportModel extends Model {
  declare id: number;
  declare iate: string;
  declare city: string;
  declare state: string;
}

AirportModel.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  iata: {
    type: STRING(30),
    allowNull: false,
  },
  city: {
    type: STRING(100),
    allowNull: false,
  },
  state: {
    type: STRING(100),
    allowNull: false,
  },
  active: {
    allowNull: false,
    type: BOOLEAN
  }
}, {
  sequelize: db,
  modelName: 'airports',
  timestamps: false,
});

export default AirportModel;
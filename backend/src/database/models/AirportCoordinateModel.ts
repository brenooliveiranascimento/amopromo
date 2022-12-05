import { DECIMAL } from 'sequelize';
import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
import AirportModel from './AirportModel';

class AirportCoordinate extends Model {
  declare id: number;
  declare lat: string;
  declare lon: string;
  declare airportId: number;
}
AirportCoordinate.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  lat: {
    type: STRING(100),
    allowNull: false,
  },
  lon: {
    type: STRING(100),
    allowNull: false,
  },
  airportId: {
    type: INTEGER,
    allowNull: false,
  }
}, {
  underscored: true,
  sequelize: db,
  modelName: 'airports_coordinates',
  timestamps: false,
});

AirportModel.hasOne(AirportCoordinate);
AirportCoordinate.belongsTo(AirportModel);

export default AirportCoordinate;
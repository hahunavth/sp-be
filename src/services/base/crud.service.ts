import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { Model } from 'sequelize';

/**
 * Override: handle find record, check email, ...
 * hash pwd, ...
 * in route create, update
 */
class CRUDService<I, C extends Object, U extends Object> {
  // typeof Model
  public table: any;
  public tableName: string;

  public constructor(tableName: string, sequenlizeDefiitionTable: any) {
    this.tableName = tableName;
    this.table = sequenlizeDefiitionTable;

    if (!this.table) {
      throw new Error('CRUDService: sequenlizeDefiitionTable cannot ' + this.table);
    }
  }

  public async findAndCountAll(query): Promise<{
    count: number;
    rows: I[];
  }> {
    return this.table.findAndCountAll(query);
  }

  public async findAll(): Promise<I[]> {
    const allRecord: I[] = await this.table.findAll();
    return allRecord;
  }

  public async findById(id: number): Promise<I> {
    if (isEmpty(id)) throw new HttpException(400, 'Id is empty');

    const foundRecord: I = await this.table.findByPk(id);
    if (!foundRecord) throw new HttpException(409, this.tableName + " doesn't exist");

    return foundRecord;
  }

  public async create(data: C, callback?: (data: C) => Promise<C>): Promise<I> {
    if (isEmpty(data)) throw new HttpException(400, this.tableName + ' data is empty');

    if (callback) data = await callback(data);

    const createData: I = await this.table.create({ ...data });
    return createData;
  }

  public async update(id: number, data: C, callback?: (data: C) => Promise<C>): Promise<I> {
    if (isEmpty(data)) throw new HttpException(400, 'data is empty');

    const findRecord: I = await this.table.findByPk(id);
    if (!findRecord) throw new HttpException(409, this.tableName + " doesn't exist");

    if (callback) data = await callback(data);

    await this.table.update({ ...data }, { where: { id: id } });

    const updated: I = await this.table.findByPk(id);
    return updated;
  }

  public async delete(id: number): Promise<I> {
    if (isEmpty(id)) throw new HttpException(400, 'Id: ' + id);

    const findRecord: I = await this.table.findByPk(id);
    if (!findRecord) throw new HttpException(409, "Id doesn't exist");

    await this.table.destroy({ where: { id: id } });

    return findRecord;
  }
}

export default CRUDService;

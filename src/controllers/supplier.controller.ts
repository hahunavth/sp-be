import { CreateSupplierDto } from '@/dtos/supplier.dto';
import { Supplier } from '@/interfaces/supplier.interface';
import SupplierService from '@/services/supplier.service';
import CRUDController from './base/crud.controller';
import { Response } from 'express-serve-static-core';
import { Request } from 'express';
import DB from '@/databases';
import { QueryTypes } from 'sequelize';

class SupplierController extends CRUDController<Supplier, CreateSupplierDto, CreateSupplierDto, SupplierService> {
  public constructor() {
    const service = new SupplierService();
    super(service);
  }

  /**
   * So luong supplier theo thang trong nam
   * @author HieuTT
   *
   * REVIEW: ???
   */
  public async getStatistical(req: Request, res: Response) {
    const year = req.query.year;
    if (year === undefined) {
      res.send('Cần có tham số là năm');
      return res.status(6969);
    }
    const sql = `select date_part('month',"created_at"::timestamp) thang, count(1) count
                from supplier
                where date_part('year',"created_at"::timestamp) = ${year}
                group by thang
                ;`;

    const data = await DB.sequelize.query(sql, { type: QueryTypes.SELECT });

    res.status(200).json({
      year: year,
      data: data,
    });
  }
}

export default SupplierController;

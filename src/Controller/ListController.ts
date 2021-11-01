import { Request, Response } from 'express';
import ListModel from '../Model/ListModel';

export default class ListController {
  static async getList(req: Request, res: Response) {
    let content = await ListModel.getReservationList();
    res.render('list', { content: content });
  }
}

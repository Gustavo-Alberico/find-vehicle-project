import { Request, Response } from 'express';

export default class ListController {
  static getList(req: Request, res: Response) {
    res.render('list');
  }
}

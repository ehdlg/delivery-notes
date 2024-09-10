import { User as UserModel } from '../db';

export default class User {
  static async getByUsername(username: string) {
    const user = await UserModel.findOne({
      where: {
        username,
      },
    });

    return user?.dataValues || null;
  }
}

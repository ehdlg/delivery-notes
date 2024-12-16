import prisma from '../db/';

export default class User {
  static async getByUsername(username: string) {
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    return user || null;
  }
}

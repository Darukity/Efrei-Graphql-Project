import { hashPassword } from "../../modules/auth.js";
import { MutationResolvers } from "../../types.js";

export const createUser: MutationResolvers['createUser'] = async (_, {username, password}, {dataSources: {db}}) => {
  try {
    const createdUser = await db.user.create({
      data: {
        username,
        password: await hashPassword(password)
      }
    })
  
    return {
      code: 201,
      success: true,
      message: `user ${username} has been created`,
      user: {
        id: createdUser.id,
        username: createdUser.username
      }
    }
  } catch {
    return {
      code: 400,
      message: 'User has not been created',
      success: false,
      user: null
    }
  }
}
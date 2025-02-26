import { MutationResolvers } from "../../types.js";

export const addLike: MutationResolvers["addLike"] = async (_, { articleId }, { dataSources: { db }, user }) => {
    if (!user) {
        return {
            code: 401,
            success: false,
            message: 'You must be logged in to like an article',
            like: null
        }
    }
    
    try {
        const like = await db.like.create({
        data: {
            articleId,
            userId: user.id
        }
        })
    
        return {
        code: 201,
        success: true,
        message: 'Like added successfully',
        like: {
            ...like,
            createdAt: like.createdAt.toISOString()
        }
        }
    } catch (error) {
        console.error('Error adding like:', error)
        return {
        code: 500,
        success: false,
        message: 'Failed to add like',
        like: null
        }
    }
    }
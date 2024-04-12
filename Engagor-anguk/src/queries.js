import { HttpError } from 'wasp/server'

export const getAccounts = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.TwitterAccount.findMany({
    where: {
      userId: context.user.id
    }
  })
}

export const getEngagements = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Engagement.findMany({
    where: { accountId: context.user.id }
  });
}
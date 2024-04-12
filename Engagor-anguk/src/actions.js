import { HttpError } from 'wasp/server'

export const addTwitterAccount = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.TwitterAccount.create({
    data: {
      username: args.username,
      password: args.password,
      userId: context.user.id
    }
  });
}

export const engagePost = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const { tweetLink, accountId } = args;

  const twitterAccount = await context.entities.TwitterAccount.findUnique({
    where: { id: accountId }
  });

  if (twitterAccount.userId !== context.user.id) { throw new HttpError(403) };

  return context.entities.Engagement.create({
    data: {
      tweetLink,
      accountId
    }
  });
}
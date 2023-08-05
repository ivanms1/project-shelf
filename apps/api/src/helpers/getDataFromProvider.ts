import got from 'got';

type Response = {
  email: string;
  name: string;
  username: string;
  login: string;
  avatar_url: string;
  id: number;
  avatar: string;
};

const GITHUB_API_URL = 'https://api.github.com/user';
const DISCORD_API_URL = 'https://discord.com/api/users/@me';
const GITHUB_EMAILS_API_URL = 'https://api.github.com/user/emails';

export const getDataFromProvider = async (
  provider: string,
  token: string
): Promise<Response> => {
  const data: Response = await got
    .get(provider === 'github' ? GITHUB_API_URL : DISCORD_API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
      },
    })
    .json();

  if (provider === 'github' && !data.email) {
    const emails: { primary: boolean; email: string }[] = await got
      .get(GITHUB_EMAILS_API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github+json',
        },
      })
      .json();

    data.email =
      emails.find((email: { primary: boolean }) => email.primary)?.email ?? '';
  }

  if (provider === 'discord') {
    data.avatar_url = `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`;
  }

  return data;
};

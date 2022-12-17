import Image from 'next/future/image';
import {
  cardLinksStyle,
  cardStyle,
  imageContainerStyle,
  profileImageStyle,
  titleStyle,
  usernameStyle,
  wrapperStyle,
} from './Member.css';

interface MemberProps {
  name: string;
  username: string;
}

export const Member = ({ name, username }: MemberProps) => {
  return (
    <a target='_blank' href={`https://github.com/${username}`} rel='noreferrer'>
      <div className={cardStyle}>
        <div className={imageContainerStyle}>
          <Image
            className={profileImageStyle}
            src={`https://github.com/${username}.png`}
            alt='github-profile'
            width={110}
            height={110}
          />
        </div>
        <div className={wrapperStyle}>
          <span className={titleStyle}>{name}</span>
          <span className={usernameStyle}>@{username}</span>
          <div className={cardLinksStyle}>
            <Image
              className={profileImageStyle}
              src='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
              alt='github-profile'
              width={42}
              height={42}
            />
          </div>
        </div>
      </div>
    </a>
  );
};

export default Member;

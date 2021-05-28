import React from 'react';

import {
  Wrapper,
  Profile_Pic,
  User_Details,
  UserName,
  UserDescription,
  UserLocation,
  FlexRow,
  FOLLOW_ICON,
  Button,
} from './style';

import { ReactComponent as Email } from './../../assets/email.svg';
import { ReactComponent as MapPin } from './../../assets/map-pin.svg';

function Index({ followers }) {
  // To Do : map followers to make it dynamic list

  return (
    <>
      <Wrapper>
        <Profile_Pic>
          <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Shin_Ryu-jin_going_to_a_Music_Bank_recording_on_August_8%2C_2019.png/220px-Shin_Ryu-jin_going_to_a_Music_Bank_recording_on_August_8%2C_2019.png' />
        </Profile_Pic>

        <User_Details>
          <UserName>
            Miroz Devkota
            <span className='userTag'>@revengemiroz</span>
          </UserName>

          <UserDescription>
            Front-end Dev, specialising in React. From the UK, living in South
            Korea.
          </UserDescription>

          <UserLocation>
            <FlexRow>
              <FOLLOW_ICON>
                <Email />
              </FOLLOW_ICON>
              <span>mirozxy@gmail.com</span>
            </FlexRow>
            <FlexRow>
              <FOLLOW_ICON>
                <MapPin />
              </FOLLOW_ICON>
              <span>Kathmandu, Nepal</span>
            </FlexRow>
          </UserLocation>
        </User_Details>

        <Button>Follow</Button>
      </Wrapper>

      <Wrapper>
        <Profile_Pic>
          <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Shin_Ryu-jin_going_to_a_Music_Bank_recording_on_August_8%2C_2019.png/220px-Shin_Ryu-jin_going_to_a_Music_Bank_recording_on_August_8%2C_2019.png' />
        </Profile_Pic>

        <User_Details>
          <UserName>
            Miroz Devkota
            <span className='userTag'>@revengemiroz</span>
          </UserName>

          <UserDescription>
            Front-end Dev, specialising in React. From the UK, living in South
            Korea.
          </UserDescription>

          <UserLocation>
            <FlexRow>
              <FOLLOW_ICON>
                <Email />
              </FOLLOW_ICON>
              <span>mirozxy@gmail.com</span>
            </FlexRow>
            <FlexRow>
              <FOLLOW_ICON>
                <MapPin />
              </FOLLOW_ICON>
              <span>Kathmandu, Nepal</span>
            </FlexRow>
          </UserLocation>
        </User_Details>

        <Button>Follow</Button>
      </Wrapper>
    </>
  );
}

export default Index;

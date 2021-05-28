import React, { useState, useEffect } from 'react';

import ProfileCard from '../../components/ProfileCard';
import ProfileBanner from '../../components/ProfileBanner';

import MyProjects from '../MyProjects';
import FollowList from '../../components/FollowList';
import Approved from '../Admin/Approved';
import NotApproved from '../Admin/NotApproved';
import Tabs from './Tabs';
import TabContent from './TabContent';

import {
  Wrapper,
  PROFILE_BANNER_WRAPPER,
  Layout,
  LEFT_SIDE,
  RIGHT_SIDE,
} from './style';

function Index() {
  const [tab, setTab] = useState(1);

  return (
    <Wrapper>
      <PROFILE_BANNER_WRAPPER>
        <ProfileBanner />
        <ProfileCard />
      </PROFILE_BANNER_WRAPPER>

      <Layout>
        <LEFT_SIDE></LEFT_SIDE>
        <RIGHT_SIDE>
          <Tabs tab={tab} setTab={setTab} />
          <TabContent>
            {tab == 2 && <Approved />}
            {tab == 3 && <NotApproved />}
            {tab == 4 && <FollowList />}
            {tab == 5 && <FollowList />}
          </TabContent>
        </RIGHT_SIDE>
      </Layout>
    </Wrapper>
  );
}

export default Index;

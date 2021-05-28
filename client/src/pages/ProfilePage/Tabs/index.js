import React from 'react';

import { Wrapper, Tab, Button } from './style';

function Index({ tab, setTab }) {
  return (
    <Wrapper>
      <Tab>
        <Button onClick={() => setTab(1)} selected={tab == 1 ? 1 : 0}>
          Overview
        </Button>
      </Tab>

      <Tab>
        <Button onClick={() => setTab(2)} selected={tab == 2 ? 1 : 0}>
          Approved
        </Button>
      </Tab>

      <Tab>
        <Button onClick={() => setTab(3)} selected={tab == 3 ? 1 : 0}>
          Pending
        </Button>
      </Tab>

      <Tab>
        <Button onClick={() => setTab(4)} selected={tab == 4 ? 1 : 0}>
          Followers
        </Button>
      </Tab>

      <Tab>
        <Button onClick={() => setTab(5)} selected={tab == 5 ? 1 : 0}>
          Following
        </Button>
      </Tab>
    </Wrapper>
  );
}

export default Index;

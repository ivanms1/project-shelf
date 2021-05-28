import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 20px 0;
  flex: 1;
  width: 100%;
  height: 100%;
  max-width: 1380px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

export const PROFILE_BANNER_WRAPPER = styled.div`
  width: 100%;
  height: 100%;
  min-height: 300px;
  max-height: 350px;
  background-color: white;
  position: relative;
  /* border: 2px solid red; */
  display: flex;
`;

export const Layout = styled.div`
  /* border: 2px solid green; */
  flex: 1;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 400px 1fr;
`;

export const LEFT_SIDE = styled.div`
  /* border: 2px solid red; */
  flex: 1;
  width: 100%;
  height: 100%;
`;

export const RIGHT_SIDE = styled.div`
  /* border: 2px solid yellow; */
  width: 100%;
  height: 100%;
  flex: 1;
`;

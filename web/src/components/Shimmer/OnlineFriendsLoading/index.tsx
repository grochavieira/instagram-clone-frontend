import React from "react";
import ContentLoader from "react-content-loader";

const OnlineFriendsLoading = (props: any) => (
  <ContentLoader
    speed={2}
    width="100%"
    height={150}
    viewBox="0 0 600 150"
    backgroundColor="var(--color-shimer-primary)"
    foregroundColor="var(--color-shimer-secondary)"
    {...props}
  >
    <rect x="-1" y="3" rx="2" ry="2" width="600" height="112" />
  </ContentLoader>
);

export default OnlineFriendsLoading;

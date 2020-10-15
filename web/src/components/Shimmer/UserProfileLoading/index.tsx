import React from "react";
import ContentLoader from "react-content-loader";

const UserProfileLoading = (props: any) => (
  <ContentLoader
    speed={2}
    width="100%"
    height={150}
    viewBox="0 0 300 150"
    backgroundColor="var(--color-shimer-primary)"
    foregroundColor="var(--color-shimer-secondary)"
    {...props}
  >
    <circle cx="45" cy="41" r="36" />
    <circle cx="60" cy="51" r="3" />
    <rect x="102" y="27" rx="0" ry="0" width="130" height="14" />
    <rect x="102" y="51" rx="0" ry="0" width="185" height="13" />
  </ContentLoader>
);

export default UserProfileLoading;

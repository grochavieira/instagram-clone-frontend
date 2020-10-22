import React from "react";
import ContentLoader from "react-content-loader";

const ProfileLoading = (props: any) => (
  <ContentLoader
    speed={2}
    width="100%"
    height={560}
    viewBox="0 0 803 560"
    backgroundColor="var(--color-shimer-primary)"
    foregroundColor="var(--color-shimer-secondary)"
    {...props}
  >
    <circle cx="108" cy="92" r="82" />
    <rect x="283" y="29" rx="2" ry="2" width="353" height="33" />
    <rect x="286" y="81" rx="2" ry="2" width="293" height="27" />
    <rect x="287" y="127" rx="2" ry="2" width="208" height="27" />
    <rect x="-70" y="215" rx="2" ry="2" width="772" height="61" />
    <rect x="112" y="282" rx="2" ry="2" width="503" height="231" />
  </ContentLoader>
);

export default ProfileLoading;

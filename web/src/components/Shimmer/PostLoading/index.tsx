import React from "react";
import ContentLoader from "react-content-loader";

const PostLoading = (props: any) => (
  <ContentLoader
    speed={2}
    style={{ marginBottom: "10rem" }}
    width="100%"
    height={460}
    viewBox="0 0 600 460"
    backgroundColor="var(--color-shimer-primary)"
    foregroundColor="var(--color-shimer-secondary)"
    {...props}
  >
    <circle cx="26" cy="32" r="22" />
    <rect x="64" y="30" rx="2" ry="2" width="140" height="6" />
    <rect x="-1" y="67" rx="2" ry="2" width="600" height="400" />
  </ContentLoader>
);

export default PostLoading;

import React from "react";
import { useHistory } from "react-router-dom";
import TimeAgo from "react-timeago";
import brazilianStrings from "react-timeago/lib/language-strings/pt-br";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";

import { Notification } from "../../interfaces/Notification";
import "./styles.scss";

interface ActivityCardProps {
  activity: Notification;
}

const ActivityCard = ({ activity }: ActivityCardProps) => {
  const history = useHistory();

  const formatter = buildFormatter(brazilianStrings);

  function handleNotificationRoute() {
    if (activity.notificationType !== "follow") {
      history.push(`/post/${activity.postId}`);
    } else {
      history.push(`/profile/${activity.followingUsername}`);
    }
  }

  return (
    <>
      <div onClick={handleNotificationRoute} className="activity-card">
        <div className="activity-card__profile-image">
          <img src={activity.profilePhotoURL} alt={activity.username} />
        </div>
        <div className="activity-card__body">
          <p>{activity.body}</p>
        </div>
        <span className="activity-card__hour">
          <TimeAgo date={activity.createdAt} formatter={formatter} />
        </span>
      </div>
    </>
  );
};

export default ActivityCard;

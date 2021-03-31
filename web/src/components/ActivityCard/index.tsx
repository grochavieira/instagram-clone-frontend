import React from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import "moment/min/moment-with-locales";

import { Notification } from "../../interfaces/Notification";
import "./styles.scss";

interface ActivityCardProps {
  activity: Notification;
}

const ActivityCard = ({ activity }: ActivityCardProps) => {
  const history = useHistory();

  return (
    <>
      <div
        onClick={() => history.push(`/post/${activity.postId}`)}
        className="activity-card"
      >
        <div className="activity-card__profile-image">
          <img src={activity.profilePhotoURL} alt={activity.username} />
        </div>
        <div className="activity-card__body">
          <p>{activity.body}</p>
        </div>
        <span className="activity-card__hour">
          {moment(activity.createdAt).fromNow(true)}
        </span>
      </div>
    </>
  );
};

export default ActivityCard;

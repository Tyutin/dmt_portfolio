import { UserEntity } from "../../../../typeorm/src/entities/nextAuth.entity";
import { ProfileType } from "../../../../typeorm/src/entities/types/profileType";
import Button from "../Button/Button";
import './UserCard.scss'

type UserCardProps = {
  user: UserEntity;
};

export default function UserCard({ user }: UserCardProps) {
  return (
    <div className="user-card">
      <img
        src={user.imageMax || ""}
        alt={user.name || ""}
        className="user-card__image"
      />
      <span className="user-card__name">
        {user.lastName} {user.firstName}
      </span>
      {!!user.shortInfo && 
      <p className="user-card__short-info">{user.shortInfo}</p>}
      <Button additionalClasses='user-card__link' theme='user-link' tag="a" href={`/${user.status === ProfileType.student ? 'students' : 'teachers'}/${user.slug}`}>Подробнее</Button>
    </div>
  );
}

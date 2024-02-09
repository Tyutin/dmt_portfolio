import { UserEntity } from "../../../../typeorm/src/entities/nextAuth.entity";
import UserCard from "../UserCard/UserCard";
import "./UserList.scss";

type UserListProps = {
  users: UserEntity[];
};

export default function UserList({ users }: UserListProps) {
  return <ul className="user-list">
    {users.map(user => {
      return (
        <li className="user-list__element" key={user.id}>
          <UserCard user={user} />
        </li>
      )
    })}
  </ul>;
}

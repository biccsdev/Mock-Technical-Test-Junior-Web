import { useEffect } from "react";
import { SortBy, type User } from "../types.d";

interface Props {
  handleSorting: (sort: SortBy) => void;
  deleteUser: (email: string) => void;
  showColors: boolean;
  users: User[];
}

export function UsersList({
  handleSorting,
  deleteUser,
  showColors,
  users,
}: Props) {
  useEffect(() => {}, []);

  return (
    <table width="100%">
      <thead>
        <tr>
          <th>Picture</th>
          <th className="pointer" onClick={() => handleSorting(SortBy.NAME)}>
            Name
          </th>
          <th className="pointer" onClick={() => handleSorting(SortBy.LAST)}>
            Last
          </th>
          <th className="pointer" onClick={() => handleSorting(SortBy.COUNTRY)}>
            Country
          </th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {users.map((item, index) => {
          const backgroundColor = index % 2 == 0 ? "#333" : "#555";
          const color = showColors ? backgroundColor : "transparent";
          return (
            <tr key={item.email} style={{ backgroundColor: color }}>
              <td>
                <img src={item.picture.thumbnail}></img>
              </td>
              <td>{item.name.first}</td>
              <td>{item.name.last}</td>
              <td>{item.location.country}</td>
              <td>
                <button onClick={() => deleteUser(item.email)}>Delete</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

import { useEffect, useRef, useState } from "react";
import { SortBy, type User } from "../types.d";
import { UserDataCard } from "./UserDataCard";

interface Props {
  handleSorting: (sort: SortBy) => void;
  deleteUser: (email: string) => void;
  showColors: boolean;
  users: User[];
}

// interface PropsDataCard {
//   name: string;
//   image: string;
// }

export function UsersList({
  handleSorting,
  deleteUser,
  showColors,
  users,
}: Props) {
  const [selectedRow, setSelectedRow] = useState<User>();
  const [rowSelected, setRowSelected] = useState(false);

  // Handle row click event
  const handleRowClick = (rowData: User) => {
    console.log(rowData);
    setSelectedRow(rowData);
    setRowSelected(true);
  };

  const handleClosePopup = () => {
    setRowSelected(false);
  };
  useEffect(() => {}, []);

  return (
    <table width="55%">
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
          const backgroundColor = index % 2 == 0 ? "#40288f" : "#347f83";
          const color = showColors ? backgroundColor : "transparent";
          return (
            <tr
              className="highlight-row"
              key={item.email}
              style={{ backgroundColor: color }}
            >
              <td onClick={() => handleRowClick(item)}>
                <img src={item.picture.thumbnail}></img>
              </td>
              <td onClick={() => handleRowClick(item)}>{item.name.first}</td>
              <td onClick={() => handleRowClick(item)}>{item.name.last}</td>
              <td onClick={() => handleRowClick(item)}>
                {item.location.country}
              </td>
              <td>
                <button
                  className="button"
                  onClick={() => deleteUser(item.email)}
                >
                  DELETE
                </button>
              </td>
            </tr>
          );
        })}
        {rowSelected && (
          <UserDataCard onClose={handleClosePopup} rowData={selectedRow} />
        )}
      </tbody>
    </table>
  );
}

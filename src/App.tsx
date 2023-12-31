import { useState, useEffect, useRef, useMemo } from "react";
import { SortBy, type User } from "./types.d";
import "./App.css";
import { UsersList } from "./components/UsersList";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [showColors, setColors] = useState(false);
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
  const [filter, setFilter] = useState<string | null>(null);
  const dataRestore = useRef<User[]>([]);

  const toggleColors = () => {
    setColors(!showColors);
  };

  const toggleSortByCountry = () => {
    const newSortingValue =
      sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE;
    setSorting(newSortingValue);
  };

  const toggleDataRestore = () => {
    setUsers(dataRestore.current);
  };

  const filteredUsers = useMemo(() => {
    return filter != null && filter.length > 0
      ? users.filter((user) => {
          if (
            user.location.country
              .toLocaleLowerCase()
              .includes(filter.toLocaleLowerCase())
          ) {
            return true;
          }
          if (
            user.name.first
              .toLocaleLowerCase()
              .includes(filter.toLocaleLowerCase())
          ) {
            return true;
          }
          if (
            user.name.last
              .toLocaleLowerCase()
              .includes(filter.toLocaleLowerCase())
          ) {
            return true;
          }
          // return user.location.country
          //   .toLowerCase()
          //   .includes(filter.toLowerCase());
        })
      : users;
  }, [users, filter]);

  const sortedUsers = useMemo(() => {
    switch (sorting) {
      case SortBy.COUNTRY:
        return [...filteredUsers].sort((a, b) => {
          return a.location.country.localeCompare(b.location.country);
        });
      case SortBy.NAME:
        return [...filteredUsers].sort((a, b) => {
          return a.name.first.localeCompare(b.name.first);
        });
      case SortBy.LAST:
        return [...filteredUsers].sort((a, b) => {
          return a.name.last.localeCompare(b.name.last);
        });
      default:
        return filteredUsers;
    }
  }, [filteredUsers, sorting]);

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email != email);
    setUsers(filteredUsers);
  };

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort);
  };

  useEffect(() => {
    fetch("https://randomuser.me/api?results=100")
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`HTTPS Error! Status: ${response.status}`);
        }
        return await response.json();
      })
      .then((data) => {
        setUsers(data.results);
        dataRestore.current = data.results;
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }, []);

  return (
    <div>
      <h1>User's Data</h1>
      <header>
        <button className="button" onClick={toggleColors}>
          Color Rows
        </button>
        <button className="button" onClick={toggleSortByCountry}>
          {sorting === SortBy.COUNTRY ? "Restore Sort" : "Sort by Country"}
        </button>
        <button className="button" onClick={toggleDataRestore}>
          Restore Data
        </button>
        <input
          className="button"
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          placeholder="filter by country..."
        ></input>
      </header>
      <main>
        <UsersList
          handleSorting={handleChangeSort}
          deleteUser={handleDelete}
          showColors={showColors}
          users={sortedUsers}
        />
      </main>
    </div>
  );
}

export default App;

import { User } from "../types";

interface Props {
  onClose: () => void;
  rowData: User | undefined;
}

export function UserDataCard(props: Props) {
  if (!props.rowData) {
    return null; // or return some fallback content if desired
  }
  return (
    <tr className="popup-card">
      <td>
        <img src={props.rowData.picture.large}></img>
      </td>
      <td width="100%">
        <h2>
          {props.rowData.name.first}
          <span> </span>
          {props.rowData.name.last}
        </h2>
      </td>
      <td width="100%">
        <h2>{props.rowData.email}</h2>
      </td>
      <td width="100%">
        <h2>{props.rowData.gender}</h2>
      </td>
      <td width="100%">
        <h2>Phone: {props.rowData.phone}</h2>
      </td>
      <td width="100%">
        <h2>User: {props.rowData.login.username}</h2>
      </td>
      <td>
        <button className="button" onClick={props.onClose}>
          Close
        </button>
      </td>
    </tr>
  );
}

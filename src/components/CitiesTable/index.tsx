import { FC } from "react";
import { Cities } from "../../services/types/search";
import Loader from "../Loader";

type Props = {
  data: Cities[];
  isLoading: boolean;
  emptyDataMessage: string;
};

const CitiesTable: FC<Props> = ({ data, isLoading, emptyDataMessage }) => {
  return (
    <div className="cities-table-container">
      <table className="cities-table">
        <thead>
          <tr>
            <th>#</th>
            <th>First</th>
            <th>Last</th>
            <th>Handle</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr className="no-record">
              <td colSpan={4}>
                <div className="loader-container">
                  <Loader />
                </div>
              </td>
            </tr>
          ) : data.length > 0 ? (
            data.map((row) => (
              <tr className="records" key={row.id}>
                <td>{row.id}</td>
                <td>{row.city}</td>
                <td>{row.country}</td>
                <td>{row.countryCode}</td>
              </tr>
            ))
          ) : (
            <tr className="no-record">
              <td colSpan={4}>{emptyDataMessage}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CitiesTable;

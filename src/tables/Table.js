import TableHead from "./TableHead";
import TableBody from "./TableBody";
import { useSortableTable } from "./useSortableTable";

const Table = ({ data, columns }) => {
  const [tableData, handleSorting] = useSortableTable(data, columns);
  return (
    <div className="table-wrapper">
      <table className="table">
        <TableHead {...{ columns, handleSorting }} />
        <TableBody {...{ columns, tableData }} />
      </table>
    </div>
  );
};

export default Table;
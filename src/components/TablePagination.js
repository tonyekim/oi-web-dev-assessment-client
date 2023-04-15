import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import axios from "axios";
import { NavLink } from "react-router-dom";


const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

// Our table component
function Table({ columns, data }) {
  const props = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter, // useGlobalFilter!
    usePagination
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
    state,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter },
  } = props;
  console.log(props);
  React.useEffect(() => {
    // props.dispatch({ type: actions.resetPage })
    console.log(globalFilter);
  }, [globalFilter]);

  return (
    <div className="mt-2">
      {console.log(globalFilter)}
      <input
      className="border border-gray-400 w-[200px] pl-2 py-2 outline-none focus:outline-none"
      placeholder="Enter to Search"
        type="text"
        value={globalFilter || ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
      />
      <table {...getTableProps()} className="mt-2">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render("Header")}
                  {/* Render the columns filter UI */}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>

      <br />
      <div>Showing the first 20 results of {rows.length} rows</div>
      <div>
        <pre>
          <code>{JSON.stringify(state.filters, null, 2)}</code>
        </pre>
      </div>
    </div>
  );
}




function TablePagination() {

  const [data, setPost] = useState([]);
  //   console.log(post);
  
    useEffect(() => {
      axios
        .get("http://localhost:8081/")
        .then((res) => setPost(res.data))
        .catch((err) => console.log(err));
    }, []);
  
    const handleDelete = async(id) => {
      try {
        await axios.delete("http://localhost:8081/user/"+id)
        window.location.reload()
        
      } catch (err) {
        console.log(err);
        
      }
    }
  

    const columns = React.useMemo(
        () => [
          {
            Header: "Name",
            accessor: "name",
          },
          {
            Header: "Content",
            accessor: "content",
            // Use our custom `fuzzyText` filter on this column
          },
          {
            Header: "Category",
            accessor: "category",
            // Use our custom `fuzzyText` filter on this column
          },
          {
            Header: "Action",
            Cell: ({ row }) => (
                <td className="d-flex">
                <NavLink to={`/update/${data.id}`} className="btn btn-primary">
                  Update
                </NavLink>
                <button onClick={e => handleDelete(data.id)} className="btn btn-danger ms-2">
                  Delete
                </button>
              </td>
            ),
          },
        ],
        [data.id]
      );
      




  return (
    <Styles>
      {/* <button onClick={handleReset}>Reset Data</button> */}
      <Table columns={columns} data={data} />
    </Styles>
  );
}

export default TablePagination;

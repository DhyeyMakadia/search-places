import { FC, useEffect, useState } from "react";
import { Cities } from "../../services/types/search";

type Props = {
  data: Cities[];
  setData: (data: Cities[]) => void;
};

const Pagination: FC<Props> = ({ data, setData }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(3);
  const [totalPages, setTotalPages] = useState<number>(
    Math.ceil(data.length / itemsPerPage)
  );

  useEffect(() => {
    setTotalPages(Math.ceil(data.length / itemsPerPage));
    const currentData = data.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
    setData(currentData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, currentPage]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (data.length === 0) {
    return <></>;
  }

  return (
    <div className="pagination">
      <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
        &lt;&lt;
      </button>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      <div className="page-number">{currentPage}</div>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
      <button
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        &gt;&gt;
      </button>
    </div>
  );
};

export default Pagination;

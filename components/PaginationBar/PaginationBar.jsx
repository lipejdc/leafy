import { PageBtn, Select, Bar, PageNumbers } from "./styles";

export default function PaginationBar({
  page,
  totalPages,
  limit,
  setPage,
  setLimit,
  limits = [12, 24, 50, 100],
}) {
  // Custom rendering logic for page numbers with ellipsis
  // Shows first, last, previous, next, current, and ellipsis as needed
  return (
    <Bar>
      <span>
        Plants per page:{" "}
        <Select
          value={limit}
          onChange={(e) => {
            setLimit(Number(e.target.value));
            setPage(1);
          }}
        >
          {limits.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </Select>
      </span>
      <span>
        Page {page} of {totalPages}
      </span>
      <PageNumbers>
        <PageBtn disabled={page === 1} onClick={() => setPage(page - 1)}>
          &lt; Previous
        </PageBtn>
        {/* First page */}
        <PageBtn $active={page === 1} onClick={() => setPage(1)}>
          1
        </PageBtn>
        {/* Ellipsis if current page is far from start */}
        {page > 3 && <span>...</span>}
        {/* Previous page */}
        {page > 2 && (
          <PageBtn onClick={() => setPage(page - 1)}>{page - 1}</PageBtn>
        )}
        {/* Current page (if not first or last) */}
        {page > 1 && page < totalPages && (
          <PageBtn $active onClick={() => setPage(page)}>
            {page}
          </PageBtn>
        )}
        {/* Next page */}
        {page < totalPages - 1 && (
          <PageBtn onClick={() => setPage(page + 1)}>{page + 1}</PageBtn>
        )}
        {/* Ellipsis if current page is far from end */}
        {page < totalPages - 2 && <span>...</span>}
        {/* Last page */}
        {totalPages > 1 && (
          <PageBtn
            $active={page === totalPages}
            onClick={() => setPage(totalPages)}
          >
            {totalPages}
          </PageBtn>
        )}
        <PageBtn
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next &gt;
        </PageBtn>
      </PageNumbers>
    </Bar>
  );
}

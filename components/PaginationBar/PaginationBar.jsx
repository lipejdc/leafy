import { PageBtn, Select, Bar, PageNumbers } from "./styles";

export default function PaginationBar({
  page,
  totalPages,
  limit,
  setPage,
  setLimit,
  limits = [12, 24, 50, 100],
}) {
  // Helper to render page numbers with ellipsis
  function renderPages() {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (page > 4) pages.push("...");
      for (
        let i = Math.max(2, page - 2);
        i <= Math.min(totalPages - 1, page + 2);
        i++
      ) {
        pages.push(i);
      }
      if (page < totalPages - 3) pages.push("...");
      pages.push(totalPages);
    }
    return pages.map((p, idx) =>
      p === "..." ? (
        <span key={idx}>...</span>
      ) : (
        <PageBtn
          key={p}
          active={p === page}
          onClick={() => setPage(p)}
          aria-current={p === page ? "page" : undefined}
        >
          {p}
        </PageBtn>
      )
    );
  }

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
        {renderPages()}
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

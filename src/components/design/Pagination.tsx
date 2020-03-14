import react from "react";
import { def, min } from "../../helpers/common";

interface IPagination {
  pageState: IPageState; // The state of the page to use and update
  setPageState: (pageState: IPageState) => (void); // Function to update the page state
  onPageChange?: (pageState: IPageState) => (void); // A callback function
  useOffset?: boolean; // Indicates whether to set the offset for static page values
}

interface IPageState {
  currentPage: number; // The current page
  perPage: number; // The number of items per page
  totalCount: number; // The total number of items
  offset: number; // An offset for handling static lists
}

interface IPaginationCell {
  targetPage: number; // The target page
  pageText?: string; // Alternate text to put on the link, eg "Last"
  hasLink?: boolean; // Whether to have this as a link or a static button (eg for current page)
}

/**
 * Builds a state and useState to use for pagination
 * @param perPage - number of items per page
 * @param totalCount Total number of items
 */
export function usePageState(perPage: number = 25, totalCount: number = 181) {
  return react.useState({currentPage: 1, perPage, totalCount, offset: 0});
}

/**
 * Renders a single pagination cell
 * @param props See IPaginationCell
 */
function PaginationCell(props: IPaginationCell) {
  const pageText = def<string>(props.pageText, props.targetPage.toString());
  return (
    <div>
      {pageText}
    </div>
  );
}

/**
 * Renders pagination and handles pagination-related actions
 * @param props see IPagination
 */
function Pagination(props: IPagination) {
  const useOffset = def<boolean>(props.useOffset, false);
  const perPage = min(props.pageState.perPage, 1);
  const maxPage = Math.ceil(props.pageState.totalCount / perPage);

  function setPage(page: number) {
    console.log("Page changed to", page);
  }

  /**
   * Renders the pagination cells
   */
  function renderCells() {
    const cells: JSX.Element[] = [];
    const width: number = 2;

    // Render current page
    cells.push(
      <PaginationCell
        targetPage={props.pageState.currentPage}
        hasLink={false}
      />,
    );

    // Render side pages
    for (let i: number = 1; i < width; i++) {
      let targetPage: number = props.pageState.currentPage - i;
      if (targetPage > 0) {
        cells.unshift(<PaginationCell targetPage={targetPage}/>);
      }

      targetPage = props.pageState.currentPage + i;
      if (targetPage <= maxPage) {
        cells.push(<PaginationCell targetPage={targetPage}/>);
      }
    }

    // Render first
    if (props.pageState.currentPage - width >= 1) {
      cells.unshift(<PaginationCell pageText="First" targetPage={1}/>);
    }

    // Render last
    if (props.pageState.currentPage + width <= maxPage) {
      cells.push(<PaginationCell pageText="Last" targetPage={1}/>);
    }

    return cells;
  }

  return (
    <div>
      {renderCells()}
    </div>
  );
}

export default Pagination;

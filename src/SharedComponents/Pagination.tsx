import * as React from 'react';

import styled from 'styled-components';

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

/**
 * Helper method for creating a range of numbers
 * range(1, 5) => [1, 2, 3, 4, 5]
 */
const range = (from: number, to: number, step = 1) => {
  let i = from;
  const rangeArr = [];

  while (i <= to) {
    rangeArr.push(i);
    i += step;
  }

  return rangeArr;
};

export interface PaginationProps {
  onPageChanged: (data: PaginationState) => void;
  pageLimit: number;
  pageNeighbours?: number;
  totalRecords: number;
}

export interface PaginationState {
  currentPage: number;
  totalPages?: number;
  pageLimit?: number;
  totalRecords?: number;
}

const PaginationItem = styled.div.attrs({
  className: 'dtc link dim f6 f5-ns pa3 br bl b--light-silver hover-bg-light-blue hover-white'
})``;

const Container = styled.div.attrs({
  className: 'flex justify-center tc center'
})``;

class Pagination extends React.Component<PaginationProps, PaginationState> {
  private pageLimit: number;
  private totalRecords: number;
  private pageNeighbours: number;
  private totalPages: number;

  constructor(props: PaginationProps) {
    super(props);
    const { totalRecords = null, pageLimit = 30, pageNeighbours = 0 } = props;

    this.pageLimit = typeof pageLimit === 'number' ? pageLimit : 30;
    this.totalRecords = typeof totalRecords === 'number' ? totalRecords : 0;

    // pageNeighbours can be: 0, 1 or 2
    this.pageNeighbours = typeof pageNeighbours === 'number' ? Math.max(0, Math.min(pageNeighbours, 2)) : 0;

    this.totalPages = Math.ceil(this.totalRecords / this.pageLimit);

    this.state = { currentPage: 1 };
  }

  public componentDidMount() {
    this.gotoPage(1);
  }

  public gotoPage = (page: number) => {
    const onPageChanged = this.props.onPageChanged;

    const currentPage = Math.max(0, Math.min(page, this.totalPages));

    const paginationData: PaginationState = {
      currentPage,
      pageLimit: this.pageLimit,
      totalPages: this.totalPages,
      totalRecords: this.totalRecords
    };

    this.setState({ currentPage }, () => onPageChanged(paginationData));
  }

  public handleClick = (page: number) => (evt: React.MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    this.gotoPage(page);
  }

  public handleMoveLeft = (evt: React.MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    this.gotoPage(this.state.currentPage - this.pageNeighbours * 2 - 1);
  }

  public handleMoveRight = (evt: React.MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    this.gotoPage(this.state.currentPage + this.pageNeighbours * 2 + 1);
  }

  /**
   * Let's say we have 10 pages and we set pageNeighbours to 2
   * Given that the current page is 6
   * The pagination control will look like the following:
   *
   * (1) < {4 5} [6] {7 8} > (10)
   *
   * (x) => terminal pages: first and last page(always visible)
   * [x] => represents current page
   * {...x} => represents page neighbours
   */
  public fetchPageNumbers = (): (number | string)[] => {
    const totalPages = this.totalPages;
    const currentPage = this.state.currentPage;
    const pageNeighbours = this.pageNeighbours;

    /**
     * totalNumbers: the total page numbers to show on the control
     * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
     */
    const totalNumbers = this.pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

      let pages: (number | string)[] = range(startPage, endPage);

      /**
       * hasLeftSpill: has hidden pages to the left
       * hasRightSpill: has hidden pages to the right
       * spillOffset: number of hidden pages either to the left or to the right
       */
      const hasLeftSpill = startPage > 2;
      const hasRightSpill = totalPages - endPage > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        // handle: (1) < {5 6} [7] {8 9} (10)
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break;
        }

        // handle: (1) {2 3} [4] {5 6} > (10)
        case !hasLeftSpill && hasRightSpill: {
          const extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, RIGHT_PAGE];
          break;
        }

        // handle: (1) < {4 5} [6] {7 8} > (10)
        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }

      return [1, ...pages, totalPages];
    }

    return range(1, totalPages);
  }

  public render() {
    if (!this.totalRecords || this.totalPages === 1) {
      return null;
    }

    const { currentPage } = this.state;
    const pages = this.fetchPageNumbers();

    return (
      <Container>
        {pages.map((page, index) => {
          if (page === LEFT_PAGE) {
            return (
              <PaginationItem key={index}>
                <a className="link" href="#" aria-label="Previous" onClick={this.handleMoveLeft}>
                  <span aria-hidden="true">&laquo;</span>
                  <span className="sr-only">Previous</span>
                </a>
              </PaginationItem>
            );
          }

          if (page === RIGHT_PAGE) {
            return (
              <PaginationItem key={index}>
                <a className="link" href="#" aria-label="Next" onClick={this.handleMoveRight}>
                  <span aria-hidden="true">&raquo;</span>
                  <span className="sr-only">Next</span>
                </a>
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={index} className={`${currentPage === page ? 'bg-dark-blue' : ''}`}>
              <a
                className={'link ' + `${currentPage === page ? 'white' : 'black'}`}
                href="#"
                onClick={this.handleClick(+page)}
              >
                {page}
              </a>
            </PaginationItem>
          );
        })}
      </Container>
    );
  }
}

export default Pagination;

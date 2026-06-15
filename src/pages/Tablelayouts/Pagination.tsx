import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  maxVisiblePages = 5  // Number of page buttons to show
}) => {
  
  // Generate dynamic page numbers with ellipsis
  const getPageNumbers = () => {
    const pages = [];
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      // Calculate start and end of visible pages
      let start = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2));
      let end = Math.min(totalPages - 1, start + maxVisiblePages - 3);
      
      // Adjust if we're near the end
      if (end === totalPages - 1) {
        start = Math.max(2, end - (maxVisiblePages - 3));
      }
      
      // Add ellipsis after first page if needed
      if (start > 2) {
        pages.push('...');
      }
      
      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      // Add ellipsis before last page if needed
      if (end < totalPages - 1) {
        pages.push('...');
      }
      
      // Always show last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
      // Scroll to top when page changes
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-2 mt-8 mb-4">
      {/* Previous Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="h-9 px-3 hover:bg-gray-100 disabled:opacity-50"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Previous
      </Button>

      {/* Page Numbers */}
      {pageNumbers.map((page, index) => (
        <React.Fragment key={index}>
          {page === '...' ? (
            <span className="px-2 text-gray-500 select-none">...</span>
          ) : (
            <Button
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => handlePageChange(page)}
              className={`h-9 min-w-[2.5rem] font-medium ${
                currentPage === page 
                  ? 'bg-[#2E4D98] hover:bg-[#2E4D98]/90 text-white' 
                  : 'hover:bg-gray-100'
              }`}
            >
              {page}
            </Button>
          )}
        </React.Fragment>
      ))}

      {/* Next Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="h-9 px-3 hover:bg-gray-100 disabled:opacity-50"
      >
        Next
        <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  );
};

export default Pagination;
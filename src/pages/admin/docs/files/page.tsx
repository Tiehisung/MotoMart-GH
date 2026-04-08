import InfiniteLimitScroller from "@/components/InfiniteScroll";
import { PrimarySearch } from "@/components/Search";
import { useGetDocumentsQuery } from "@/services/docs.endpoints";
import DataErrorAlert from "@/components/error/DataError";
import TableLoader from "@/components/loaders/Table";
import { DocumentFileCard } from "../UploadedFilesDisplay";
import { sParamsToObject } from "@/lib/searchParams";

const AllDocsPage = () => {
  const {
    data: docsData,
    isLoading,
    error,
  } = useGetDocumentsQuery(sParamsToObject());
  const docs = docsData;

  if (isLoading) {
    return <TableLoader cols={1} rows={5} />;
  }

  if (error && !docsData?.data) {
    return <DataErrorAlert message={error} />;
  }

  return (
    <div className="">
      <PrimarySearch
        type="search"
        listId="docs-search"
        searchKey="doc_search"
        placeholder="Search document"
        inputStyles="h-8 placeholder:capitalize"
        className="mb-4"
      />
      <main>
        {docs?.data?.length == 0 ? (
          <p className="_label">No Documents available</p>
        ) : (
          <div className="mb-6 space-y-2">
            {docs?.data?.map((doc) => (
              <DocumentFileCard key={doc._id} file={doc} />
            ))}
          </div>
        )}
      </main>
      <InfiniteLimitScroller pagination={docs?.pagination} />
    </div>
  );
};

export default AllDocsPage;

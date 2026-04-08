import Loader from "@/components/loaders/Loader";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useGetDocumentsQuery } from "@/services/docs.endpoints";
import Divider from "@/components/Divider";
import DataErrorAlert from "@/components/error/DataError";
import { DocumentFileCard } from "./UploadedFilesDisplay";

export function RecentDocs() {
  // Use the query hook instead of server-side fetch
  const {
    data: recentDocs,
    isLoading,
    error,
  } = useGetDocumentsQuery({});

  if (isLoading) {
    return (
      <div>
        <header className="items-center justify-between mb-4">
          <Divider
            content="RECENT DOCUMENTS"
            className="text-xs font-light grow"
          />
        </header>
        <Loader />
      </div>
    );
  }

  if (error && !isLoading && !recentDocs?.data)
    return <DataErrorAlert message={error} />;

  return (
    <div>
      <header className="items-center justify-between mb-4">
        <Divider
          content="RECENT DOCUMENTS"
          className="text-xs font-light grow"
        />
      </header>
      <main>
        {!recentDocs ? (
          <Loader />
        ) : (
          <div className="mb-6 space-y-2 divide-y">
            {!recentDocs?.data || (recentDocs?.data?.length ?? 0) === 0 ? (
              <li className="_label">No Documents available</li>
            ) : (
              recentDocs?.data?.map((doc,  ) => (
                <DocumentFileCard key={doc._id} file={doc} />
              ))
            )}
            <div className="py-6">
              <Link
                to="/admin/docs/files"
                className="_link border rounded-full py-2 px-5 flex items-center justify-between gap-3"
              >
                View More <ChevronRight />
              </Link>
            </div>
          </div>
        )}
      </main>
      <br />
    </div>
  );
}

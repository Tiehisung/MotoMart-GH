import AdminNews from "./News";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetNewsQuery } from "@/services/news.endpoints";
import { AlertCircle, Plus } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/buttons/Button";
import TableLoader from "@/components/loaders/Table";
import { useIsMobile } from "@/hooks/use-mobile";
import { H } from "@/components/Element";

const AdminNewsPage = () => {
  const [searchParams] = useSearchParams();
  const paramsString = searchParams.toString();

  const { data: news, isLoading, error } = useGetNewsQuery(paramsString);
  const navigate = useNavigate();
  const ismobile = useIsMobile();
  
  if (isLoading) {
    return (
      <div>
        <h1 className="_title px-6 text-primaryRed uppercase">
          News Publisher
        </h1>
        <div className="flex justify-center items-center min-h-100">
          <TableLoader
            className="h-24 rounded-md"
            cols={ismobile ? 1 : 3}
            rows={ismobile ? 2 : 3}
          />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1 className="_title px-6 text-primaryRed uppercase">
          News Publisher
        </h1>
        <div className="px-6">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Failed to load news: {(error as any)?.message || "Unknown error"}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div>
      <header className="flex items-center gap-4 px-3 flex-wrap justify-between uppercase">
        <H  >
          News Publisher{" "}
        </H>
        <Button onClick={() => navigate("/admin/news/create-news")}>
          <Plus /> Create
        </Button>
      </header>

      <AdminNews news={news} />
    </div>
  );
};

export default AdminNewsPage;

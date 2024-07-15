import { useActivities } from "@/integrations/supabase";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";

const ActivityLog = () => {
  const { data: activities, isLoading, error } = useActivities();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Activity Log</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Started At</TableHead>
            <TableHead>Ended At</TableHead>
            <TableHead>Distance</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activities.map((activity) => (
            <TableRow key={activity.id}>
              <TableCell>{activity.type}</TableCell>
              <TableCell>{format(new Date(activity.started_at), 'PPpp')}</TableCell>
              <TableCell>{format(new Date(activity.ended_at), 'PPpp')}</TableCell>
              <TableCell>{activity.distance} meters</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ActivityLog;
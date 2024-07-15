import { useActivities, useAddActivity } from "@/integrations/supabase";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { useState } from "react";

const ActivityLog = () => {
  const { data: activities, isLoading, error } = useActivities();
  const addActivity = useAddActivity();
  const [newActivity, setNewActivity] = useState({
    sport: "",
    started_at: "",
    ended_at: "",
    distance: "",
    type: "",
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewActivity((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setNewActivity((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addActivity.mutate(newActivity, {
      onSuccess: () => {
        setNewActivity({
          sport: "",
          started_at: "",
          ended_at: "",
          distance: "",
          type: "",
        });
      },
    });
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Activity Log</h1>
      
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <Select name="sport" onValueChange={(value) => handleSelectChange("sport", value)} value={newActivity.sport}>
          <SelectTrigger>
            <SelectValue placeholder="Select sport" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="run">Run</SelectItem>
            <SelectItem value="ride">Ride</SelectItem>
            <SelectItem value="swim">Swim</SelectItem>
          </SelectContent>
        </Select>
        <Input
          type="datetime-local"
          name="started_at"
          value={newActivity.started_at}
          onChange={handleInputChange}
          placeholder="Started At"
        />
        <Input
          type="datetime-local"
          name="ended_at"
          value={newActivity.ended_at}
          onChange={handleInputChange}
          placeholder="Ended At"
        />
        <Input
          type="number"
          name="distance"
          value={newActivity.distance}
          onChange={handleInputChange}
          placeholder="Distance (meters)"
        />
        <Select name="type" onValueChange={(value) => handleSelectChange("type", value)} value={newActivity.type}>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="race">Race</SelectItem>
            <SelectItem value="long">Long</SelectItem>
            <SelectItem value="recovery">Recovery</SelectItem>
          </SelectContent>
        </Select>
        <Button type="submit">Add Activity</Button>
      </form>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sport</TableHead>
            <TableHead>Started At</TableHead>
            <TableHead>Ended At</TableHead>
            <TableHead>Distance</TableHead>
            <TableHead>Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activities.map((activity) => (
            <TableRow key={activity.id}>
              <TableCell>{activity.sport}</TableCell>
              <TableCell>{format(new Date(activity.started_at), 'PPpp')}</TableCell>
              <TableCell>{format(new Date(activity.ended_at), 'PPpp')}</TableCell>
              <TableCell>{activity.distance} meters</TableCell>
              <TableCell>{activity.type || 'N/A'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ActivityLog;
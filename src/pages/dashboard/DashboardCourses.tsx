
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, File } from "lucide-react";

export default function DashboardCourses() {
  // Example course data
  const courses = [
    {
      id: "1",
      title: "Introduction au développement web",
      progress: 75,
      lastAccessed: "18 Avril 2025",
      status: "in-progress"
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold">Mes cours</h1>
          <p className="text-muted-foreground">
            Suivez votre progression dans vos cours
          </p>
        </div>

        {courses.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titre du cours</TableHead>
                <TableHead>Progression</TableHead>
                <TableHead>Dernier accès</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">{course.title}</TableCell>
                  <TableCell>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-muted-foreground mt-1">
                      {course.progress}%
                    </span>
                  </TableCell>
                  <TableCell>{course.lastAccessed}</TableCell>
                  <TableCell>
                    {course.status === "completed" ? (
                      <Badge variant="success">Terminé</Badge>
                    ) : (
                      <Badge variant="default">En cours</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" className="gap-1">
                        <Play className="h-3 w-3" />
                        Continuer
                      </Button>
                      <Button size="sm" variant="outline" className="gap-1">
                        <File className="h-3 w-3" />
                        Notes
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8 bg-muted/20 rounded-lg">
            <p className="text-muted-foreground mb-4">
              Vous n'avez pas encore inscrit à des cours.
            </p>
            <Button>Explorer les cours</Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

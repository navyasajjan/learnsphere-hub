import { Course } from '@/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, BookOpen, TrendingUp } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  actionButton?: {
    label: string;
    onClick: () => void;
  };
}

export function CourseCard({ course, actionButton }: CourseCardProps) {
  const difficultyColors = {
    Beginner: 'bg-success/10 text-success border-success/20',
    Intermediate: 'bg-warning/10 text-warning border-warning/20',
    Advanced: 'bg-destructive/10 text-destructive border-destructive/20',
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="h-2 bg-gradient-primary" />
      
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
              {course.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {course.sector} • {course.category}
            </p>
          </div>
          <Badge variant="outline" className={difficultyColors[course.difficulty]}>
            {course.difficulty}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {course.description}
        </p>

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="text-xs">
            {course.scormType}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            v{course.version}
          </Badge>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{course.duration} min</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span>{course.tags.length} topics</span>
          </div>
        </div>
      </CardContent>

      {actionButton && (
        <CardFooter>
          <Button 
            onClick={actionButton.onClick}
            className="w-full"
          >
            {actionButton.label}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}

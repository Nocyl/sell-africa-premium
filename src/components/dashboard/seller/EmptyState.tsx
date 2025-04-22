
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface EmptyStateProps {
  title: string;
  description: string;
  icon: ReactNode;
  actionLabel: string;
  actionLink: string;
}

export default function EmptyState({
  title,
  description,
  icon,
  actionLabel,
  actionLink
}: EmptyStateProps) {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 border border-dashed rounded-lg bg-muted/30 text-center h-60">
      <div className="bg-primary/10 p-3 rounded-full text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-sm">
        {description}
      </p>
      <Button onClick={() => navigate(actionLink)}>
        {actionLabel}
      </Button>
    </div>
  );
}

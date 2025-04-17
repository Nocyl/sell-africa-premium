
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface PageHeaderProps {
  title: string;
  description: string;
  bgColor?: string;
  showButton?: boolean;
  buttonText?: string;
  buttonLink?: string;
}

const PageHeader = ({
  title,
  description,
  bgColor = "bg-gray-50",
  showButton = false,
  buttonText = "En savoir plus",
  buttonLink = "#",
}: PageHeaderProps) => {
  return (
    <div className={`py-12 md:py-16 ${bgColor}`}>
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{title}</h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            {description}
          </p>
          
          {showButton && (
            <Button asChild size="lg" className="bg-worldsell-orange-400 hover:bg-worldsell-orange-500">
              <Link to={buttonLink}>{buttonText}</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;


import { Link } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProductCategoryNav = () => {
  const categories = [
    { name: "Tous", path: "/products" },
    { name: "Digital", path: "/digital" },
    { name: "Physique", path: "/physical" },
    { name: "Formations", path: "/courses" },
    { name: "Nouveautés", path: "/products?filter=new" },
    { name: "Populaires", path: "/products?filter=popular" },
  ];

  return (
    <div className="border-b pb-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Catégories</h2>
        <Tabs defaultValue="all">
          <TabsList>
            {categories.map((category) => (
              <TabsTrigger key={category.name} value={category.name.toLowerCase()} asChild>
                <Link to={category.path}>{category.name}</Link>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductCategoryNav;

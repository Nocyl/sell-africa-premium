
import { Link, useLocation } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

const ProductCategoryNav = () => {
  const location = useLocation();
  const categories = [
    { name: "Tous", path: "/products" },
    { name: "Digital", path: "/digital" },
    { name: "Physique", path: "/physical" },
    { name: "Formations", path: "/courses" },
    { name: "Nouveautés", path: "/products?filter=new" },
    { name: "Populaires", path: "/products?filter=popular" },
  ];

  const isActive = (path: string) => {
    if (path.includes("?")) {
      return location.search === path.split("?")[1];
    }
    return location.pathname === path;
  };

  return (
    <div className="border-b pb-4">
      <div className="flex justify-between items-center">
        <motion.h2 
          className="text-xl font-semibold"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          Catégories
        </motion.h2>
        <Tabs defaultValue={location.pathname} className="w-auto">
          <TabsList className="bg-muted/50 p-1">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <TabsTrigger
                  value={category.path}
                  className="relative data-[state=active]:bg-background"
                  asChild
                >
                  <Link 
                    to={category.path}
                    className="flex items-center gap-2 px-3 py-1.5 transition-all"
                  >
                    {category.name}
                    {isActive(category.path) && (
                      <motion.div
                        layoutId="active-category"
                        className="absolute inset-0 bg-background rounded-md shadow-sm"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                </TabsTrigger>
              </motion.div>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductCategoryNav;

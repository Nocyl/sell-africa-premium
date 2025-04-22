
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  BookOpen, 
  Plus, 
  ArrowLeft, 
  FileText, 
  ImageIcon, 
  Video, 
  Upload, 
  Trash2, 
  DollarSign, 
  PercentSquare, 
  Check,
  PlayCircle,
  Clock,
  Users,
  BookPlus,
  FileText as FileTextIcon,
  Download,
  Settings
} from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import EmptyState from "@/components/dashboard/seller/EmptyState";
import { Badge } from "@/components/ui/badge";

const courseSchema = z.object({
  title: z.string().min(3, "Le titre doit contenir au moins 3 caractères"),
  slug: z.string().min(3, "Le slug doit contenir au moins 3 caractères"),
  price: z.string().min(1, "Le prix est requis"),
  salePrice: z.string().optional(),
  category: z.string().min(1, "La catégorie est requise"),
  level: z.enum(["beginner", "intermediate", "advanced", "all-levels"]),
  description: z.string().min(10, "La description doit contenir au moins 10 caractères"),
  shortDescription: z.string().min(10, "La description courte doit contenir au moins 10 caractères"),
  goals: z.string().min(10, "Les objectifs doivent contenir au moins 10 caractères"),
  requirements: z.string().min(10, "Les prérequis doivent contenir au moins 10 caractères"),
  duration: z.string().min(1, "La durée est requise"),
  published: z.boolean(),
  featured: z.boolean(),
  hasCertificate: z.boolean(),
});

type CourseFormValues = z.infer<typeof courseSchema>;

interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  title: string;
  type: "video" | "text" | "quiz";
  duration: string;
  description: string;
}

export default function SellerAddCourse() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"info" | "media" | "curriculum" | "pricing" | "quiz" | "seo" | "preview">("info");
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [sections, setSections] = useState<Section[]>([
    {
      id: "section-1",
      title: "Introduction au cours",
      lessons: [
        {
          id: "lesson-1",
          title: "Bienvenue et présentation",
          type: "video",
          duration: "5:30",
          description: "Une introduction au cours et à son contenu."
        }
      ]
    }
  ]);
  
  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      slug: "",
      price: "",
      salePrice: "",
      category: "",
      level: "all-levels",
      description: "",
      shortDescription: "",
      goals: "",
      requirements: "",
      duration: "",
      published: false,
      featured: false,
      hasCertificate: false,
    },
  });
  
  const handleAddImage = () => {
    // In a real app this would upload an image
    const mockImages = [
      "https://api.dicebear.com/7.x/shapes/svg?seed=course1",
      "https://api.dicebear.com/7.x/shapes/svg?seed=course2",
      "https://api.dicebear.com/7.x/shapes/svg?seed=course3",
      "https://api.dicebear.com/7.x/shapes/svg?seed=course4",
    ];
    
    const randomImage = mockImages[Math.floor(Math.random() * mockImages.length)];
    setImages([...images, randomImage]);
  };
  
  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };
  
  const handleAddSection = () => {
    const newSection: Section = {
      id: `section-${sections.length + 1}`,
      title: `Section ${sections.length + 1}`,
      lessons: []
    };
    
    setSections([...sections, newSection]);
  };
  
  const handleUpdateSectionTitle = (sectionId: string, newTitle: string) => {
    setSections(sections.map(section => 
      section.id === sectionId ? { ...section, title: newTitle } : section
    ));
  };
  
  const handleRemoveSection = (sectionId: string) => {
    setSections(sections.filter(section => section.id !== sectionId));
  };
  
  const handleAddLesson = (sectionId: string, type: "video" | "text" | "quiz") => {
    const sectionIndex = sections.findIndex(section => section.id === sectionId);
    if (sectionIndex === -1) return;
    
    const newLesson: Lesson = {
      id: `lesson-${Date.now()}`,
      title: `Nouvelle leçon`,
      type,
      duration: type === "video" ? "0:00" : "5 min",
      description: "Description de la leçon"
    };
    
    const updatedSections = [...sections];
    updatedSections[sectionIndex].lessons.push(newLesson);
    setSections(updatedSections);
  };
  
  const handleUpdateLesson = (sectionId: string, lessonId: string, fields: Partial<Lesson>) => {
    setSections(sections.map(section => {
      if (section.id !== sectionId) return section;
      
      return {
        ...section,
        lessons: section.lessons.map(lesson => 
          lesson.id === lessonId ? { ...lesson, ...fields } : lesson
        )
      };
    }));
  };
  
  const handleRemoveLesson = (sectionId: string, lessonId: string) => {
    setSections(sections.map(section => {
      if (section.id !== sectionId) return section;
      
      return {
        ...section,
        lessons: section.lessons.filter(lesson => lesson.id !== lessonId)
      };
    }));
  };
  
  const onSubmit = (data: CourseFormValues) => {
    setLoading(true);
    
    // Calculate total duration from all lessons
    const totalMinutes = sections.flatMap(section => section.lessons)
      .reduce((acc, lesson) => {
        // Convert duration string to minutes
        if (lesson.type === "video") {
          const [min, sec] = lesson.duration.split(":").map(Number);
          return acc + min + (sec / 60);
        }
        return acc + 5; // Default 5 minutes for text/quiz
      }, 0);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Form data:", data);
      console.log("Sections:", sections);
      console.log("Images:", images);
      console.log("Total duration:", totalMinutes);
      
      toast.success("Cours créé avec succès!");
      setLoading(false);
      navigate("/seller/courses");
    }, 1500);
  };
  
  const getStepTitle = () => {
    switch (step) {
      case "info":
        return "Informations générales";
      case "media":
        return "Médias";
      case "curriculum":
        return "Programme du cours";
      case "pricing":
        return "Prix et options";
      case "quiz":
        return "Quiz et évaluations";
      case "seo":
        return "SEO";
      case "preview":
        return "Aperçu";
    }
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <Button
              variant="ghost"
              size="sm"
              className="mb-2"
              onClick={() => navigate("/seller/courses")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour aux cours
            </Button>
            <h1 className="text-2xl font-bold">Ajouter un cours</h1>
            <p className="text-muted-foreground">
              {getStepTitle()}
            </p>
          </div>
          
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <Button 
              variant="outline" 
              onClick={() => navigate("/seller/courses")}
            >
              Annuler
            </Button>
            <Button 
              disabled={loading}
              onClick={form.handleSubmit(onSubmit)}
            >
              {loading ? "Création..." : "Créer le cours"}
            </Button>
          </div>
        </div>
        
        <Tabs value={step} onValueChange={(value) => setStep(value as any)}>
          <TabsList className="grid grid-cols-3 md:grid-cols-7 mb-6">
            <TabsTrigger value="info">Information</TabsTrigger>
            <TabsTrigger value="media">Médias</TabsTrigger>
            <TabsTrigger value="curriculum">Programme</TabsTrigger>
            <TabsTrigger value="pricing">Prix</TabsTrigger>
            <TabsTrigger value="quiz">Quiz</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
            <TabsTrigger value="preview">Aperçu</TabsTrigger>
          </TabsList>
          
          <ScrollArea className="h-[calc(100vh-240px)]">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pb-10">
                <TabsContent value="info" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Informations du cours</CardTitle>
                      <CardDescription>
                        Les informations de base sur votre cours.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Titre du cours</FormLabel>
                            <FormControl>
                              <Input placeholder="ex: Formation Complète WordPress" {...field} />
                            </FormControl>
                            <FormDescription>
                              Le titre sera visible par les étudiants.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="slug"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Slug</FormLabel>
                            <FormControl>
                              <Input placeholder="ex: formation-complete-wordpress" {...field} />
                            </FormControl>
                            <FormDescription>
                              L'URL de votre cours (sans espaces ni caractères spéciaux).
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="level"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Niveau du cours</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Sélectionner un niveau" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="beginner">Débutant</SelectItem>
                                  <SelectItem value="intermediate">Intermédiaire</SelectItem>
                                  <SelectItem value="advanced">Avancé</SelectItem>
                                  <SelectItem value="all-levels">Tous niveaux</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                Le niveau de difficulté du cours.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Catégorie</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Sélectionner une catégorie" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="web-development">Développement Web</SelectItem>
                                  <SelectItem value="design">Design</SelectItem>
                                  <SelectItem value="marketing">Marketing</SelectItem>
                                  <SelectItem value="business">Business</SelectItem>
                                  <SelectItem value="technology">Technologie</SelectItem>
                                  <SelectItem value="photography">Photographie</SelectItem>
                                  <SelectItem value="music">Musique</SelectItem>
                                  <SelectItem value="other">Autre</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                Catégoriser votre cours aide les étudiants à le trouver.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="shortDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description courte</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Une brève description du cours..." 
                                rows={3}
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Résumé concis qui apparaîtra dans les listes de cours.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description complète</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Description détaillée du cours..." 
                                rows={6}
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Description détaillée qui apparaîtra sur la page du cours.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="goals"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Objectifs du cours</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Ce que les étudiants apprendront..." 
                                rows={4}
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Listez ce que les étudiants apprendront (séparez par des lignes).
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="requirements"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Prérequis</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Ce que les étudiants doivent savoir avant de commencer..." 
                                rows={4}
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Listez les connaissances requises (séparez par des lignes).
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="duration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Durée estimée (en heures)</FormLabel>
                            <FormControl>
                              <Input type="text" placeholder="ex: 12.5" {...field} />
                            </FormControl>
                            <FormDescription>
                              Durée totale estimée du cours en heures.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" type="button" onClick={() => navigate("/seller/courses")}>
                        Annuler
                      </Button>
                      <Button type="button" onClick={() => setStep("media")}>
                        Continuer
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="media" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Images et médias</CardTitle>
                      <CardDescription>
                        Ajoutez des images et une vidéo de présentation à votre cours.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <Label className="mb-2 block">Image principale du cours</Label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          {images.map((image, index) => (
                            <div key={index} className="relative group">
                              <img 
                                src={image} 
                                alt={`Course ${index}`}
                                className="w-full aspect-video object-cover rounded-md border"
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => handleRemoveImage(index)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full aspect-video flex flex-col items-center justify-center gap-2 border-dashed"
                            onClick={handleAddImage}
                          >
                            <ImageIcon className="h-8 w-8 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">Ajouter une image</span>
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Ajoutez jusqu'à 5 images. La première image sera utilisée comme miniature.
                        </p>
                      </div>
                      
                      <div>
                        <Label className="mb-2 block">Vidéo de présentation</Label>
                        <div className="border border-dashed rounded-md p-6 text-center">
                          <Video className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                          <h3 className="text-lg font-medium mb-1">Déposez votre vidéo ici</h3>
                          <p className="text-sm text-muted-foreground mb-4">ou cliquez pour parcourir vos fichiers</p>
                          <Button variant="outline" type="button">
                            Parcourir les fichiers
                          </Button>
                          <p className="text-xs text-muted-foreground mt-4">
                            Formats acceptés: MP4, MOV, AVI (max 500MB). Une vidéo de présentation de 2-3 minutes est recommandée.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" type="button" onClick={() => setStep("info")}>
                        Retour
                      </Button>
                      <Button type="button" onClick={() => setStep("curriculum")}>
                        Continuer
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="curriculum" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Programme du cours</CardTitle>
                      <CardDescription>
                        Organisez votre cours en sections et leçons.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {sections.map((section, sectionIndex) => (
                        <div key={section.id} className="border rounded-md p-4 space-y-4">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex-1">
                              <Input 
                                value={section.title}
                                onChange={(e) => handleUpdateSectionTitle(section.id, e.target.value)}
                                placeholder="Titre de la section"
                                className="font-medium"
                              />
                            </div>
                            <div className="flex items-center gap-2">
                              <Button 
                                type="button" 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleRemoveSection(section.id)}
                                disabled={sections.length === 1}
                              >
                                Supprimer
                              </Button>
                            </div>
                          </div>
                          
                          <div className="ml-4 space-y-3">
                            {section.lessons.map((lesson, lessonIndex) => (
                              <div key={lesson.id} className="border rounded-md p-3 space-y-3">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                  <div className="flex items-center gap-2 flex-1">
                                    {lesson.type === "video" && <PlayCircle className="h-4 w-4 text-blue-500" />}
                                    {lesson.type === "text" && <FileTextIcon className="h-4 w-4 text-green-500" />}
                                    {lesson.type === "quiz" && <BookPlus className="h-4 w-4 text-purple-500" />}
                                    <Input 
                                      value={lesson.title}
                                      onChange={(e) => handleUpdateLesson(section.id, lesson.id, { title: e.target.value })}
                                      placeholder="Titre de la leçon"
                                      className="flex-1"
                                    />
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="flex items-center text-sm text-muted-foreground">
                                      <Clock className="h-3.5 w-3.5 mr-1" />
                                      <Input 
                                        value={lesson.duration}
                                        onChange={(e) => handleUpdateLesson(section.id, lesson.id, { duration: e.target.value })}
                                        placeholder="Durée"
                                        className="w-16 h-7 text-xs"
                                      />
                                    </div>
                                    <Button 
                                      type="button" 
                                      variant="ghost" 
                                      size="icon"
                                      onClick={() => handleRemoveLesson(section.id, lesson.id)}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                                
                                <div>
                                  <Textarea 
                                    value={lesson.description}
                                    onChange={(e) => handleUpdateLesson(section.id, lesson.id, { description: e.target.value })}
                                    placeholder="Description de la leçon..."
                                    rows={2}
                                    className="text-sm"
                                  />
                                </div>
                              </div>
                            ))}
                            
                            <div className="flex flex-wrap gap-2 mt-2">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-1"
                                onClick={() => handleAddLesson(section.id, "video")}
                              >
                                <PlayCircle className="h-3.5 w-3.5" />
                                <span>Ajouter une vidéo</span>
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-1"
                                onClick={() => handleAddLesson(section.id, "text")}
                              >
                                <FileTextIcon className="h-3.5 w-3.5" />
                                <span>Ajouter un texte</span>
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-1"
                                onClick={() => handleAddLesson(section.id, "quiz")}
                              >
                                <BookPlus className="h-3.5 w-3.5" />
                                <span>Ajouter un quiz</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full py-6 flex items-center justify-center gap-2"
                        onClick={handleAddSection}
                      >
                        <Plus className="h-4 w-4" />
                        <span>Ajouter une nouvelle section</span>
                      </Button>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" type="button" onClick={() => setStep("media")}>
                        Retour
                      </Button>
                      <Button type="button" onClick={() => setStep("pricing")}>
                        Continuer
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="pricing" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Prix et options</CardTitle>
                      <CardDescription>
                        Configurez les prix et les options de votre cours.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="price"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Prix régulier</FormLabel>
                              <div className="relative">
                                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                <FormControl>
                                  <Input 
                                    type="number" 
                                    className="pl-10" 
                                    placeholder="0.00" 
                                    {...field} 
                                  />
                                </FormControl>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="salePrice"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Prix promo (optionnel)</FormLabel>
                              <div className="relative">
                                <PercentSquare className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                <FormControl>
                                  <Input 
                                    type="number" 
                                    className="pl-10" 
                                    placeholder="0.00" 
                                    {...field} 
                                  />
                                </FormControl>
                              </div>
                              <FormDescription>
                                Laissez vide si vous n'avez pas de promotion.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                        <FormField
                          control={form.control}
                          name="published"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Publié</FormLabel>
                                <FormDescription>
                                  Rendre ce cours disponible à l'achat
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="featured"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Mis en avant</FormLabel>
                                <FormDescription>
                                  Mettre en avant sur la page d'accueil
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="hasCertificate"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Certificat</FormLabel>
                                <FormDescription>
                                  Délivrer un certificat de réussite
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" type="button" onClick={() => setStep("curriculum")}>
                        Retour
                      </Button>
                      <Button type="button" onClick={() => setStep("quiz")}>
                        Continuer
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="quiz" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Quiz et évaluations</CardTitle>
                      <CardDescription>
                        Configurez les quiz et évaluations pour votre cours.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="border rounded-lg p-6 bg-purple-50">
                        <div className="flex items-center gap-3 mb-4">
                          <Badge variant="outline" className="bg-purple-100 text-purple-800 hover:bg-purple-100">
                            Fonctionnalité Pro
                          </Badge>
                          <h3 className="text-lg font-semibold">Système avancé de quiz et évaluations</h3>
                        </div>
                        
                        <p className="text-muted-foreground mb-6">
                          Créez des quiz interactifs, des examens chronométrés et des exercices pratiques pour évaluer les connaissances de vos étudiants.
                          Les fonctionnalités avancées incluent différents types de questions, notation automatique, et certificats de réussite.
                        </p>
                        
                        <div className="space-y-4">
                          <div className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-green-500 mt-0.5" />
                            <div>
                              <p className="font-medium">Différents types de questions</p>
                              <p className="text-sm text-muted-foreground">QCM, vrai/faux, réponses courtes, glisser-déposer</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-green-500 mt-0.5" />
                            <div>
                              <p className="font-medium">Notation automatique</p>
                              <p className="text-sm text-muted-foreground">Évaluez les réponses instantanément avec feedback personnalisé</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-green-500 mt-0.5" />
                            <div>
                              <p className="font-medium">Certificats personnalisables</p>
                              <p className="text-sm text-muted-foreground">Créez des certificats avec votre propre design</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-green-500 mt-0.5" />
                            <div>
                              <p className="font-medium">Analyses détaillées</p>
                              <p className="text-sm text-muted-foreground">Suivez les performances des étudiants avec des statistiques détaillées</p>
                            </div>
                          </div>
                        </div>
                        
                        <Button className="mt-6" variant="default">
                          Passer au plan Pro
                        </Button>
                      </div>
                      
                      <div className="bg-gray-50 border rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-2">Quiz basique</h3>
                        <p className="text-muted-foreground mb-4">
                          Vous pouvez toujours créer des quiz simples en utilisant le système de leçons standard.
                        </p>
                        
                        <div className="space-y-4">
                          <div>
                            <Label>Titre du quiz</Label>
                            <Input placeholder="ex: Quiz module 1" />
                          </div>
                          
                          <div>
                            <Label>Description</Label>
                            <Textarea 
                              placeholder="Instructions pour le quiz..." 
                              rows={3}
                            />
                          </div>
                          
                          <div>
                            <Label>Score de réussite (%)</Label>
                            <Input type="number" placeholder="70" defaultValue="70" />
                          </div>
                          
                          <Button variant="outline" className="w-full">
                            <Plus className="h-4 w-4 mr-2" />
                            Ajouter un quiz basique
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" type="button" onClick={() => setStep("pricing")}>
                        Retour
                      </Button>
                      <Button type="button" onClick={() => setStep("seo")}>
                        Continuer
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="seo" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>SEO et visibilité</CardTitle>
                      <CardDescription>
                        Optimisez la visibilité de votre cours sur les moteurs de recherche.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="meta-title">Titre Meta</Label>
                        <Input id="meta-title" placeholder="Titre pour les moteurs de recherche" />
                        <p className="text-sm text-muted-foreground mt-1">
                          Recommandé: 50-60 caractères
                        </p>
                      </div>
                      
                      <div>
                        <Label htmlFor="meta-description">Description Meta</Label>
                        <Textarea 
                          id="meta-description" 
                          placeholder="Description pour les moteurs de recherche"
                          rows={3}
                        />
                        <p className="text-sm text-muted-foreground mt-1">
                          Recommandé: 150-160 caractères
                        </p>
                      </div>
                      
                      <div>
                        <Label htmlFor="tags">Tags</Label>
                        <Input id="tags" placeholder="Entrez des tags séparés par des virgules" />
                        <p className="text-sm text-muted-foreground mt-1">
                          Ex: wordpress, débutant, web
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                        <div>
                          <Label>Prévisualisation Google</Label>
                          <div className="mt-2 border rounded-md p-4 bg-white">
                            <p className="text-blue-600 text-lg truncate">
                              {form.watch("title") || "Titre du cours"}
                            </p>
                            <p className="text-green-700 text-sm truncate">
                              worldsell.com/course/{form.watch("slug") || "url-du-cours"}
                            </p>
                            <p className="text-gray-600 text-sm line-clamp-2">
                              {form.watch("shortDescription") || "Description courte du cours qui apparaîtra dans les résultats de recherche Google."}
                            </p>
                          </div>
                        </div>
                        
                        <div>
                          <Label>Partage sur les réseaux sociaux</Label>
                          <div className="mt-2 border rounded-md p-4 bg-gray-100">
                            <div className="flex items-start gap-2">
                              {images.length > 0 ? (
                                <img 
                                  src={images[0]} 
                                  alt="Course thumbnail" 
                                  className="w-12 h-12 rounded object-cover"
                                />
                              ) : (
                                <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                                  <BookOpen className="h-6 w-6 text-gray-400" />
                                </div>
                              )}
                              <div>
                                <p className="font-medium text-sm">
                                  {form.watch("title") || "Titre du cours"}
                                </p>
                                <p className="text-xs text-gray-600 line-clamp-2">
                                  {form.watch("shortDescription") || "Description du cours."}
                                </p>
                                <p className="text-xs text-blue-500 mt-1">
                                  worldsell.com
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" type="button" onClick={() => setStep("quiz")}>
                        Retour
                      </Button>
                      <Button type="button" onClick={() => setStep("preview")}>
                        Continuer
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="preview" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Résumé du cours</CardTitle>
                      <CardDescription>
                        Vérifiez les informations du cours avant de le créer.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <div className="aspect-video bg-gray-100 rounded-md overflow-hidden mb-4">
                            {images.length > 0 ? (
                              <img 
                                src={images[0]} 
                                alt="Course preview" 
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <BookOpen className="h-16 w-16 text-gray-300" />
                              </div>
                            )}
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <h3 className="font-medium mb-2">Programme du cours</h3>
                              <div className="space-y-2">
                                {sections.map((section, index) => (
                                  <div key={section.id} className="border rounded-md p-3">
                                    <p className="font-medium">{section.title}</p>
                                    <ul className="mt-1 space-y-1">
                                      {section.lessons.map((lesson) => (
                                        <li key={lesson.id} className="flex items-center gap-2 text-sm text-muted-foreground">
                                          {lesson.type === "video" && <PlayCircle className="h-3.5 w-3.5 text-blue-500" />}
                                          {lesson.type === "text" && <FileTextIcon className="h-3.5 w-3.5 text-green-500" />}
                                          {lesson.type === "quiz" && <BookPlus className="h-3.5 w-3.5 text-purple-500" />}
                                          <span>{lesson.title}</span>
                                          <span className="text-xs ml-auto">{lesson.duration}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <h2 className="text-2xl font-bold">{form.watch("title") || "Titre du cours"}</h2>
                          
                          <div className="flex items-center gap-2">
                            <Badge>
                              {form.watch("level") === "beginner" ? "Débutant" : 
                               form.watch("level") === "intermediate" ? "Intermédiaire" : 
                               form.watch("level") === "advanced" ? "Avancé" : "Tous niveaux"}
                            </Badge>
                            <Badge variant="outline">
                              {form.watch("category") || "Sans catégorie"}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <p className="text-2xl font-bold">
                              {form.watch("price") ? `$${form.watch("price")}` : "$0.00"}
                            </p>
                            {form.watch("salePrice") && (
                              <p className="text-lg text-muted-foreground line-through">
                                ${form.watch("salePrice")}
                              </p>
                            )}
                          </div>
                          
                          <p className="text-muted-foreground">
                            {form.watch("shortDescription") || "Description courte du cours."}
                          </p>
                          
                          <div className="pt-2">
                            <div className="flex items-center gap-2 mb-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>{form.watch("duration") || "0"} heures de contenu</span>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                              <FileTextIcon className="h-4 w-4 text-muted-foreground" />
                              <span>{sections.reduce((acc, s) => acc + s.lessons.length, 0)} leçons</span>
                            </div>
                            <div className="flex items-center gap-2 mb-4">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span>0 étudiants inscrits</span>
                            </div>
                          </div>
                          
                          <div className="pt-2">
                            <h3 className="font-medium mb-2">Ce que vous apprendrez</h3>
                            <div className="space-y-1">
                              {(form.watch("goals") || "").split("\n").filter(Boolean).map((goal, index) => (
                                <p key={index} className="flex items-start gap-2 text-sm">
                                  <Check className="h-4 w-4 text-green-500 mt-0.5" />
                                  <span>{goal}</span>
                                </p>
                              ))}
                              {!(form.watch("goals")) && (
                                <p className="text-sm text-muted-foreground">Aucun objectif spécifié.</p>
                              )}
                            </div>
                          </div>
                          
                          <div className="pt-2">
                            <h3 className="font-medium mb-2">Prérequis</h3>
                            <div className="space-y-1">
                              {(form.watch("requirements") || "").split("\n").filter(Boolean).map((req, index) => (
                                <p key={index} className="flex items-start gap-2 text-sm">
                                  <Check className="h-4 w-4 text-blue-500 mt-0.5" />
                                  <span>{req}</span>
                                </p>
                              ))}
                              {!(form.watch("requirements")) && (
                                <p className="text-sm text-muted-foreground">Aucun prérequis spécifié.</p>
                              )}
                            </div>
                          </div>
                          
                          <div className="pt-4">
                            <h3 className="font-medium mb-2">Statut et options</h3>
                            <ul className="space-y-1">
                              <li className="flex items-center gap-2 text-sm">
                                <Check className="h-4 w-4 text-green-500" />
                                {form.watch("published") ? "Publié" : "Brouillon"}
                              </li>
                              <li className="flex items-center gap-2 text-sm">
                                <Check className="h-4 w-4 text-green-500" />
                                {form.watch("featured") ? "Mis en avant" : "Non mis en avant"}
                              </li>
                              <li className="flex items-center gap-2 text-sm">
                                <Check className="h-4 w-4 text-green-500" />
                                {form.watch("hasCertificate") ? "Avec certificat" : "Sans certificat"}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" type="button" onClick={() => setStep("seo")}>
                        Retour
                      </Button>
                      <Button onClick={form.handleSubmit(onSubmit)} disabled={loading}>
                        {loading ? "Création..." : "Créer le cours"}
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </form>
            </Form>
          </ScrollArea>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

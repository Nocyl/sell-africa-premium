
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const recentMessages = [
  { id: 1, from: "Marie Durand", content: "Question sur le cours React", time: "Il y a 15 min", read: false },
  { id: 2, from: "Thomas Dupont", content: "Problème avec le téléchargement", time: "Il y a 1 heure", read: false },
  { id: 3, from: "Support WorldSell", content: "Mise à jour des conditions", time: "Il y a 3 heures", read: true },
];

export default function SellerRecentMessages() {
  const navigate = useNavigate();
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Messages récents</CardTitle>
        <Button variant="outline" size="sm" onClick={() => navigate("/seller/messages")}>
          <MessageSquare className="h-4 w-4 mr-2" />
          Tous les messages
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentMessages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "p-4 rounded-lg border flex flex-col",
                !message.read && "bg-muted/30 border-primary/20"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{message.from}</span>
                <span className="text-xs text-muted-foreground">{message.time}</span>
              </div>
              <p className="text-sm mt-1">{message.content}</p>
              {!message.read && (
                <div className="mt-2 flex justify-end">
                  <Button variant="outline" size="sm">Répondre</Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

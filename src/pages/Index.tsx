
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Package, Users, TrendingUp, ShoppingCart, Truck, Clock } from "lucide-react";
import Navigation from "@/components/Navigation";
import DashboardMetrics from "@/components/DashboardMetrics";
import SubscriptionOverview from "@/components/SubscriptionOverview";
import FulfillmentQueue from "@/components/FulfillmentQueue";
import BoxCuration from "@/components/BoxCuration";
import CustomerPortal from "@/components/CustomerPortal";
import InventoryManagement from "@/components/InventoryManagement";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Subscription Box Platform
          </h1>
          <p className="text-slate-600">
            Manage your subscription business with streamlined operations and customer insights
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="hidden">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <div className="space-y-6">
              <DashboardMetrics />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SubscriptionOverview />
                <FulfillmentQueue />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="curation">
            <BoxCuration />
          </TabsContent>

          <TabsContent value="customers">
            <CustomerPortal />
          </TabsContent>

          <TabsContent value="inventory">
            <InventoryManagement />
          </TabsContent>

          <TabsContent value="analytics">
            <div className="text-center py-12">
              <TrendingUp className="mx-auto h-12 w-12 text-slate-400 mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">Analytics Hub</h3>
              <p className="text-slate-600">Advanced analytics and reporting coming soon</p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;


import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SubscriptionOverview = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const subscriptionPlans = [
    {
      name: "Monthly Essentials",
      subscribers: 1247,
      revenue: "$37,410",
      retention: 89,
      color: "bg-blue-500"
    },
    {
      name: "Premium Quarterly",
      subscribers: 892, 
      revenue: "$32,112",
      retention: 94,
      color: "bg-purple-500"
    },
    {
      name: "Annual Deluxe",
      subscribers: 708,
      revenue: "$14,768",
      retention: 97,
      color: "bg-green-500"
    }
  ];

  const upcomingBilling = [
    { date: "Dec 15", amount: "$28,450", subscriptions: 487 },
    { date: "Dec 16", amount: "$31,220", subscriptions: 523 },
    { date: "Dec 17", amount: "$19,380", subscriptions: 342 }
  ];

  const handleViewAllSubscriptions = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Subscriptions Loaded",
        description: "Opening detailed subscription management interface",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load subscription details",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlanClick = (planName: string) => {
    toast({
      title: "Plan Details",
      description: `Viewing details for ${planName}`,
    });
  };

  const handleBillingClick = (date: string, amount: string) => {
    toast({
      title: "Billing Details",
      description: `Viewing billing details for ${date}: ${amount}`,
    });
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Users className="h-5 w-5 mr-2 text-blue-600" />
          Subscription Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-slate-700">Active Plans</h4>
          {subscriptionPlans.map((plan) => (
            <div key={plan.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div 
                  className="flex items-center cursor-pointer hover:opacity-80"
                  onClick={() => handlePlanClick(plan.name)}
                >
                  <div className={`w-3 h-3 rounded-full ${plan.color} mr-3`} />
                  <span className="font-medium text-slate-900">{plan.name}</span>
                </div>
                <Badge variant="secondary">{plan.subscribers} active</Badge>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>{plan.revenue} revenue</span>
                <span>{plan.retention}% retention</span>
              </div>
              <Progress value={plan.retention} className="h-2" />
            </div>
          ))}
        </div>

        <div className="border-t pt-4">
          <h4 className="text-sm font-medium text-slate-700 mb-3 flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Upcoming Billing
          </h4>
          <div className="space-y-2">
            {upcomingBilling.map((billing) => (
              <div 
                key={billing.date} 
                className="flex items-center justify-between py-2 cursor-pointer hover:bg-slate-50 rounded px-2 -mx-2"
                onClick={() => handleBillingClick(billing.date, billing.amount)}
              >
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-slate-400 mr-2" />
                  <span className="text-sm text-slate-600">{billing.date}</span>
                </div>
                <div className="text-right">
                  <div className="font-medium text-slate-900">{billing.amount}</div>
                  <div className="text-xs text-slate-500">{billing.subscriptions} subs</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button 
          className="w-full" 
          variant="outline" 
          onClick={handleViewAllSubscriptions}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "View All Subscriptions"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default SubscriptionOverview;

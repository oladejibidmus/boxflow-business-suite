
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Users, Search, Mail, Calendar, CreditCard, Package } from "lucide-react";

const CustomerPortal = () => {
  const customers = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      plan: "Premium Quarterly",
      status: "Active",
      nextBilling: "2024-03-15",
      totalSpent: "$284.97",
      joinDate: "2023-06-12",
      lastOrder: "Dec 2024 Box"
    },
    {
      id: "2",
      name: "Michael Chen",
      email: "m.chen@email.com", 
      plan: "Monthly Essentials",
      status: "Active",
      nextBilling: "2024-01-05",
      totalSpent: "$156.88",
      joinDate: "2023-11-03",
      lastOrder: "Dec 2024 Box"
    },
    {
      id: "3",
      name: "Emma Rodriguez",
      email: "emma.r@email.com",
      plan: "Annual Deluxe",
      status: "Paused",
      nextBilling: "2024-06-20",
      totalSpent: "$412.50",
      joinDate: "2023-01-15",
      lastOrder: "Nov 2024 Box"
    },
    {
      id: "4",
      name: "David Kim",
      email: "d.kim@email.com",
      plan: "Premium Quarterly", 
      status: "Active",
      nextBilling: "2024-02-28",
      totalSpent: "$189.95",
      joinDate: "2023-08-22",
      lastOrder: "Dec 2024 Box"
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      Active: "default",
      Paused: "secondary",
      Cancelled: "destructive"
    } as const;
    
    return (
      <Badge variant={variants[status as keyof typeof variants] || "secondary"}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Customer Management</h2>
          <p className="text-slate-600">Manage customer subscriptions and relationships</p>
        </div>
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-3 text-slate-400" />
            <Input placeholder="Search customers..." className="pl-9 w-64" />
          </div>
          <Button>
            <Mail className="h-4 w-4 mr-2" />
            Send Newsletter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Customers</p>
                <p className="text-2xl font-bold text-slate-900">2,847</p>
                <p className="text-xs text-green-600">+12.5% this month</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Avg. LTV</p>
                <p className="text-2xl font-bold text-slate-900">$342.18</p>
                <p className="text-xs text-green-600">+5.2% this month</p>
              </div>
              <CreditCard className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Churn Rate</p>
                <p className="text-2xl font-bold text-slate-900">3.2%</p>
                <p className="text-xs text-red-600">+0.3% this month</p>
              </div>
              <Package className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2 text-blue-600" />
            Customer List
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {customers.map((customer) => (
              <div key={customer.id} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-medium">
                        {customer.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900">{customer.name}</h4>
                      <p className="text-sm text-slate-600">{customer.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <p className="text-sm font-medium text-slate-900">{customer.plan}</p>
                      <p className="text-xs text-slate-500">Plan</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-sm font-medium text-slate-900">{customer.totalSpent}</p>
                      <p className="text-xs text-slate-500">Total Spent</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-sm font-medium text-slate-900">{customer.nextBilling}</p>
                      <p className="text-xs text-slate-500">Next Billing</p>
                    </div>
                    
                    <div className="text-center">
                      {getStatusBadge(customer.status)}
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">View</Button>
                      <Button size="sm">Manage</Button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-sm text-slate-600">
                  <span>Member since: {customer.joinDate}</span>
                  <span>Last order: {customer.lastOrder}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex justify-center">
            <Button variant="outline">Load More Customers</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerPortal;

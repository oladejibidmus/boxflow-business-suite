
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Users, Search, Mail, Calendar, CreditCard, Package } from "lucide-react";
import { useStore } from "@/store/useStore";
import { apiService } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

const CustomerPortal = () => {
  const { customers, isLoading, setCustomers, setLoading } = useStore();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const data = await apiService.getCustomers();
      setCustomers(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load customers",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.plan.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleManageCustomer = async (customerId: number, action: string) => {
    try {
      setLoading(true);
      
      if (action === 'pause') {
        await apiService.updateCustomerStatus(customerId, 'Paused');
        toast({
          title: "Success",
          description: "Customer subscription paused",
        });
      } else if (action === 'activate') {
        await apiService.updateCustomerStatus(customerId, 'Active');
        toast({
          title: "Success", 
          description: "Customer subscription activated",
        });
      }
      
      // Reload customers to reflect changes
      await loadCustomers();
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${action} customer subscription`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSendNewsletter = () => {
    toast({
      title: "Newsletter Sent",
      description: "Newsletter has been queued for delivery to all active subscribers",
    });
  };

  const handleViewCustomer = (customer: any) => {
    toast({
      title: "Customer Details",
      description: `Viewing details for ${customer.name}`,
    });
  };

  const handleLoadMore = () => {
    toast({
      title: "Loading More",
      description: "Loading additional customers...",
    });
  };

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

  if (isLoading && customers.length === 0) {
    return <div className="flex justify-center items-center h-64">Loading customers...</div>;
  }

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
            <Input 
              placeholder="Search customers..." 
              className="pl-9 w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button onClick={handleSendNewsletter}>
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
                <p className="text-2xl font-bold text-slate-900">{customers.length}</p>
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
            Customer List ({filteredCustomers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredCustomers.map((customer) => (
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
                      <p className="text-sm font-medium text-slate-900">${customer.totalSpent}</p>
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
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleViewCustomer(customer)}
                      >
                        View
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleManageCustomer(customer.id, customer.status === 'Active' ? 'pause' : 'activate')}
                        disabled={isLoading}
                      >
                        {customer.status === 'Active' ? 'Pause' : 'Activate'}
                      </Button>
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
            <Button variant="outline" onClick={handleLoadMore}>
              Load More Customers
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerPortal;

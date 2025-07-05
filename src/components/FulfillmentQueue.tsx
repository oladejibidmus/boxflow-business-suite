
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Package, Clock, CheckCircle, AlertCircle, Truck } from "lucide-react";
import { useStore } from "@/store/useStore";
import { apiService } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

const FulfillmentQueue = () => {
  const { orders, isLoading, setOrders, setLoading } = useStore();
  const { toast } = useToast();

  const fulfillmentStats = {
    pending: orders.filter(o => o.status === 'pending').length,
    inProgress: orders.filter(o => o.status === 'in-progress').length,
    packed: orders.filter(o => o.status === 'packed').length,
    shipped: orders.filter(o => o.status === 'shipped').length
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await apiService.getOrders();
      setOrders(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load orders",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateOrderStatus = async (orderId: number, newStatus: string) => {
    try {
      setLoading(true);
      await apiService.updateOrderStatus(orderId, newStatus);
      
      toast({
        title: "Success",
        description: `Order status updated to ${newStatus}`,
      });
      
      // Reload orders
      await loadOrders();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleViewAll = () => {
    toast({
      title: "View All Orders",
      description: "Opening full order management interface",
    });
  };

  const handleStartFulfillment = () => {
    toast({
      title: "Fulfillment Workflow Started",
      description: "Beginning fulfillment process for pending orders",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-orange-500" />;
      case "in-progress":
        return <Package className="h-4 w-4 text-blue-500" />;
      case "packed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Truck className="h-4 w-4 text-purple-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: "secondary",
      "in-progress": "default",
      packed: "secondary",
      shipped: "secondary"
    } as const;
    
    return (
      <Badge variant={variants[status as keyof typeof variants] || "secondary"}>
        {status.replace("-", " ")}
      </Badge>
    );
  };

  const getNextStatus = (currentStatus: string) => {
    switch (currentStatus) {
      case 'pending':
        return 'in-progress';
      case 'in-progress':
        return 'packed';
      case 'packed':
        return 'shipped';
      default:
        return currentStatus;
    }
  };

  const urgentOrders = orders.filter(order => 
    order.priority === 'high' || order.status === 'pending'
  ).slice(0, 3);

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Package className="h-5 w-5 mr-2 text-purple-600" />
            Fulfillment Queue
          </div>
          <Button size="sm" onClick={handleViewAll}>
            View All
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-900">{fulfillmentStats.pending}</div>
            <div className="text-sm text-slate-600">Pending</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{fulfillmentStats.inProgress}</div>
            <div className="text-sm text-slate-600">In Progress</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{fulfillmentStats.packed}</div>
            <div className="text-sm text-slate-600">Packed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{fulfillmentStats.shipped}</div>
            <div className="text-sm text-slate-600">Shipped Today</div>
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="text-sm font-medium text-slate-700 mb-3">Urgent Orders</h4>
          <div className="space-y-3">
            {urgentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(order.status)}
                  <div>
                    <div className="font-medium text-slate-900">{order.orderId}</div>
                    <div className="text-sm text-slate-600">{order.customer}</div>
                    <div className="text-xs text-slate-500">{order.items} items</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-1">
                    {getStatusBadge(order.status)}
                    {order.priority === "high" && (
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                  <div className="text-xs text-slate-500 mb-2">Due: {order.dueDate}</div>
                  {order.status !== 'shipped' && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleUpdateOrderStatus(order.id, getNextStatus(order.status))}
                      disabled={isLoading}
                    >
                      {getNextStatus(order.status) === 'in-progress' && 'Start'}
                      {getNextStatus(order.status) === 'packed' && 'Pack'}
                      {getNextStatus(order.status) === 'shipped' && 'Ship'}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button 
          className="w-full" 
          onClick={handleStartFulfillment}
          disabled={isLoading || fulfillmentStats.pending === 0}
        >
          {isLoading ? "Processing..." : "Start Fulfillment Workflow"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default FulfillmentQueue;

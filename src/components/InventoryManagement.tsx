
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Package, Search, AlertCircle, TrendingDown, Plus, Truck } from "lucide-react";

const InventoryManagement = () => {
  const inventoryItems = [
    {
      id: "1",
      name: "Artisan Coffee Beans",
      sku: "ACB-001",
      category: "Beverages",
      currentStock: 156,
      reorderPoint: 50,
      maxStock: 500,
      cost: 12.50,
      supplier: "Local Roasters Co.",
      lastOrdered: "2024-11-15",
      status: "In Stock"
    },
    {
      id: "2",
      name: "Organic Dark Chocolate",
      sku: "ODC-002", 
      category: "Snacks",
      currentStock: 23,
      reorderPoint: 30,
      maxStock: 200,
      cost: 8.25,
      supplier: "Bean to Bar Ltd.",
      lastOrdered: "2024-10-28",
      status: "Low Stock"
    },
    {
      id: "3",
      name: "Handmade Ceramic Mug",
      sku: "HCM-003",
      category: "Lifestyle",
      currentStock: 8,
      reorderPoint: 15,
      maxStock: 100,
      cost: 15.00,
      supplier: "Artisan Pottery",
      lastOrdered: "2024-11-01",
      status: "Critical"
    },
    {
      id: "4",
      name: "Premium Tea Blend",
      sku: "PTB-004",
      category: "Beverages",
      currentStock: 127,
      reorderPoint: 40,
      maxStock: 300,
      cost: 9.75,
      supplier: "Mountain Tea Co.",
      lastOrdered: "2024-11-20",
      status: "In Stock"
    }
  ];

  const lowStockItems = inventoryItems.filter(item => 
    item.currentStock <= item.reorderPoint
  );

  const getStatusBadge = (status: string) => {
    const variants = {
      "In Stock": "default",
      "Low Stock": "secondary", 
      "Critical": "destructive",
      "Out of Stock": "destructive"
    } as const;
    
    return (
      <Badge variant={variants[status as keyof typeof variants] || "secondary"}>
        {status}
      </Badge>
    );
  };

  const getStockPercentage = (current: number, max: number) => {
    return (current / max) * 100;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Inventory Management</h2>
          <p className="text-slate-600">Track stock levels and manage product inventory</p>
        </div>
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-3 text-slate-400" />
            <Input placeholder="Search inventory..." className="pl-9 w-64" />
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      {lowStockItems.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center text-red-800">
              <AlertCircle className="h-5 w-5 mr-2" />
              Low Stock Alert ({lowStockItems.length} items)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lowStockItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between bg-white p-3 rounded-lg">
                  <div>
                    <h4 className="font-medium text-slate-900">{item.name}</h4>
                    <p className="text-sm text-slate-600">
                      {item.currentStock} remaining (reorder at {item.reorderPoint})
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Truck className="h-4 w-4 mr-1" />
                    Reorder
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Products</p>
                <p className="text-2xl font-bold text-slate-900">248</p>
                <p className="text-xs text-green-600">+8 new this month</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Low Stock Items</p>
                <p className="text-2xl font-bold text-slate-900">{lowStockItems.length}</p>
                <p className="text-xs text-red-600">Need immediate attention</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Inventory Value</p>
                <p className="text-2xl font-bold text-slate-900">$28,450</p>
                <p className="text-xs text-green-600">+3.2% this month</p>
              </div>
              <TrendingDown className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Suppliers</p>
                <p className="text-2xl font-bold text-slate-900">12</p>
                <p className="text-xs text-slate-600">Active partnerships</p>
              </div>
              <Truck className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Package className="h-5 w-5 mr-2 text-blue-600" />
            Inventory Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {inventoryItems.map((item) => {
              const stockPercentage = getStockPercentage(item.currentStock, item.maxStock);
              const isLowStock = item.currentStock <= item.reorderPoint;
              
              return (
                <div key={item.id} className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                        <Package className="h-6 w-6 text-slate-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900">{item.name}</h4>
                        <p className="text-sm text-slate-600">SKU: {item.sku} • {item.category}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <p className="text-lg font-bold text-slate-900">{item.currentStock}</p>
                        <p className="text-xs text-slate-500">Current Stock</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-slate-900">${item.cost}</p>
                        <p className="text-xs text-slate-500">Unit Cost</p>
                      </div>
                      {getStatusBadge(item.status)}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-slate-600">
                      <span>Stock Level</span>
                      <span>{item.currentStock} / {item.maxStock}</span>
                    </div>
                    <Progress 
                      value={stockPercentage} 
                      className={`h-2 ${isLowStock ? "bg-red-100" : "bg-slate-100"}`}
                    />
                    <div className="flex justify-between text-sm text-slate-500">
                      <span>Reorder Point: {item.reorderPoint}</span>
                      <span>Last Ordered: {item.lastOrdered}</span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-500">
                      <span>Supplier: {item.supplier}</span>
                      <div className="space-x-2">
                        <Button size="sm" variant="outline">Edit</Button>
                        {isLowStock && (
                          <Button size="sm">
                            <Truck className="h-4 w-4 mr-1" />
                            Reorder
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryManagement;

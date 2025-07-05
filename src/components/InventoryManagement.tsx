
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Package, Search, AlertCircle, TrendingDown, Plus, Truck } from "lucide-react";
import { useStore } from "@/store/useStore";
import { apiService } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

const InventoryManagement = () => {
  const { products, isLoading, setProducts, setLoading } = useStore();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    try {
      setLoading(true);
      const data = await apiService.getProducts();
      setProducts(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load inventory",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = products.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.sku && item.sku.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const lowStockItems = products.filter(item => 
    item.stock <= (item.reorderPoint || 30)
  );

  const handleReorder = async (productId: number, productName: string) => {
    try {
      setLoading(true);
      // Simulate reorder process
      const newStock = Math.floor(Math.random() * 100) + 100;
      await apiService.updateProductStock(productId, newStock);
      
      toast({
        title: "Reorder Initiated",
        description: `Reorder placed for ${productName}`,
      });
      
      // Reload inventory
      await loadInventory();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to initiate reorder",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = () => {
    toast({
      title: "Add Product",
      description: "Add product form would open here",
    });
  };

  const handleEditProduct = (productId: number, productName: string) => {
    toast({
      title: "Edit Product",
      description: `Edit form for ${productName} would open here`,
    });
  };

  const getStatusBadge = (item: any) => {
    const isLowStock = item.stock <= (item.reorderPoint || 30);
    const isCritical = item.stock <= 10;
    
    if (item.stock === 0) {
      return <Badge variant="destructive">Out of Stock</Badge>;
    } else if (isCritical) {
      return <Badge variant="destructive">Critical</Badge>;
    } else if (isLowStock) {
      return <Badge variant="secondary">Low Stock</Badge>;
    } else {
      return <Badge variant="default">In Stock</Badge>;
    }
  };

  const getStockPercentage = (current: number, max: number) => {
    return Math.min((current / max) * 100, 100);
  };

  if (isLoading && products.length === 0) {
    return <div className="flex justify-center items-center h-64">Loading inventory...</div>;
  }

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
            <Input 
              placeholder="Search inventory..." 
              className="pl-9 w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button onClick={handleAddProduct}>
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
                      {item.stock} remaining (reorder at {item.reorderPoint || 30})
                    </p>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleReorder(item.id, item.name)}
                    disabled={isLoading}
                  >
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
                <p className="text-2xl font-bold text-slate-900">{products.length}</p>
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
            Inventory Overview ({filteredItems.length} items)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredItems.map((item) => {
              const maxStock = item.maxStock || 500;
              const stockPercentage = getStockPercentage(item.stock, maxStock);
              const isLowStock = item.stock <= (item.reorderPoint || 30);
              
              return (
                <div key={item.id} className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                        <Package className="h-6 w-6 text-slate-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900">{item.name}</h4>
                        <p className="text-sm text-slate-600">
                          SKU: {item.sku || 'N/A'} • {item.category}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <p className="text-lg font-bold text-slate-900">{item.stock}</p>
                        <p className="text-xs text-slate-500">Current Stock</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-slate-900">${item.cost}</p>
                        <p className="text-xs text-slate-500">Unit Cost</p>
                      </div>
                      {getStatusBadge(item)}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-slate-600">
                      <span>Stock Level</span>
                      <span>{item.stock} / {maxStock}</span>
                    </div>
                    <Progress 
                      value={stockPercentage} 
                      className={`h-2 ${isLowStock ? "bg-red-100" : "bg-slate-100"}`}
                    />
                    <div className="flex justify-between text-sm text-slate-500">
                      <span>Reorder Point: {item.reorderPoint || 30}</span>
                      <span>Supplier: {item.supplier}</span>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleEditProduct(item.id, item.name)}
                      >
                        Edit
                      </Button>
                      {isLowStock && (
                        <Button 
                          size="sm"
                          onClick={() => handleReorder(item.id, item.name)}
                          disabled={isLoading}
                        >
                          <Truck className="h-4 w-4 mr-1" />
                          Reorder
                        </Button>
                      )}
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

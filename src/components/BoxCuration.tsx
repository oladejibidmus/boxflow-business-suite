
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Package, Plus, Search, DollarSign, Package as PackageIcon } from "lucide-react";
import { useStore } from "@/store/useStore";
import { apiService } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

const BoxCuration = () => {
  const { 
    products, 
    selectedProducts, 
    isLoading,
    setProducts, 
    toggleProductSelection, 
    clearSelectedProducts,
    setLoading 
  } = useStore();
  
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [boxName, setBoxName] = useState("");
  const [boxTheme, setBoxTheme] = useState("");
  const [shipDate, setShipDate] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await apiService.getProducts();
      setProducts(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load products",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedProductDetails = products.filter(p => selectedProducts.includes(p.id.toString()));
  const totalCost = selectedProductDetails.reduce((sum, p) => sum + parseFloat(p.cost), 0);
  const totalRetail = selectedProductDetails.reduce((sum, p) => sum + parseFloat(p.retail), 0);
  const margin = totalRetail > 0 ? ((totalRetail - totalCost) / totalRetail * 100) : 0;

  const handleSaveBox = async () => {
    if (!boxName.trim()) {
      toast({
        title: "Validation Error",
        description: "Box name is required",
        variant: "destructive",
      });
      return;
    }

    if (selectedProducts.length === 0) {
      toast({
        title: "Validation Error", 
        description: "Please select at least one product",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      await apiService.createBox({
        name: boxName,
        theme: boxTheme,
        shipDate: shipDate,
        description: description,
        products: selectedProducts,
        totalCost: totalCost.toString(),
        totalRetail: totalRetail.toString(),
      });

      toast({
        title: "Success",
        description: "Box configuration saved successfully",
      });

      // Reset form
      setBoxName("");
      setBoxTheme("");
      setShipDate("");
      setDescription("");
      clearSelectedProducts();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save box configuration",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNewBox = () => {
    setBoxName("");
    setBoxTheme("");
    setShipDate("");
    setDescription("");
    clearSelectedProducts();
    toast({
      title: "New Box",
      description: "Ready to create a new box configuration",
    });
  };

  if (isLoading && products.length === 0) {
    return <div className="flex justify-center items-center h-64">Loading products...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Box Curation</h2>
          <p className="text-slate-600">Create and manage subscription box contents</p>
        </div>
        <Button onClick={handleCreateNewBox}>
          <Plus className="h-4 w-4 mr-2" />
          Create New Box
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Product Selection</span>
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-slate-400" />
                  <Input 
                    placeholder="Search products..." 
                    className="w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredProducts.map((product) => {
                  const isSelected = selectedProducts.includes(product.id.toString());
                  const isLowStock = product.stock < 50;
                  
                  return (
                    <div 
                      key={product.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        isSelected 
                          ? "border-blue-500 bg-blue-50" 
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                      onClick={() => toggleProductSelection(product.id.toString())}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                            <PackageIcon className="h-6 w-6 text-slate-400" />
                          </div>
                          <div>
                            <h4 className="font-medium text-slate-900">{product.name}</h4>
                            <p className="text-sm text-slate-600">{product.category}</p>
                          </div>
                        </div>
                        {isSelected && (
                          <Badge className="bg-blue-500">Selected</Badge>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-slate-500">Cost:</span>
                          <span className="font-medium ml-1">${product.cost}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Retail:</span>
                          <span className="font-medium ml-1">${product.retail}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Stock:</span>
                          <span className={`font-medium ml-1 ${
                            isLowStock ? "text-red-600" : "text-slate-900"
                          }`}>
                            {product.stock}
                          </span>
                          {isLowStock && (
                            <Badge variant="destructive" className="ml-2 text-xs">
                              Low
                            </Badge>
                          )}
                        </div>
                        <div>
                          <span className="text-slate-500">Supplier:</span>
                          <span className="font-medium ml-1 text-xs">{product.supplier}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-green-600" />
                Box Economics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-slate-600">Total Cost:</span>
                <span className="font-medium">${totalCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Total Retail:</span>
                <span className="font-medium">${totalRetail.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="text-slate-600">Margin:</span>
                <span className={`font-medium ${margin > 50 ? "text-green-600" : "text-orange-600"}`}>
                  {margin.toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Items Selected:</span>
                <span className="font-medium">{selectedProducts.length}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Box Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="boxName">Box Name</Label>
                <Input 
                  id="boxName" 
                  placeholder="e.g., December Holiday Box"
                  value={boxName}
                  onChange={(e) => setBoxName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="boxTheme">Theme</Label>
                <Input 
                  id="boxTheme" 
                  placeholder="e.g., Holiday Comfort"
                  value={boxTheme}
                  onChange={(e) => setBoxTheme(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="shipDate">Ship Date</Label>
                <Input 
                  id="shipDate" 
                  type="date"
                  value={shipDate}
                  onChange={(e) => setShipDate(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe the box theme and contents..."
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <Button 
                className="w-full" 
                disabled={selectedProducts.length === 0 || isLoading}
                onClick={handleSaveBox}
              >
                {isLoading ? "Saving..." : "Save Box Configuration"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BoxCuration;

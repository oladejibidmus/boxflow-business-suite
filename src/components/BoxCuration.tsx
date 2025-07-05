
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Package, Plus, Search, DollarSign, Package as PackageIcon } from "lucide-react";

const BoxCuration = () => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const products = [
    {
      id: "1",
      name: "Artisan Coffee Beans",
      category: "Beverages",
      cost: 12.50,
      retail: 18.99,
      stock: 156,
      supplier: "Local Roasters Co.",
      image: "/placeholder.svg"
    },
    {
      id: "2", 
      name: "Organic Dark Chocolate",
      category: "Snacks",
      cost: 8.25,
      retail: 14.99,
      stock: 89,
      supplier: "Bean to Bar Ltd.",
      image: "/placeholder.svg"
    },
    {
      id: "3",
      name: "Handmade Ceramic Mug",
      category: "Lifestyle",
      cost: 15.00,
      retail: 24.99,
      stock: 34,
      supplier: "Artisan Pottery",
      image: "/placeholder.svg"
    },
    {
      id: "4",
      name: "Premium Tea Blend",
      category: "Beverages", 
      cost: 9.75,
      retail: 16.99,
      stock: 127,
      supplier: "Mountain Tea Co.",
      image: "/placeholder.svg"
    }
  ];

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const selectedProductDetails = products.filter(p => selectedProducts.includes(p.id));
  const totalCost = selectedProductDetails.reduce((sum, p) => sum + p.cost, 0);
  const totalRetail = selectedProductDetails.reduce((sum, p) => sum + p.retail, 0);
  const margin = totalRetail > 0 ? ((totalRetail - totalCost) / totalRetail * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Box Curation</h2>
          <p className="text-slate-600">Create and manage subscription box contents</p>
        </div>
        <Button>
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
                  <Input placeholder="Search products..." className="w-64" />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {products.map((product) => {
                  const isSelected = selectedProducts.includes(product.id);
                  const isLowStock = product.stock < 50;
                  
                  return (
                    <div 
                      key={product.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        isSelected 
                          ? "border-blue-500 bg-blue-50" 
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                      onClick={() => toggleProductSelection(product.id)}
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
                <Input id="boxName" placeholder="e.g., December Holiday Box" />
              </div>
              <div>
                <Label htmlFor="boxTheme">Theme</Label>
                <Input id="boxTheme" placeholder="e.g., Holiday Comfort" />
              </div>
              <div>
                <Label htmlFor="shipDate">Ship Date</Label>
                <Input id="shipDate" type="date" />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe the box theme and contents..."
                  rows={3}
                />
              </div>
              <Button className="w-full" disabled={selectedProducts.length === 0}>
                Save Box Configuration
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BoxCuration;

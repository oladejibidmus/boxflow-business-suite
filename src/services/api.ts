
import { db } from '@/lib/database';
import { customers, products, orders, boxes } from '@/lib/schema';
import { eq } from 'drizzle-orm';

// Mock data for development (replace with actual API calls when database is connected)
const mockCustomers = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    plan: "Premium Quarterly",
    status: "Active",
    nextBilling: "2024-03-15",
    totalSpent: "284.97",
    joinDate: "2023-06-12",
    lastOrder: "Dec 2024 Box",
    createdAt: new Date()
  },
  {
    id: 2,
    name: "Michael Chen", 
    email: "m.chen@email.com",
    plan: "Monthly Essentials",
    status: "Active",
    nextBilling: "2024-01-05",
    totalSpent: "156.88",
    joinDate: "2023-11-03",
    lastOrder: "Dec 2024 Box",
    createdAt: new Date()
  }
];

const mockProducts = [
  {
    id: 1,
    name: "Artisan Coffee Beans",
    category: "Beverages",
    cost: "12.50",
    retail: "18.99",
    stock: 156,
    supplier: "Local Roasters Co.",
    sku: "ACB-001",
    reorderPoint: 50,
    maxStock: 500,
    createdAt: new Date()
  },
  {
    id: 2,
    name: "Organic Dark Chocolate",
    category: "Snacks", 
    cost: "8.25",
    retail: "14.99",
    stock: 89,
    supplier: "Bean to Bar Ltd.",
    sku: "ODC-002",
    reorderPoint: 30,
    maxStock: 200,
    createdAt: new Date()
  }
];

const mockOrders = [
  {
    id: 1,
    orderId: "BO-2024-001",
    customer: "Holiday Box - Premium",
    dueDate: "Today",
    items: 8,
    status: "pending",
    priority: "high",
    createdAt: new Date()
  },
  {
    id: 2,
    orderId: "BO-2024-002",
    customer: "Monthly Essentials",
    dueDate: "Tomorrow",
    items: 5,
    status: "in-progress",
    priority: "normal",
    createdAt: new Date()
  }
];

export const apiService = {
  // Customer operations
  async getCustomers() {
    try {
      // In production: return await db.select().from(customers);
      return mockCustomers;
    } catch (error) {
      console.error('Failed to fetch customers:', error);
      return mockCustomers;
    }
  },

  async updateCustomerStatus(id: number, status: string) {
    try {
      console.log(`Updating customer ${id} status to ${status}`);
      // In production: await db.update(customers).set({ status }).where(eq(customers.id, id));
      return { success: true };
    } catch (error) {
      console.error('Failed to update customer:', error);
      throw error;
    }
  },

  // Product operations
  async getProducts() {
    try {
      // In production: return await db.select().from(products);
      return mockProducts;
    } catch (error) {
      console.error('Failed to fetch products:', error);
      return mockProducts;
    }
  },

  async updateProductStock(id: number, stock: number) {
    try {
      console.log(`Updating product ${id} stock to ${stock}`);
      // In production: await db.update(products).set({ stock }).where(eq(products.id, id));
      return { success: true };
    } catch (error) {
      console.error('Failed to update product stock:', error);
      throw error;
    }
  },

  // Order operations
  async getOrders() {
    try {
      // In production: return await db.select().from(orders);
      return mockOrders;
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      return mockOrders;
    }
  },

  async updateOrderStatus(id: number, status: string) {
    try {
      console.log(`Updating order ${id} status to ${status}`);
      // In production: await db.update(orders).set({ status }).where(eq(orders.id, id));
      return { success: true };
    } catch (error) {
      console.error('Failed to update order:', error);
      throw error;
    }
  },

  // Box operations
  async createBox(boxData: Partial<typeof boxes.$inferInsert>) {
    try {
      console.log('Creating new box:', boxData);
      // In production: return await db.insert(boxes).values(boxData).returning();
      return { success: true, id: Date.now() };
    } catch (error) {
      console.error('Failed to create box:', error);
      throw error;
    }
  },

  async getBoxes() {
    try {
      // In production: return await db.select().from(boxes);
      return [];
    } catch (error) {
      console.error('Failed to fetch boxes:', error);
      return [];
    }
  }
};
